import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {DataContext} from '../reducers/datalayer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
//This screen allows user to create a username to play to sudoku.

const Mystats = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext);
  const [data,setData] = useState({"Easy": "0", "Hard": "0", "Medium": "0", "Samurai": "0"});
  var token = state.token;
  const getmydata = async() => {
    try {
        const response = await fetch('http://192.168.43.99:9008/api/sudoku/stats', {
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
            console.log(res)
            setData(res);
        }

    } catch (error) {
        
    }
   
  }
 
  const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Menu" },
        ],
      })
    );
    return true;
  };
  useEffect(() => {
    getmydata();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
 
      return (
          <SafeAreaView style={{
            flex: 1, 
            backgroundColor : '#FFFFFF',
            justifyContent: 'center',
            }}>
            <View style={styles.container}>
            <TouchableOpacity style={styles.text} >
                <Text style = {styles.text_data}>
               Solved Easy {data.Easy}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} >
                <Text style = {styles.text_data}>
                Solved Medium {data.Medium}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} >
                <Text style = {styles.text_data}>
                Solved Hard {data.Hard}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} >
                <Text style = {styles.text_data}>
                Solved Samurai {data.Samurai}
                </Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
    );
 };
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    text : {
        alignItems: 'center',
        marginVertical: 10,
        height :40, 
        width : 290,
        backgroundColor : "#6A5ACD",
        borderWidth: 0.7,
        borderRadius : 10,
      },
      text_data : {
        textAlign :'center',
        color: 'white',
        padding: 10,
      },
  });
export default Mystats;
