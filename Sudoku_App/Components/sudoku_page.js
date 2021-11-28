 import React, { Component, useDebugValue, useState, useEffect, useCallback } from 'react';
 import { EventRegister } from 'react-native-event-listeners'
 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { RouteProp } from "@react-navigation/native";
 import {sudoku_shuffling} from '../Sudoku/sudoku_generator';
 import { sudoku_number_locker } from '../Sudoku/sudoku_number_locker';
 import { sudoku_restart } from '../Sudoku/sudoku_restart';
 var solver = require('../Sudoku/sudoku_solver')
 import {TextInput,Pressable,
   SafeAreaView,
   StyleSheet,
   Button,
   Text,
   useColorScheme,
   View,
   Alert,
   FlatList,
   AccessibilityInfo,
   Appearance,
   BackHandler,
   TouchableOpacity
 } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Timer from './timer';
import { useDataLayerValue } from '../reducers/datalayer';
//This component is responsible to call sudoku functions and manipuate the user inputs.
const App_data = (props) => {
  const [{show_nav_bar,current_value}, dispatch] = useDataLayerValue();
  const [input, setInput] = useState('');
  const [current_index,setCurrentIndex] = useState({
    x : -1,
    y : -1
  })
 
  const level = "Easy";
  const [val,setVal] = useState(false);
  const [data_loading,setDataLoading] = useState(false);
  const [tableData,setTable_data] = useState(undefined);
  const [previous,setPrevious] = useState(undefined);
  const [result,setResult] = useState(undefined);
  const [Password, setPassword] = useState('');
  const [bck,setBckColor] = useState(false);
  const [colors,setColors] = useState(false);
  const [loading,setLoading] = useState(1);
  const [edit,setEdit] = useState(false);
  const [no_change_data,set_No_change_data] = useState([]);
  const [show_nav, setShow] = useState('none')
  const [side_pos, setPos] = useState('relative')
  const values = [1,2,3,4,5,6,7,8,9]
  var time_dt = null

  // const Update = () => {
  //   if (current_index.x != -1 && current_index.y != -1 && current_value != 0)
  //   {
  //     let tableData_dup = tableData;
  //     tableData_dup[current_index.x][current_index.y] = parseInt(current_value);
  //     setTable_data(tableData_dup);
      
  //     dispatch({
  //       type: "SET_Value",
  //       current_value: 0
  //     });
      
  //   }
  // }
  
  
  const side_bar = () => {
  console.log(show_nav_bar)
    dispatch({
    type: "SET_Side_Nav_bar",
    show_nav_bar: {
      display : 'flex',
      position : 'absolute'
    },
  });
  if(show_nav == 'flex')
  {
    const show_nav = 'none'
    setShow(show_nav)
  }
  else
  {
  const show_nav = 'flex'
   setShow(show_nav)
   const side_pos = 'absolute'
   setPos(side_pos)
  }
  }
  const Value_Change = (index) => {
    if (current_index.x != - 1 && current_index.y != -1 ) {
    tableData[current_index.x][current_index.y] = index;
    const text = index
    setInput(index)
    }
  }
  const Dataloading = (level) => {
    time_dt = setTimeout (() => {
      const table = sudoku_shuffling(level)
      setTable_data(table);
      // setPrevious(sudoku_restart(table));
      // setResult(solver(table).result);
      set_No_change_data(sudoku_number_locker(table));
      
    },1000);
}
const BackGround_colors = () => {
  let cls = [];
  for(let i = 0; i<=8;i++)
  {
    let a2 = []
    for(let j = 0; j<=8;j ++)
    {

      a2[j] = 'white'
    }
    cls.push(a2)
    
  }
  const colors = cls;
  setColors(colors)
}
const Touch_data = (index,cellIndex) => {

  let colors_data = colors
  colors_data[index][cellIndex] = 'lightblue';
  if (current_index.x != -1 && current_index.y != -1)
  {
    colors_data[current_index.x][current_index.y] = 'white'
  }
  const current_index_data = {
    x : index,
    y : cellIndex
  }
  setCurrentIndex(current_index_data)
  const new_color = colors_data
  setColors(new_color)
  if(bck == true)
  {
  const Bck1 = false
  setBckColor(Bck1);
  }
  else
  {
  const Bck1 = true
  setBckColor(Bck1);
  }
 
}


  //This function is to alert the user to show the solution for the sudoku.
  const SolutionAlert = () =>
  Alert.alert(
    "Warnings",
    "Do you want to Give_Up",
    [
      {
        text: "Cancel",
        onPress:  () => console.log('Cancel Pressed'),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {Inputing_data("Give_up",0,0)},
        style: "yes",
  
      }
    ],
  );

  //This function is to alert the user to start a restart of the game.
  const RestartAlert = () =>
  Alert.alert(
    "Warnings",
    "Do you want to Restart Game",
    [
      {
        text: "Cancel",
        onPress:  () => console.log('Cancel Pressed'),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {Restart()},
        style: "yes",
  
      }
    ],
    
  );
  //This function is to alert the user to start a new game and go back to the select difficulty page.
 const showAlert = () =>
 Alert.alert(
   "Warning",
   "Do you want to quit and start new game",
   [
     {
       text: "Cancel",
       onPress:  () => console.log('Cancel Pressed'),
       style: "cancel",
     },
     {
       text: "Yes",
      //  onPress: () =>  navigation.navigate('SecondPage'),
       style: "yes",
 
     }
   ],
   
 );
 const a1 = () => {
  const show_nav = 'none'
  setShow(show_nav)
 }
  //This function sets the current sudoku to starting state.
   const Restart = () => {
     setTable_data(previous);
   }
  //This function sets the current sudoku cell updates with user data and if fill all cell with correct it navigates to success page.
  const Inputing_data = (text,index,cellIndex) => {
    console.log(text,index,cellIndex)
    if(text !== "Give_up")
    {
     if(text == '')
     {
      tableData[index][cellIndex] = ''
     }
     else
     {
     tableData[index][cellIndex] = parseInt(text)
     }
     setInput(text)
     setTable_data(tableData);
     var count = 0;
    // for(let i = 0; i<=8;i++)
    // {
    //   for(let j = 0; j<=8;j ++)
    //   {
    //    if(tableData[i][j] !== result[i][j])
    //    {
    //     count = count + 1;
    //     break;
    //    }
    //   }
    //   if(count >= 1)
    //   {
    //     break;
    //   }
    // }
    if(count === 0)
    {
       setTimeout(() => {
        // navigation.navigate('Main_page', {
        //   paramKey: null,
        // })
       
     },1500)
    }
    }
    else
    {
      for(let i = 0; i<=8;i++)
      {
        for(let j = 0; j<=8;j ++)
        {
         no_change_data[i][j] = 1;
        }
      }
      setTable_data(result);
    }
  }
  
  useEffect(()=> {
      Dataloading(level);
      BackGround_colors();
  },[]);

  
  if(tableData != undefined && no_change_data.length != 0)
  {
  return (
    <SafeAreaView style={styles.container} onPress = {() => a1()}>
        <View style = {styles.timer}>
         <Timer></Timer>
        </View>
        <Table >
        <TableWrapper style={styles.wrapper}>
            {
               tableData.map((rowData, index) => {  
               return (    
                <TableWrapper key = {index}>
                  {
                    rowData.map((cellData, cellIndex) => {
                    if(index == 0)
                    {
                    if(cellIndex == 0)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                    <TouchableOpacity
                     key = {cellIndex}
                     style = {{
                      backgroundColor : colors[index][cellIndex]
                     }
                     }                    
                     onPress = {() => Touch_data(index,cellIndex)}>
                     <TextInput style = {styles.input}
                     
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     placeholder=""
                     value={String(tableData[index][cellIndex])}
                     
                     color = 'green'
                     style={styles.cell_index10}
                     keyboardType="numeric"
                     editable = {edit}
                     >
                     </TextInput> 
                   
                    </TouchableOpacity>
                    //  <Text 
                    //   key = {cellIndex} 
                    //   style={styles.cell_index10} 
                   
                    //   onPress = {() => s()}>
                    //  {10}
                    // </Text>
                   
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index101}/>
                     )}
                    }
                    else if(cellIndex%3 == 2)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                    <TextInput style = {styles.input}
                     key = {cellIndex} onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     placeholder="" value={String(tableData[index][cellIndex])} placeholderTextColor = 'grey'
                     color = 'green' style={styles.cell_index12} keyboardType="numeric" editable = {edit}
                     ></TextInput> 
                     </TouchableOpacity>
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index102}/>
                     )}
                    }
                    else
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor : colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index0}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>
                     
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index00}/>
                     )}
                    }
                   }

                   else if(index%3 == 2)
                    {
                    if(cellIndex == 0)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_20}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>
                    
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_200}/>
                     )}
                    }
                    else if(cellIndex%3 == 2)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_22}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_222}/>
                     )}
                    }
                    else
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_23}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>

                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_223}/>
                     )}
                    }
                   }
                    else
                    {
                      
                    if(cellIndex == 0)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_0}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>
                    
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_00}/>
                     )}
                    }
                    else if(cellIndex%3 == 2)
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_12}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                    </TouchableOpacity>
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_102}/>
                     )}
                    }
                    else
                    {
                     if(cellData === 0 || no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                      <TouchableOpacity 
                      key = {cellIndex}
                      style = {{
                       backgroundColor :  colors[index][cellIndex]
                      }
                      }                    
                      onPress = {() => Touch_data(index,cellIndex)}>
                      <TextInput style = {styles.input}
                      key = {cellIndex}
                      onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                      placeholder=""
                      value={String(tableData[index][cellIndex])}
                      placeholderTextColor = 'grey'
                      color = 'green'
                      style={styles.cell_index_13}
                      keyboardType="numeric"
                      editable = {edit}
                      >
                      </TextInput> 
                      </TouchableOpacity>
                     ) }
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.cell_index_103}/>
                     )}
                    }
                   }
                  })
                  }
                </TableWrapper>)
               })
            }
            </TableWrapper>
        <View style = {{
          marginTop : '25%',
          marginLeft : '25%',
          position : 'absolute',
          alignItems : 'center',
          display : 'flex',
          
        }}>
        
        </View>
        </Table>
        <SafeAreaView  style={{
      marginVertical : 20,
      alignItems : 'center',
      justifyContent: 'center',
      backgroundColor : 'white',
      
      }} >

        <View style = {{
           flexDirection : 'row',
           alignItems : 'center',
        }}>
        {
          values.map((index) => {  
            return (   
            
            <Text  key = {index} onPress ={() => Value_Change(index)} style = {styles.values_data }>
              {index}
            </Text>
            
            )
          })
        }
        </View>
        </SafeAreaView>
      
        {/* <SafeAreaView style = {styles.btn_wrapper}>
        <View style={styles.button}>
        <Button
         title="Check Solution"
         onPress={SolutionAlert}
         color= "#6A5ACD"
         accessibilityLabel="Understand the solution"
         />
        </View>
        <View style={styles.button}>
         <Button
         onPress={RestartAlert}
         title="Restart"
         color= "#6A5ACD"
         accessibilityLabel="Restart Game"
         />
        </View>
        <View style={styles.button}>
         <Button
         onPress={showAlert}
         title="NewGame"
         color= "#6A5ACD"
         accessibilityLabel="NewGame Game"
         />
        </View>
        </SafeAreaView> */}
      </SafeAreaView>
     
      
  );
 }
 else if(loading == 1)
 {
   return (
     <View style = {styles.container}>
       <Text style = {styles.text_load}>
       Loading
       </Text>
     </View>
     );
 }
 else
 {
  return (
    <View style = {styles.container}>
    </View>
    );
 }
};
//Css data for rendering
const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', },
  wrapper: {position : 'relative', flexDirection: 'row',justifyContent: 'center',},
  cell1 : {height :36, width : 36, borderWidth : 0.5,textAlign :'center'},
  cell : {height :36, width : 36,borderWidth : 0.5, alignItems : 'center',},
  cell_index1 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,borderLeftWidth : 2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index11 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,alignItems : 'center',borderLeftWidth : 2,borderColor : "#6A5ACD",},
  cell_index10 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,borderLeftWidth : 2,borderTopWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index101 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,alignItems : 'center',borderTopWidth:2,borderLeftWidth : 2,borderColor : "#6A5ACD",},
  cell_index12 : {height :36, width : 36,borderLeftWidth : 2,borderRightWidth:0.5,borderBottomWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index102 : {height :36, width : 36,alignItems : 'center',borderRightWidth:0.5,borderBottomWidth: 2,borderColor : "#6A5ACD",borderLeftWidth : 2,},
  cell_index0 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.5,borderLeftWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index00 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.5,borderLeftWidth:2,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_0 : {height :36, width : 36,borderTopWidth: 2,borderRightWidth:0.5,borderBottomWidth: 0.5,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_00 : {height :36, width : 36,borderTopWidth:2,borderRightWidth:0.5,borderBottomWidth: 0.5,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_12 : {height :36, width : 36,borderBottomWidth: 2,borderRightWidth:0.5,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_102 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.5,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_13 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_103 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.5,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_20 : {height :36, width : 36,borderTopWidth: 2,borderRightWidth:0.5,borderBottomWidth: 0.5,borderRightWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_200 : {height :36, width : 36,borderTopWidth:2,borderRightWidth:0.5,borderBottomWidth: 0.5,borderRightWidth:2,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_22 : {height :36, width : 36,borderBottomWidth: 2,borderRightWidth:0.5,borderRightWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_222 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.5,borderRightWidth:2,alignItems : 'center',borderColor : "#6A5ACD",},
  cell_index_23 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.5,borderRightWidth:2,textAlign :'center',borderColor : "#6A5ACD",},
  cell_index_223 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.5,borderRightWidth:2,alignItems : 'center',borderColor : "#6A5ACD",},
  text: { textAlign: 'center',color : 'red' },
  text_load : { textAlign : 'center', color : 'green',fontSize : 25},
  input : { textAlign: 'center' },
  button : {paddingLeft: 20,paddingRight: 20,marginVertical: 10,justifyContent : 'space-between'},
  btn_wrapper : {position : 'relative',marginVertical : 10},
  header_right :{alignItems : 'center'},
  header_left :{justifyContent : 'center'},
  timer : {alignItems : 'center',marginVertical : 10},
  values_data :{ 
    textAlign : 'center', 
    color : "#6A5ACD",
    fontSize : 27,
    padding : 10,
    borderWidth : 0.5,
    borderColor : "#6A5ACD",
  },

});
export default App_data;