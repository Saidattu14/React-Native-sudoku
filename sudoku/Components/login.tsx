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
//This screen allows user to create a username to play to sudoku.
const Login = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
  const [token,settoken] = useState('');
  const [rtl, setrtl] = useState(true);
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [show_res, setshow_res] = useState('');
  const [allow, setAllow] = useState(true);
  const [show_password, setShowPassword] = useState(true);
  const ratelimt = async() => {
    try
    {
      
      let newtimer = new Date().getTime();
      let oldtimer = await AsyncStorage.getItem("Timer");
      if(oldtimer != null)
      {
       let old = parseInt(oldtimer); 
       console.log(newtimer - old)
       let value = (newtimer- old)/3600;
       if(value > 300)
       {
        
        await AsyncStorage.removeItem('FailureLogin');
        await AsyncStorage.removeItem("Timer")
        setAllow(true);
        
       }
       else
       {
        let vl = 300 - Math.round(value);
        setshow_res(`Please wait for another ${String(vl)} Seconds limit Exceed`);
        setAllow(false)
       }
      }
  
    }
    catch(error)
    {
      console.log(error)
    }
  }
  
 
  const submit_request = async(UserName : String,Password : String) => {
    let data = {
      username : UserName,
      password : Password,
    }
    
    if(allow == true)
    {
    try {
      const response = await fetch('http://192.168.43.99:9008/api/sudoku/login', {
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
        let b = await AsyncStorage.getItem('FailureLogin');
        if( b == null)
        {
          await AsyncStorage.setItem('FailureLogin',"1");
          setshow_res(a)
        }
        else
        {
          let b1 = parseInt(b);
          b1 = b1 + 1
          if(b1 >= 10)
          {
          
            let start_timer = new Date().getTime();
            await AsyncStorage.setItem("Timer",String(start_timer))
            setAllow(false);
            setshow_res('Exceed Maximum Tries and Try again Later')
          }
          else
          {
          await AsyncStorage.setItem('FailureLogin',String(b1));
          setshow_res(a)
          }
        }
        
      }
      else if( response.status == 200)
      {
        setTimeout(() => {
        navigation.navigate('Menu', {
        })
        },100)
        const token_data = await response.json();
        await AsyncStorage.setItem('token',token_data);
        dispatch({
          type: 'Settoken',
          token : token_data
        });
        setshow_res('Login Done')
      }
    } catch (error) {
     console.log(error) 
    }
    }
  }
  const register_navigation = () => {
    setTimeout(() => {
      navigation.navigate('Register', {
    });
    },100)
  }
  const backAction = () => {
    return false;
  };
  const checktoken = async () => {
    
    let tk = await AsyncStorage.getItem('token');
    if(tk != null)
    {
    navigation.navigate('Menu')
    }
    else
    {
      if(rtl == true)
      {
      ratelimt();
      setrtl(false);
      settoken('login');
      }
    }
  }
  useEffect(() => {
    checktoken();
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
  if(token == 'login')
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
    
    <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password)}>
      <Text style={styles.text_data} >
        Log In
      </Text>
    </TouchableOpacity>
    <View style={styles.or_dt} >
      <Text style={styles.or_data} >
      ------------------------------  or -------------------------------
      </Text>
    </View>
    <TouchableOpacity style={styles.creat_acc} onPress={()=>register_navigation()}>
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
export default Login;
