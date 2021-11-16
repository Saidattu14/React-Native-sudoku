import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import fetch from 'node-fetch';
import { useDataLayerValue } from '../reducers/datalayer';
import LottieView from 'lottie-react-native';
//This screen allows user to create a username to play to sudoku.
const Side_page_names = (props) => {
 
  return (
    <SafeAreaView  style={{
        flexDirection : 'row',
        paddingLeft: 5,
        }}>
      <View>
      <Text style={styles.text_data} >
       {props.title}
      </Text>
      <Text style={styles.text_data1} >
      {props.title_data}
      </Text>
      </View>
    <SafeAreaView  style={{
        width :45,
        height : 45,
        }}>
      <LottieView
          source={require('../Assets/arrow.json')}
          colorFilters={[
            {
              color: 'white',
            },
          ]}
          width = {38}
          height = {38}
          autoPlay
          loop 
          >
      </LottieView>
    </SafeAreaView>
    </SafeAreaView>
    
    
  );
};
var styles = StyleSheet.create({
    container: {
       alignItems : 'center'
    },
    container: {
        
        height: '100%',
        position : 'relative',
        zIndex : 1,
        overflow : 'hidden',
        width : '75%',
        display : "none",
        backgroundColor : "#6A5ACD"
    },
    text : {
      alignItems: 'center',
      height :40, 
      width : 290,
      backgroundColor : "white",
      borderWidth: 0.7,
      borderRadius : 10,
      
    },
    text_data : {
      paddingTop: 5,
      paddingBottom: 5,
      alignItems : 'center',
      position : 'relative',
      color: "white",
      fontSize : 15,
      
    },
    text_data1 : {
      
      
      position : 'relative',
      textAlign : 'center',
      color: "white",
      fontSize : 13,
    },
  });
export default Side_page_names;