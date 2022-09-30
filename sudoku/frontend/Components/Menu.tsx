import React, {useState,useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../reducers/datalayer';
import { CommonActions } from '@react-navigation/native';
//This screen allows user to create a username to play to sudoku.
const Menu_page = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
  const [list, Setlist] = useState([]) 
  const [cnt,setcnt] = useState(false);
  if(cnt == false)
  {
    const check =  async() => {
       let con = await AsyncStorage.getItem('Continue');
       if(con != null)
       {
         Setlist(['Continue Game','NewGame','My Stats','Leader Board','Logout'])
       }
       else
       {
         Setlist(['NewGame','My Stats','Leader Board','Logout'])
       }
       setcnt(true)
    }
    check();
  }

  const backAction = () => {
    BackHandler.exitApp() 
    return false;
  };
  const logout = async() => {
    await AsyncStorage.removeItem('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Login" },
        ],
      })
    );
  }
  const funcall = (index : String) => {
    
      if(index == 'Continue Game')
      {
         dispatch({
          type: 'Setgametype',
          gametype : 'Continue_game',
          });
          navigation.navigate('Game',{
            level : null,
          })
      }
      else if(index == 'NewGame')
      {
        navigation.navigate('Swiper',{});
      }
      else if (index == 'My Stats')
      {
        
        navigation.navigate('Mystats',{});
      }
      else if(index == 'Leader Board')
      {
        navigation.navigate('Leaderboard',{});
      }
      else if(index == 'Logout')
      {
        logout()
      }
    
    
  }
  const settoken = async() => {
    var tk = await AsyncStorage.getItem('token');
    dispatch({
      type: 'Settoken',
      token : String(tk)
    });
  }
  useEffect(() => {
    settoken();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);
  
  return (
    <SafeAreaView style={{
      flex: 1, 
      backgroundColor : '#FFFFFF',
      justifyContent: 'center',
      }}>
    <View  style={styles.container}>

    {
         list.map((index) => {  
           return (   
           <TouchableOpacity key = {index} style={styles.text} onPress={() => funcall(index)}>
            <Text style={styles.text_data} >
              {index}
            </Text>
            </TouchableOpacity>
           )
         })
    }
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
export default Menu_page;