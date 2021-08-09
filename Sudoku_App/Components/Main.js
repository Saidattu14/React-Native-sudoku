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
 import {
   TextInput,
   Pressable,
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
 } from 'react-native';
 import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
//This component is responsible to call sudoku functions and manipuate the user inputs.
const App_data = ({route,navigation}) => {
  const [input, setInput] = useState('');
  const {level,paramKey} = route.params;
  const [val,setVal] = useState(false);
  const [data_loading,setDataLoading] = useState(false);
  const [start_timer] = useState((new Date()).getTime());
  const [time_details,setTime_details] = useState(0);
  const [tableData,setTable_data] = useState(undefined);
  const [previous,setPrevious] = useState(undefined);
  const [result,setResult] = useState(undefined);
  const [loading,setLoading] = useState(1);
  const [no_change_data,set_No_change_data] = useState([]);
  
  
  const Dataloading = (level) => {
    setTimeout (() => {
      const table = sudoku_shuffling(level)
      setTable_data(table);
      setPrevious(sudoku_restart(table));
      setResult(solver(table).result);
      set_No_change_data(sudoku_number_locker(table));
      setLoading(0);
      navigation.setOptions({
        headerRight: () => (
               <View>
                 <Text style = {styles.header_right}>
                   {paramKey}
                 </Text>
               </View>
             ),
      })
    },1000);
}


  const Timer_function = () => {
    let timer_data = (new Date()).getTime();
    let timer = Math.floor(((timer_data-start_timer)/1000))  
    var minutes = Math.floor(timer/60);
    if(timer >= 3600)
    {
      let hrs = Math.floor(timer/3600);
      let mints = Math.floor((timer%3600)/60);
      if(mints < 10)
      {
        if(hrs < 10)
        {
          minutes = "0" + String(hrs) + ":0" + String(mints) 
        }
        else
        {
          minutes = String(hrs) + ":0" + String(mints) 
        }
      }
      else
      {
        if(hrs < 10)
        {
          minutes = "0" + String(hrs) + ":0" + String(mints) 
        }
        else
        {
          minutes = String(hrs) + ":0" + String(mints) 
        }
      }
      
      return minutes;

    }
    else if(timer > 60)
    {
      
      if(minutes < 10)
      {
        minutes = "00:0" + String(minutes) 
      }
      else
      {
        minutes = "00:" + String(minutes) 
      }
      return minutes;
    }
    else if(timer >= 0)
    {
      if(minutes < 10)
      {
        minutes = "00:0" + String(minutes) 
      }
      else
      {
        minutes = "00:" + String(minutes) 
      }
      return minutes;
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
       onPress: () =>  navigation.navigate('SecondPage'),
       style: "yes",
 
     }
   ],
   
 );
  //This function sets the current sudoku to starting state.
   const Restart = () => {
     setTable_data(previous);
   }
  //This function sets the current sudoku cell updates with user data and if fill all cell with correct it navigates to success page.
  const Inputing_data = (text,index,cellIndex) => {
  
    if(text !== "Give_up")
    {
     tableData[index][cellIndex] = parseInt(text)
     setInput(text)
     setTable_data(tableData);
     
     var count = 0;
    for(let i = 0; i<=8;i++)
    {
      for(let j = 0; j<=8;j ++)
      {
       if(tableData[i][j] !== result[i][j])
       {
        count = count + 1;
        break;
       }
      }
      if(count >= 1)
      {
        break;
      }
    }
    if(count === 0)
    {
       setTimeout(() => {
         navigation.navigate('FourthPage',{
           username: this.state.username,
         })
     },1500)
    }
    }
    else
    {
      setTable_data(result);
    }
  }



   const t = useCallback(() => {
    if(val == false )
    {
    const t1 = setTimeout(() => {
      const dt = Timer_function();
      setTime_details(dt);
      setVal(true);
    },1000);
    return t1;
    }
   },[val]);
  
  useEffect(()=> {
    const val = false;
    setVal(val);
    const time = t();
    if(data_loading == false)
    {
      Dataloading(level);
      setDataLoading(true);
    }
   return function cleanup()
   {
     clearTimeout(time)
   }
  },[val,t]);

   
  if(tableData != undefined && no_change_data.length != 0)
  {
  return (
    <View style={styles.container}>
        <View style = {styles.timer}>
        <Text>
          {time_details}
        </Text>
        </View>
        <Table >
        <TableWrapper style={styles.view} style={styles.wrapper}>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index10}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index12}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index0}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_20}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_22}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_23}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_0}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_12}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'green'
                     key = {cellIndex}
                     style={styles.cell_index_13}
                     placeholder = {String(tableData[index][cellIndex])}
                     onChangeText={(e) => Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
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
        </Table>
        <SafeAreaView style = {styles.btn_wrapper}>
        <View style={styles.button}>
        <Button
         title="Check Solution"
         onPress={SolutionAlert}
         color="#f194ff"
         accessibilityLabel="Understand the solution"
         />
        </View>
        <View style={styles.button}>
         <Button
         onPress={RestartAlert}
         title="Restart"
         color= "#f194ff"
         accessibilityLabel="Restart Game"
         />
        </View>
        <View style={styles.button}>
         <Button
         onPress={showAlert}
         title="NewGame"
         color= "#f194ff"
         accessibilityLabel="NewGame Game"
         />
        </View>
        </SafeAreaView>
      </View>
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
};
//Css data for rendering
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', },
  wrapper: { flexDirection: 'row',justifyContent: 'space-between',},
  cell1 : {height :36, width : 36, borderWidth : 0.5,textAlign :'center'},
  cell : {height :36, width : 36,borderWidth : 0.5, alignItems : 'center',},
  cell_index1 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,borderLeftWidth : 2,textAlign :'center'},
  cell_index11 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,alignItems : 'center',borderLeftWidth : 2,},
  cell_index10 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,borderLeftWidth : 2,borderTopWidth:2,textAlign :'center'},
  cell_index101 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,alignItems : 'center',borderTopWidth:2,borderLeftWidth : 2,},
  cell_index12 : {height :36, width : 36,borderLeftWidth : 2,borderRightWidth:0.25,borderBottomWidth:2,textAlign :'center'},
  cell_index102 : {height :36, width : 36,alignItems : 'center',borderRightWidth:0.25,borderBottomWidth: 2,borderLeftWidth : 2,},
  cell_index0 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.25,borderLeftWidth:2,textAlign :'center'},
  cell_index00 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.25,borderLeftWidth:2,alignItems : 'center',},
  cell_index_0 : {height :36, width : 36,borderTopWidth: 2,borderRightWidth:0.25,borderBottomWidth: 0.5,textAlign :'center'},
  cell_index_00 : {height :36, width : 36,borderTopWidth:2,borderRightWidth:0.25,borderBottomWidth: 0.5,alignItems : 'center',},
  cell_index_12 : {height :36, width : 36,borderBottomWidth: 2,borderRightWidth:0.25,textAlign :'center'},
  cell_index_102 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.25,alignItems : 'center',},
  cell_index_13 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,textAlign :'center'},
  cell_index_103 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.25,alignItems : 'center',},
  cell_index_20 : {height :36, width : 36,borderTopWidth: 2,borderRightWidth:0.25,borderBottomWidth: 0.5,borderRightWidth:2,textAlign :'center'},
  cell_index_200 : {height :36, width : 36,borderTopWidth:2,borderRightWidth:0.25,borderBottomWidth: 0.5,borderRightWidth:2,alignItems : 'center',},
  cell_index_22 : {height :36, width : 36,borderBottomWidth: 2,borderRightWidth:0.25,borderRightWidth:2,textAlign :'center'},
  cell_index_222 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.25,borderRightWidth:2,alignItems : 'center',},
  cell_index_23 : {height :36, width : 36,borderBottomWidth: 0.5,borderRightWidth:0.25,borderRightWidth:2,textAlign :'center'},
  cell_index_223 : {height :36, width : 36,borderBottomWidth:0.5,borderRightWidth:0.25,borderRightWidth:2,alignItems : 'center',},
  text: { textAlign: 'center',color : 'red' },
  text_load : { textAlign : 'center', color : 'green',fontSize : 25},
  input : { textAlign: 'center' },
  button : {paddingLeft: 20,paddingRight: 20,marginVertical: 10,justifyContent : 'space-between'},
  btn_wrapper : {marginVertical : 30},
  header_right :{fontWeight: 'bold',fontSize : 20, color: 'white',paddingLeft: 10,paddingRight: 10,},
  timer : {alignItems : 'center',marginVertical : 10}

});
export default App_data;
