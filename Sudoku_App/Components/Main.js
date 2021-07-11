/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component, useDebugValue } from 'react';
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
 class App_data extends Component {
   
   constructor(props) {
    //Here declared the initial variable to manipulate the sudoku data
     super(props);
     
     this.state = {
       level : props.route.params.level,
       username : props.route.params.paramKey,
     },
     this.state = {
       tableData : this.Dataloading(this.state.level), 
     },
    this.state.previous = []
    this.state.no_change_data = []
    this.state.result = []
    this.state.userName = '';
    this.props.navigation.setOptions({
       headerRight: () => (
              <Button
              onPress={this.showAlert}
              title="NewGame"
              color = "grey"
            />
            ),
     })
  }
  //This function fetches the sudoku data like sudoku input, sudoku output, sudoku locking variables, sudoku restart data.
    Dataloading = (level) => {
      setTimeout (() => {
        const table = sudoku_shuffling(level)
        this.setState({tableData : table})
        this.setState({no_change_data : sudoku_number_locker(this.state.tableData)})
        this.setState({previous : sudoku_restart(this.state.tableData)});
        this.setState({result : solver(this.state.tableData).result});
      },1000);
    }
    //This function is to alert the user to start a new game and go back to the select difficulty page.
    showAlert = () =>
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
            onPress: () => this.props.navigation.navigate('SecondPage'),
            style: "yes",
      
          }
        ],
        
      );
      //This function is to alert the user to show the solution for the sudoku.
      SolutionAlert = () =>
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
            onPress: () => {this.Inputing_data("Give_up",0,0)},
            style: "yes",
      
          }
        ],
        
      );
       //This function is to alert the user to start a restart of the game.
      RestartAlert = () =>
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
            onPress: () => {this.Restart()},
            style: "yes",
      
          }
        ],
        
      );
      //This function sets the current sudoku to starting state.
      Restart = () => {
        this.setState({
          tableData : this.state.previous
        });
        this.setState({
          previous : sudoku_restart(this.state.previous),
        });

      }
 //This function sets the current sudoku cell updates with user data and if fill all cell with correct it navigates to success page.
   Inputing_data = (text,index,cellIndex) => {
    
     if(text !== "Give_up")
     {
      this.state.tableData[index][cellIndex] = parseInt(text)
      this.setState({
        tableData : this.state.tableData
      });
      var count = 0;
     for(let i = 0; i<=8;i++)
     {
       for(let j = 0; j<=8;j ++)
       {
        if(this.state.tableData[i][j] !== this.state.result[i][j])
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
         setTimeout( () => {
          this.props.navigation.navigate('FourthPage',{
            username: this.state.username,
          })
      },1500)
     }
     }
     else
     {
       this.setState({
        tableData : this.state.result
      });
     }
   }
  //This function allows the things to represent on the screen
   render() {
   const state = this.state;
   // This allows to wait user with loading until it recieves the data from sudoku functions.
   if(this.state.tableData != undefined && this.state.no_change_data.length != 0)
   {
   return (
     <View style={styles.container}>
         <Table >
         <TableWrapper style={styles.view} style={styles.wrapper}>
             {
                state.tableData.map((rowData, index) => {  
                return (    
                 <TableWrapper key = {index}>
                   {
                    
                     rowData.map((cellData, cellIndex) => {
                     if(index%3 == 2 && cellIndex%3 != 2)
                     {
                      if(cellData === 0 || this.state.no_change_data[index][cellIndex] == 0)
                      {
                      
                      return (
                      <TextInput style = {styles.input}
                      placeholderTextColor = 'black'
                      key = {cellIndex}
                      style={styles.cell_index1}
                      placeholder = {String(this.state.tableData[index][cellIndex])}
                      onChangeText={(e) => this.Inputing_data(e,index,cellIndex)}
                      >
                      </TextInput>
                      ) }
                      else
                      {
                      return (
                        <Cell key={cellIndex} data={cellData}  style={styles.cell_index11}/>
                      )}
                     }
                     else if(cellIndex%3 == 2 && index%3 != 2)
                     {
                      if(cellData === 0 || this.state.no_change_data[index][cellIndex] == 0)
                      {
                      
                      return (
                      <TextInput style = {styles.input}
                      placeholderTextColor = 'black'
                      key = {cellIndex}
                      style={styles.cell_index2}
                      placeholder = {String(this.state.tableData[index][cellIndex])}
                      onChangeText={(e) => this.Inputing_data(e,index,cellIndex)}
                      >
                      </TextInput>
                      ) }
                      else
                      {
                      return (
                        <Cell key={cellIndex} data={cellData}  style={styles.cell_index22}/>
                      )}
                     }
                     else if(cellIndex%3 === 2 && index%3 === 2)
                     {
                      if(cellData === 0 || this.state.no_change_data[index][cellIndex] == 0)
                      {
                      
                      return (
                      <TextInput style = {styles.input}
                      placeholderTextColor = 'black'
                      key = {cellIndex}
                      style={styles.cell_index3}
                      placeholder = {String(this.state.tableData[index][cellIndex])}
                      onChangeText={(e) => this.Inputing_data(e,index,cellIndex)}
                      >
                      </TextInput>
                      ) }
                      else
                      {
                      return (
                        <Cell key={cellIndex} data={cellData}  style={styles.cell_index33}/>
                      )}
                     }
                     else
                     {
                      if(cellData === 0 || this.state.no_change_data[index][cellIndex] == 0)
                     {
                     
                     return (
                     <TextInput style = {styles.input}
                     placeholderTextColor = 'black'
                     key = {cellIndex}
                     style={styles.cell1}
                     placeholder = {String(this.state.tableData[index][cellIndex])}
                     onChangeText={(e) => this.Inputing_data(e,index,cellIndex)}
                     >
                     </TextInput>
                     )}
                     else
                     {
                     return (
                       <Cell key={cellIndex} data={cellData}  style={styles.cell}/>
                     )}
                     }
                   })
                   }
                 </TableWrapper>)
                })
             }
             </TableWrapper>
         </Table>
         <Button
          onPress={this.SolutionAlert}
          title="Check Solution"
          color="#841584"
          accessibilityLabel="Understand the solution"
          />
          <Button
          onPress={this.RestartAlert}
          title="Restart"
          color="#841584"
          accessibilityLabel="Restart Game"
          />
       </View>
   );
  }
  else
  {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text_load}>
        Loading
        </Text>
      </View>
      );
  }
  }
 };
 //Css data for rendering
 const styles = StyleSheet.create({
   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',justifyContent: 'space-between', },
   wrapper: { flexDirection: 'row',borderTopWidth:0.5},
   cell1 : {height :36, width : 36, borderWidth : 0.5,textAlign :'center'},
   cell : {height :36, width : 36,borderWidth : 0.5, alignItems : 'center',backgroundColor:'#f4511e'},
   cell_index1 : {height :36, width : 36,borderRightWidth : 2,borderLeftWidth : 0.5,borderBottomWidth: 0.5, textAlign :'center'},
   cell_index11 : {height :36, width : 36,borderRightWidth : 2,borderLeftWidth : 0.5,borderBottomWidth: 0.5, alignItems : 'center',backgroundColor:'#f4511e'},
   cell_index2 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.5,borderLeftWidth : 0.5,textAlign :'center'},
   cell_index22 : {height :36, width : 36,borderBottomWidth:2,borderRightWidth:0.5,borderLeftWidth : 0.5,alignItems : 'center',backgroundColor:'#f4511e' },
   cell_index3 : {height :36, width : 36,borderRightWidth: 2, borderBottomWidth: 2,textAlign :'center'},
   cell_index33 : {height :36, width : 36,borderRightWidth: 2, borderBottomWidth: 2,alignItems : 'center',backgroundColor:'#f4511e'},
   text: { textAlign: 'center' },
   text_load : { textAlign : 'center', color : 'green',fontSize : 25},
   input : { textAlign: 'center' },

 });
 export default App_data;
 