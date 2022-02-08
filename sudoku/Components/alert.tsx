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
import LottieView from 'lottie-react-native';
import {DataContext} from '../reducers/datalayer';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Alert = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext);
  const cancel = () => {
    dispatch({
      type: 'Setcancel',
      cancel : 'none',
    })
  }
  const logout = async() => {
    await AsyncStorage.removeItem('token');
    let myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: "Login" },
            ],
          })
        ));
      }, 100);
    });
  }
  const profile = async() => {
    dispatch({
      type: 'Setcancel',
      cancel : 'none',
    })
    let myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(navigation.navigate('Mystats'));
      }, 100);
    });
  }

  return (
    <SafeAreaView style={{
      alignItems : 'center',
      justifyContent: 'center',
      display : state.cancel
      }} >
      <View style = {styles.container}>
      <TouchableOpacity style = {styles.text_profile_ctr} onPress={() => profile()}>
         <Text style = {styles.text_profile}>
          Profile
         </Text>
        </TouchableOpacity>
      <TouchableOpacity style = {styles.text_logout_ctr}  onPress={() => logout()}>
         <Text style = {styles.text_logout}>
          Log out
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.text_cnl_ctr} onPress = {() => cancel()}>
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
       backgroundColor : 'white'
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
export default Alert;