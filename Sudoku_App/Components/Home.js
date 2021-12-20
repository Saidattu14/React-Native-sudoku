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
import Main_page from './main_page'

//This screen allows user to create a username to play to sudoku.
const Home = ({navigation}) => {
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [show_password, setShowPassword] = useState(true);
  const [{ user, token, playlists, user_play_list_tracks, }, dispatch] = useDataLayerValue()

  const submit_request = async(UserName,Password) => {
    let data = {
      username : UserName,
      password : Password
    }
    navigation.navigate('Main_page', {
      paramKey: null,
    

    })
    try {
      
      
      console.log(data)
      const data1 = await fetch("https://api.github.com/")
      console.log(data1.status)
    } catch (error) {
      console.log(error)
      console.log('Server Does not found')
    }
     
  }
  
  if(token == undefined )
  {
  return (
    <SafeAreaView style={{
      flex: 1, 
      backgroundColor : '#FFFFFF',
      justifyContent: 'center',
      }}>
      <View style={styles.container}>
      <Text style={{ fontSize: 33, fontFamily: 'Times New Roman', color : "#663399",}}>
        Sudoku
      </Text>
      <TextInput
      value={Username}
      onChangeText={(username) => setUserName(username)}
      style={styles.inputStyle}
      placeholder="Username"
      placeholderTextColor = 'grey'
      color = 'black'
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
    
    <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password)}>
      <Text style={styles.text_data} >
        Log In
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.fgt_psd} onPress={()=>console.log("ok")}>
      <Text style={styles.fgt_data}  >
        Forgotten password?
      </Text>
    </TouchableOpacity>
    <View style={styles.or_dt} >
      <Text style={styles.or_data} >
      ------------------------------  or -------------------------------
      </Text>
    </View>
    <TouchableOpacity style={styles.creat_acc} onPress={()=>console.log("ok")}>
      <Text style={styles.create_acc_data} >
        Create Account
      </Text>
    </TouchableOpacity>
   
    </View>
    {/* <View style={styles.button}>
    <Button
    
    title="Log In"
    color= "#663399"
    accessibilityLabel="Login"
    >
    </Button>
    </View> */}
    </SafeAreaView>
  );
  }
  else
  {
    return(
     <View>
       
     </View>
    );
  }
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
export default Home;
