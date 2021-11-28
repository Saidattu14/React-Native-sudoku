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
const Alert_page = (props) => {
  
  return (

    <SafeAreaView style={{
     
      alignItems : 'center',
      justifyContent: 'center',
      backgroundColor : 'white',
      
      }} >
      <View style = {styles.container}>
      <TouchableOpacity style = {styles.text_profile_ctr}>
         <Text style = {styles.text_profile}>
          Profile
         </Text>
        </TouchableOpacity>
      <TouchableOpacity style = {styles.text_logout_ctr}  onPress={() => props.navigation.navigate('FirstPage')}>
         <Text style = {styles.text_logout}>
          Log out
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_cnl_ctr}>
         <Text style = {styles.text_cancel}>
          Cancel
         </Text>
        </TouchableOpacity>
      </View>
       
    </SafeAreaView>
  );
};
var styles = StyleSheet.create({
  
    container: {
       alignItems : 'center',
       borderColor : 'grey',
       borderWidth : 1,
       borderRadius : 7,
       height : 150,
       width : 140,
    },
    text_logout_ctr : {
      height : 50,
      width : 140,
      alignItems : 'center',
      borderTopWidth : 0.5,
      borderTopColor : "#686868",
      borderBottomWidth : 0.5,
      borderBottomColor : "#686868",
      
    },
    text_profile_ctr : {
      height : 50,
      width : 140,
      alignItems : 'center',
    
      borderBottomColor : "#686868",
      
    },
    text_cnl_ctr : {
      height : 50,
      width : 140,
    },
    text_logout : {
      textAlign : 'center', 
      color : 'red',
      fontSize : 18,
      fontWeight: 'bold', 
      padding : 10
    },
    text_profile : {
      textAlign : 'center', 
      color : 'green',
      fontSize : 18,
      fontWeight: 'bold', 
      padding : 10
    },
    text_cancel : {
      
      padding : 10,
      height : 50,
      width : 140,
      textAlign : 'center', 
      color: "#686868",
      fontSize : 18,
      fontWeight: 'bold', 
    },
   
  });
export default Alert_page;