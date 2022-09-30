import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import {DataContext} from '../reducers/datalayer'
import AsyncStorage from '@react-native-async-storage/async-storage';
//This screen allows user to create a username to play to sudoku.
const Register = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
  var token = state.token;
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [show_password, setShowPassword] = useState(true);
  const [show_res, setshow_res] = useState('');
  const submit_request = async(UserName : String,Password : String,Email: any) => {
    let data = {
      username : "saidattu",
      password : "SaiDat$13",
      email : "nagasaidattu@gmail.com",
    }
    try {
      const response = await fetch('http://192.168.43.99:9008/api/sudoku/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data)
      });
      if(response.status == 400)
      {
        const a = await response.json();
        setshow_res('Register Failed');
      }
      else if( response.status == 200)
      {
        const token_data = await response.json();
        dispatch({
          type: 'Settoken',
          token : token_data
          });
        setshow_res('Register Done')
      }
    } catch (error) {
     console.log(error) 
    }
  }
  
  useEffect(() => {
    if(token != null)
    {
     setTimeout(() => {
      navigation.navigate('Menu', {
     })
     },100)
    }
  },[])
 
      return (
          <SafeAreaView style={{
            flex: 1, 
            backgroundColor : '#FFFFFF',
            justifyContent: 'center',
            }}>
            <View style={styles.container}>
            <Text style={{ fontSize: 15, fontFamily: 'Times New Roman', color : "red",}}>
              {show_res}
            </Text>
            <TextInput
            value={Username}
            onChangeText={(username) => setUserName(username)}
            style={[styles.inputStyle,{color : 'black'}]}
            placeholder="Username"
            placeholderTextColor = 'grey'
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            value={Password}
            placeholderTextColor = 'grey'
            color = 'black'
            secureTextEntry = {
              show_password
            }
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(Email) => setEmail(Email)}
            placeholder="Email"
            value={Email}
            placeholderTextColor = 'grey'
            autoComplete='email'
            color = 'black'
          />
          <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password,Email)}>
            <Text style={styles.text_data} >
              Submit
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
    inputStyle: {
      backgroundColor : '#fafafa',
      width: '80%',
      height: 40,
      marginVertical: 10,
      borderWidth: 0.7,
      borderRadius : 7,
    },
    button : {
      paddingLeft: 33,
      paddingRight: 33,
      marginVertical: 10,
      justifyContent : 'space-between',
     
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
    fgt_psd : {
      alignItems: 'center',
      marginVertical: 10,
    },
    fgt_data : {
      textAlign :'center',
      color: '#663399',
    },
    or_dt : {
      alignItems: 'center',
    },
    or_data : {
      textAlign :'center',
      color: '#663399',
    },
    creat_acc : {
      alignItems: 'center',
      marginVertical: 10,
     
    },
    create_acc_data : {
      borderWidth: 0.7,
      borderRadius : 10,
      height :40, 
      width : 125,
      alignItems: 'center',
      textAlign :'center',
      backgroundColor : "#6A5ACD",
      color: 'white',
      padding: 10,
    },
  });
export default Register;
