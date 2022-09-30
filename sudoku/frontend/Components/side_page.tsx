import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Side_page_names from './Side_page_name';
import Sudoku from './sudoku_page';
import { CommonActions } from '@react-navigation/native';
import {DataContext} from '../reducers/datalayer'
//This screen allows user to create a username to play to sudoku.
const Side_page :React.FC<{navigation : any
  }>= ({navigation}) => {
    const { state, dispatch } = React.useContext(DataContext);
    const funcall = () => {
      dispatch({
        type: 'Setrestartgametype',
        restart : true,
      });
      
    }
  return (
    <View>
       <SafeAreaView
        style={{
          width :'100%',
          height : 80,
          marginVertical : 20,
          borderBottomWidth : 1,
          borderBottomColor : 'white',
          padding: 10,
          backgroundColor : "#6A5ACD"
          }}
        >
        <Text  style={{
        color : 'white',
        fontWeight: 'bold', 
        fontSize : 27,
        }}>
        Sudoku
        </Text>
      </SafeAreaView>
      <SafeAreaView>
      <Text style={styles.side_nav} onPress={() => navigation.navigate('Swiper', {})}> 
      <Side_page_names 
      title = {'Start New game'}
      title_data = {'To start new game '}>
      </Side_page_names>
      </Text>
      </SafeAreaView>
      <SafeAreaView>
      <Text style={styles.side_nav}  onPress={() => funcall()}> 
      <Side_page_names
          title = {'Restart'}
        title_data = {'Restarting the game'}></Side_page_names>
      </Text>
      </SafeAreaView>
      <SafeAreaView>
      <Text 
      style={styles.side_nav } onPress = {() => navigation.navigate('Settings', {})}> 
          <Side_page_names
          title = {'Settings'}
          title_data = {'Used to change play method'}
          ></Side_page_names>
      </Text>
    </SafeAreaView>
    <SafeAreaView>
    <Text
    style={styles.side_nav }
     onPress={() =>  navigation.navigate('Menu')}> 
    <Side_page_names title = {'Main Menu'}
        title_data = {'Back to the Menu'}></Side_page_names>
    </Text>
    </SafeAreaView>
    </View>
    
  );
};
var styles = StyleSheet.create({

    container1: {
      alignItems : 'center'
    },
    side_nav : {
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : 'white',
        padding: 10,
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
      fontWeight: 'bold', 
    },
    text_data1 : {
      position : 'relative',
      textAlign : 'center',
      color: "grey",
      fontSize : 13,
    },
  });
export default Side_page;