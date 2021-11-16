import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import fetch from 'node-fetch';
import { useDataLayerValue } from '../reducers/datalayer';
import LottieView from 'lottie-react-native';
import Side_page_names from './side_page_name';
import { assertUnionTypeAnnotation } from '@babel/types';
//This screen allows user to create a username to play to sudoku.
const Touch_pad = () => {
  const [{current_value}, dispatch] = useDataLayerValue();
  const values = [1,2,3,4,5,6,7,8,9]
  const Value_Change = (index) => {
    dispatch({
      type: "SET_Value",
      current_value: index
    });
    console.log("hello")
  }
  return (

    <SafeAreaView style={{
      marginVertical : 20,
      alignItems : 'center',
      justifyContent: 'center',
      backgroundColor : 'white',
      padding : 15,
      }} >
      <View style = {styles.container}>
        {
          values.map((index) => {  
            return (   
            
            <Text  key = {index} onPress ={() => Value_Change(index)} style = {styles.text_data }>
              {index}
            </Text>
            
            )
          })
        }
        
       
      {/* <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data } onPress ={() => Value_Change()}>
          1
         </Text>
        </TouchableOpacity>
      <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          2
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          3
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          4
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          5
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          6
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          7
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}>
         <Text style = {styles.text_data}>
          8
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_main}  onPress={()=>console.log("ok")}>
         <Text style = {styles.text_data}>
          9
         </Text>
        </TouchableOpacity> */}
      </View>
       
    </SafeAreaView>
  );
};
var styles = StyleSheet.create({
  
    container: {
       flexDirection : 'row',
       alignItems : 'center',
       height : 50,
    },
    text_main : {
      height : 50,
      width : 37,
      alignItems : 'center',
      borderWidth : 0.3,
      borderColor : "#6A5ACD",
    },
    text_data : {
      textAlign : 'center', 
      color : "#6A5ACD",
      fontSize : 22,
      padding : 10
    }, 
  });
export default Touch_pad;