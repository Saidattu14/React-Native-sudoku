import React, { Component, useDebugValue, useState, useEffect, useCallback } from 'react';
import {sudoku_shuffling} from '../Sudoku/sudoku_generator';
import { sudoku_numbers,sudoku_colors,sudoku_backgroundcolors } from '../Sudoku/sudoku_number_locker';
import { sudoku_restart } from '../Sudoku/sudoku_restart';
import 'url-search-params-polyfill';
var solver = require('../Sudoku/sudoku_solver')
import {DataContext} from '../reducers/datalayer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput,Pressable,SafeAreaView,StyleSheet,Button,Text,useColorScheme,View,
  Alert,FlatList,AccessibilityInfo,Appearance,BackHandler,TouchableOpacity
} from 'react-native';
import Timer from './timer';


const reducer1 = (state1, action) => {
  switch (action.type) {
    case 'settaable':
      return {
        ...state1,
        tabledata1 : action.tabledata1
      };
    case 'setcolors':
        return {
          ...state1,
          colors1 : action.colors1
        };
    case 'setbackgroundcolors':
        return {
            ...state1,
          backgroundcolors1 : action.backgroundcolors1
      };
      case 'setall':
        return {
            ...state1,
          tabledata1 : action.tabledata1,
          colors1 : action.colors1,
          backgroundcolors1 : action.backgroundcolors1
      };
    default:
      throw new Error();
  }
}
const defaultstate = {
  tabledata1 : [],
  colors1 : [],
  backgroundcolors1 : []
}

const Sudoku = ({navigation,level}) => {
  const { state, dispatch } = React.useContext(DataContext);
  const [state1, dispatch1] = React.useReducer(reducer1,defaultstate);
  const token = state.token;
  var solution;
  const [current_index,setCurrentIndex] = useState({
   x : -1,
   y : -1
  })
 const tableData = state1.tabledata1;
 const colors = state1.colors1;
 const backgroundcolors = state1.backgroundcolors1;
 const [loading,setLoading] = useState(1);
 const [edit,setEdit] = useState(false);
 const values = [1,2,3,4,5,6,7,8,9]
 const Dataloading = async(level: any) => {
  try {
    let querys = {
      'level' : level
    }
    let url_params = new URLSearchParams(Object.entries(querys))
    const response = await fetch('http://192.168.43.99:9008/api/sudoku/generator?'+url_params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    });
    if(response.status == 200)
    {
     const res = await response.json();
     const table = await sudoku_numbers(res.matrix);
     const colors = sudoku_colors(table);
     let cl: React.SetStateAction<String[][]> = [...colors]
     const backgroundcolors = sudoku_backgroundcolors();
     let bck: React.SetStateAction<String[][]> = [...backgroundcolors]
     dispatch1({
      type: 'setall',
      tabledata1 : table,
      colors1 : cl,
      backgroundcolors1 : bck
     })
     await AsyncStorage.setItem('Restart',JSON.stringify(res));
     await AsyncStorage.setItem('Continue',JSON.stringify(table));
     await AsyncStorage.setItem('Colors', JSON.stringify(cl));
     await AsyncStorage.setItem('Solution',JSON.stringify(res.solution))
    }
  } catch (error) {
    console.log(error)
  }
}
const onChangeData = async(index: number,index1 : number,backgroundcolors : string[][]) => {
  
  let obj = {
    x : index,
    y : index1,
  }
  if(current_index.x != -1 && current_index.y != -1)
  {
    backgroundcolors[current_index.x][current_index.y] = 'white'
  }
  backgroundcolors[index][index1] = 'lightblue';
  let bck: React.SetStateAction<String[][]> = [...backgroundcolors];
  dispatch1({
    type: 'setbackgroundcolors',
    backgroundcolors1 : bck
   })
  setCurrentIndex(obj);

}
const Value_Change = async(index : number) => {
  if(current_index.x != -1 && current_index.y != -1)
  {
    if(colors[current_index.x][current_index.y] != 'red')
    {
    
    tableData[current_index.x][current_index.y] = index;
    let arr: React.SetStateAction<String[][]> = [...tableData];
    let sol = await AsyncStorage.getItem('Solution');

    sol = JSON.parse(sol)
    let ok = true
    for(let i = 0; i<=8; i++)
    {
      
      for(let j = 0; j<=8; j++)
      {
        if(sol[i][j] != arr[i][j])
        {
          ok = false;
          break;
        }
      }
      if(ok == false)
      {
        break;
      }
    }
    dispatch1({
      type: 'settaable',
      tabledata1 : arr
     });
     await AsyncStorage.setItem('Continue',JSON.stringify(arr));
     await AsyncStorage.setItem('Colors', JSON.stringify(state1.colors1));
     if(ok == true)
    {
      await AsyncStorage.removeItem('Continue');
      navigation.navigate('Success', {})
    }
    }
  }
}
const Continue = async() => {
  let a1 = await AsyncStorage.getItem('Continue');
  let b1 =   await AsyncStorage.getItem('Colors');
  let bs1 = sudoku_backgroundcolors();
  let bck1: React.SetStateAction<String[][]> = [...bs1]
  dispatch1({
    type: 'setall',
    tabledata1 : JSON.parse(a1),
    colors1 : JSON.parse(b1),
    backgroundcolors1 : bs1
   })
}
const Restart = async() => {
     let tb = await AsyncStorage.getItem('Restart');
     let mx = JSON.parse(tb);
     let table1 = await sudoku_numbers(mx.matrix);
     let cls = sudoku_colors(table1);
     let cl: React.SetStateAction<String[][]> = [...cls]
     let bcols = sudoku_backgroundcolors();
     let bck: React.SetStateAction<String[][]> = [...bcols]
     dispatch1({
      type: 'setall',
      tabledata1 : table1,
      colors1 : cl,
      backgroundcolors1 : bck
     })
     dispatch({
      type: 'Setrestartgametype',
      restart : false,
    });
}
if(state.restart == true)
{
  Restart();

}
useEffect(()=> {
    
    if(state.gametype == 'Newgame')
    {
      Dataloading(level)
    }
    else if(state.gametype == 'Continue_game')
    {
      Continue();
    
    }    
 },[]);

 
 if(tableData != undefined && colors.length != 0 && backgroundcolors.length !=0)
 {
 return (
   <SafeAreaView style={styles.container}>
       <View style = {styles.timer}>
        <Timer></Timer>
       </View>
    <SafeAreaView  style={{marginVertical : 20,alignItems : 'center',justifyContent: 'center',backgroundColor : 'white',}} >
    <View style = {{
      flexDirection : 'row'
    }}>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[0][0]}}  onPress = {()=> onChangeData(0,0,backgroundcolors)}>
        <TextInput style = {[styles.cell1,{color: colors[0][0]}]}
        placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][0])}
        keyboardType="numeric" editable = {false}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[0][1]}}  onPress = {()=> onChangeData(0,1,backgroundcolors)}>
        <TextInput style = {[styles.cell2,{color: colors[0][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[0][2]}}  onPress = {()=> onChangeData(0,2,backgroundcolors)}>
        <TextInput style = {[styles.cell3,{color: colors[0][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[0][3]}}  onPress = {()=> onChangeData(0,3,backgroundcolors)}>
        <TextInput style = {[styles.cell2,{color: colors[0][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[0][4]}}  onPress = {()=> onChangeData(0,4,backgroundcolors)}>
        <TextInput style = {[styles.cell2,{color: colors[0][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[0][5]}}  onPress = {()=> onChangeData(0,5,backgroundcolors)}>
        <TextInput style = {[styles.cell3,{color: colors[0][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[0][6]}}  onPress = {()=> onChangeData(0,6,backgroundcolors)}>
        <TextInput style = {[styles.cell2,{color: colors[0][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[0][7]}}  onPress = {()=> onChangeData(0,7,backgroundcolors)}>
        <TextInput style = {[styles.cell2,{color: colors[0][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[0][8]}}  onPress = {()=> onChangeData(0,8,backgroundcolors)}>
        <TextInput style = {[styles.cell4,{color: colors[0][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[0][8])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][0]}}  onPress = {()=> onChangeData(1,0,backgroundcolors)}>
        <TextInput style = {[styles.col21,{color: colors[1][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][1]}}  onPress = {()=> onChangeData(1,1,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[1][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :   backgroundcolors[1][2]}}  onPress = {()=> onChangeData(1,2,backgroundcolors)}>
        <TextInput style = {[styles.col23,{color: colors[1][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :   backgroundcolors[1][3]}}  onPress = {()=> onChangeData(1,3,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[1][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][4]}}  onPress = {()=> onChangeData(1,4,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[1][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :   backgroundcolors[1][5]}}  onPress = {()=> onChangeData(1,5,backgroundcolors)}>
        <TextInput style = {[styles.col23,{color: colors[1][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][6]}}  onPress = {()=> onChangeData(1,6,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[1][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][7]}}  onPress = {()=> onChangeData(1,7,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[1][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[1][8]}}  onPress = {()=> onChangeData(1,8,backgroundcolors)}>
        <TextInput style = {[styles.col24,{color: colors[1][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[1][8])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][0]}} onPress = {()=> onChangeData(2,0,backgroundcolors)} >
        <TextInput style = {[styles.col31,{color: colors[2][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][0])}
        keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][1]}}  onPress = {()=> onChangeData(2,1,backgroundcolors)} >
        <TextInput style = {[styles.col32,{color: colors[2][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][2]}}  onPress = {()=> onChangeData(2,2,backgroundcolors)} >
        <TextInput style = {[styles.col33,{color: colors[2][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][3]}} onPress = {()=> onChangeData(2,3,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[2][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][4]}}  onPress = {()=> onChangeData(2,4,backgroundcolors)} >
        <TextInput style = {[styles.col32,{color: colors[2][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][5]}} onPress = {()=> onChangeData(2,5,backgroundcolors)} >
        <TextInput style = {[styles.col33,{color: colors[2][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][6]}} onPress = {()=> onChangeData(2,6,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[2][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :   backgroundcolors[2][7]}}  onPress = {()=> onChangeData(2,7,backgroundcolors)} >
        <TextInput style = {[styles.col32,{color: colors[2][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[2][8]}}  onPress = {()=> onChangeData(2,8,backgroundcolors)} >
        <TextInput style = {[styles.col34,{color: colors[2][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[2][8])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][0]}}  onPress = {()=> onChangeData(3,0,backgroundcolors)} >
        <TextInput style = {[styles.col21,{color: colors[3][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][1]}}  onPress = {()=> onChangeData(3,1,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[3][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][2]}}  onPress = {()=> onChangeData(3,2,backgroundcolors)}>
        <TextInput style = {[styles.col23,{color: colors[3][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][3]}} onPress = {()=> onChangeData(3,3,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[3][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][4]}} onPress = {()=> onChangeData(3,4,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[3][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][5]}} onPress = {()=> onChangeData(3,5,backgroundcolors)} >
        <TextInput style = {[styles.col23,{color: colors[3][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][6]}}  onPress = {()=> onChangeData(3,6,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[3][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][7]}} onPress = {()=> onChangeData(3,7,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[3][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[3][8]}} onPress = {()=> onChangeData(3,8,backgroundcolors)} >
        <TextInput style = {[styles.col24,{color: colors[3][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[3][8])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][0]}} onPress = {()=> onChangeData(4,0,backgroundcolors)} >
        <TextInput style = {[styles.col21,{color: colors[4][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[4][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][1]}} onPress = {()=> onChangeData(4,1,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[4][1]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][1])}
        keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][2]}} onPress = {()=> onChangeData(4,2,backgroundcolors)} >
        <TextInput style = {[styles.col23,{color: colors[4][2]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][2])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][3]}} onPress = {()=> onChangeData(4,3,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[4][3]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][3])}
         keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][4]}} onPress = {()=> onChangeData(4,4,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[4][4]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][4])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][5]}}  onPress = {()=> onChangeData(4,5,backgroundcolors)}>
        <TextInput style = {[styles.col23,{color: colors[4][5]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][5])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][6]}}  onPress = {()=> onChangeData(4,6,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[4][6]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][6])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][7]}} onPress = {()=> onChangeData(4,7,backgroundcolors)}>
        <TextInput style = {[styles.col22,{color: colors[4][7]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][7])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[4][8]}} onPress = {()=> onChangeData(4,8,backgroundcolors)} >
        <TextInput style = {[styles.col24,{color: colors[4][8]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[4][8])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][0]}} onPress = {()=> onChangeData(5,0,backgroundcolors)}  >
        <TextInput style = {[styles.col31,{color: colors[5][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[5][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[5][1]}} onPress = {()=> onChangeData(5,1,backgroundcolors)} >
        <TextInput style = {[styles.col32,{color: colors[5][1]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][1])}
          keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][2]}} onPress = {()=> onChangeData(5,2,backgroundcolors)}  >
        <TextInput style = {[styles.col33,{color: colors[5][2]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][2])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[5][3]}} onPress = {()=> onChangeData(5,3,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[5][3]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][3])}
          keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][4]}} onPress = {()=> onChangeData(5,4,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[5][4]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][4])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][5]}} onPress = {()=> onChangeData(5,5,backgroundcolors)} >
        <TextInput style = {[styles.col33,{color: colors[5][5]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][5])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][6]}} onPress = {()=> onChangeData(5,6,backgroundcolors)} >
        <TextInput style = {[styles.col32,{color: colors[5][6]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][6])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][7]}} onPress = {()=> onChangeData(5,7,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[5][7]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][7])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[5][8]}} onPress = {()=> onChangeData(5,8,backgroundcolors)}  >
        <TextInput style = {[styles.col34,{color: colors[5][8]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[5][8])}
         keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][0]}} onPress = {()=> onChangeData(6,0,backgroundcolors)}  >
        <TextInput style = {[styles.col21,{color: colors[6][0]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[6][0])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[6][1]}} onPress = {()=> onChangeData(6,1,backgroundcolors)}   >
        <TextInput style = {[styles.col22,{color: colors[6][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][2]}} onPress = {()=> onChangeData(6,2,backgroundcolors)}   >
        <TextInput style = {[styles.col23,{color: colors[6][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][3]}} onPress = {()=> onChangeData(6,3,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[6][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][4]}} onPress = {()=> onChangeData(6,4,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[6][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][5]}} onPress = {()=> onChangeData(6,5,backgroundcolors)}   >
        <TextInput style = {[styles.col23,{color: colors[6][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[6][6]}} onPress = {()=> onChangeData(6,6,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[6][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[6][7]}} onPress = {()=> onChangeData(6,7,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[6][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[6][8]}} onPress = {()=> onChangeData(6,8,backgroundcolors)}   >
        <TextInput style = {[styles.col24,{color: colors[6][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[6][8])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[7][0]}} onPress = {()=> onChangeData(7,0,backgroundcolors)}  >
        <TextInput style = {[styles.col21,{color: colors[7][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[7][1]}} onPress = {()=> onChangeData(7,1,backgroundcolors)} >
        <TextInput style = {[styles.col22,{color: colors[7][1]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][1])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][2]}} onPress = {()=> onChangeData(7,2,backgroundcolors)}  >
        <TextInput style = {[styles.col23,{color: colors[7][2]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][2])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[7][3]}} onPress = {()=> onChangeData(7,3,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[7][3]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][3])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][4]}} onPress = {()=> onChangeData(7,4,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[7][4]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][4])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][5]}} onPress = {()=> onChangeData(7,5,backgroundcolors)}>
        <TextInput style = {[styles.col23,{color: colors[7][5]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][5])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][6]}} onPress = {()=> onChangeData(7,6,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[7][6]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][6])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][7]}} onPress = {()=> onChangeData(7,7,backgroundcolors)}  >
        <TextInput style = {[styles.col22,{color: colors[7][7]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][7])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[7][8]}} onPress = {()=> onChangeData(7,8,backgroundcolors)} >
        <TextInput style = {[styles.col24,{color: colors[7][8]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[7][8])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[8][0]}} onPress = {()=> onChangeData(8,0,backgroundcolors)}  >
        <TextInput style = {[styles.col31,{color: colors[8][0]}]} placeholder="" placeholderTextColor = 'grey'
        value= {String(tableData[8][0])}
        keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][1]}} onPress = {()=> onChangeData(8,1,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[8][1]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][1])}
         keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[8][2]}} onPress = {()=> onChangeData(8,2,backgroundcolors)}  >
        <TextInput style = {[styles.col33,{color: colors[8][2]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][2])}
        keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][3]}} onPress = {()=> onChangeData(8,3,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[8][3]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][3])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][4]}} onPress = {()=> onChangeData(8,4,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[8][4]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][4])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor :  backgroundcolors[8][5]}} onPress = {()=> onChangeData(8,5,backgroundcolors)}  >
        <TextInput style = {[styles.col33,{color: colors[8][5]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][5])}
         keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][6]}} onPress = {()=> onChangeData(8,6,backgroundcolors)}  >
        <TextInput style = {[styles.col32,{color: colors[8][6]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][6])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][7]}} onPress = {()=> onChangeData(8,7,backgroundcolors)}>
        <TextInput style = {[styles.col32,{color: colors[8][7]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][7])}
         keyboardType="numeric" editable = {edit}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{ backgroundColor : backgroundcolors[8][8]}} onPress = {()=> onChangeData(8,8,backgroundcolors)}  >
        <TextInput style = {[styles.col34,{color: colors[8][8]}]} placeholder="" placeholderTextColor = 'grey'
         value= {String(tableData[8][8])}
         keyboardType="numeric" editable = {edit}/> 
      </TouchableOpacity>
    </View>
    </View>
    
    <View style = {{flexDirection : 'row',alignItems : 'center', marginTop : 20}}>
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
    </SafeAreaView> 
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
};
//Css data for rendering
const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', },
  wrapper: {position : 'relative', flexDirection: 'row',justifyContent: 'center',},
  text: { textAlign: 'center',color : 'red' },
  text_load : { textAlign : 'center', color : 'green',fontSize : 25},
  input : { textAlign: 'center' },
  button : {paddingLeft: 20,paddingRight: 20,marginVertical: 10,justifyContent : 'space-between'},
  btn_wrapper : {position : 'relative',marginVertical : 10},
  timer : {alignItems : 'center',marginVertical : 10},
  values_data :{ textAlign : 'center', color : "#6A5ACD",fontSize : 27,padding : 10,borderWidth : 0.5,borderColor : "#6A5ACD",},
  cell1 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 3, borderBottomWidth: 0.75, borderLeftWidth :2, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  cell2 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.75, borderBottomWidth: 0.75, borderLeftWidth :2, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  cell3 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3, borderLeftWidth :2, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  cell4 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3.5, borderLeftWidth :2, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  // {
  //   next row css
  // }
  col21 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 3, borderBottomWidth: 0.75, borderLeftWidth :0.5, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  col22 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.75, borderBottomWidth: 0.75, borderLeftWidth :0.5, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  col23 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3, borderLeftWidth :0.5, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  col24 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3.5, borderLeftWidth :0.5, borderRightWidth :0.75, alignItems : 'center',textAlign : 'center'},
  // {
  //   next row css
  // }
  col31 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 3, borderBottomWidth: 0.75, borderLeftWidth :0.5, borderRightWidth :2.5, alignItems : 'center',textAlign : 'center'},
  col32 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.75, borderBottomWidth: 0.75, borderLeftWidth :0.5, borderRightWidth :2.5, alignItems : 'center',textAlign : 'center'},
  col33 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3, borderLeftWidth :0.5, borderRightWidth :2.5, alignItems : 'center',textAlign : 'center'},
  col34 : {height :36, width : 36,borderColor : "#6A5ACD",borderTopWidth : 0.5, borderBottomWidth: 3.5, borderLeftWidth :0.5, borderRightWidth :2.5, alignItems : 'center',textAlign : 'center'},
 });
export default Sudoku;