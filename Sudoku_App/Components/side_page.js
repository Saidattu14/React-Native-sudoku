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
import fetch from 'node-fetch';
import { useDataLayerValue } from '../reducers/datalayer';
import LottieView from 'lottie-react-native';
import Side_page_names from './side_page_name';
import Alert_page from './alert';
import App_data from './sudoku_page';
//This screen allows user to create a username to play to sudoku.
const Side_page = ({navigation}) => {
  
  const [{show_nav_bar}, dispatch] = useDataLayerValue();
  const [display_nav, setDisplayNav] = useState("-70%");
  const [val,setVal] = useState(false);
  const [a,setA] = useState(1);
  const Header_data = () => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress = {() => side_bar_right()}style = {{
        width : 100,
        height : 40,
        paddingLeft : 50,

      }} >
        <SafeAreaView  style = {{
        } }>
          <LottieView
          source={require('../Assets/profile1.json')}
          width = {35} height = {35} autoPlay = {false} loop = {false}>
          </LottieView>
        </SafeAreaView>
      </TouchableOpacity>
      ),
  });
  navigation.setOptions({
    headerLeft: () => (
      <Text onPress = {() => side_bar()} style = {{
        
        position : 'relative',
        width : 100,
        height : 50,
        alignItems : 'center',
        padding: 10,

        
      }}>
        <SafeAreaView   style = {{
        paddingLeft:  10,
         justifyContent : 'flex-start'

        
      }}>
          <LottieView
          source={require('../Assets/menu1.json')}
          width = {25} height = {25} autoPlay = {false} loop = {false}>
          </LottieView>
        </SafeAreaView>
      </Text>
         ),
  });
}
  
 const side_bar = () => {
  
  
    const display_nav = "30%";
    setDisplayNav(display_nav);
 }
 
 const s = () => {
  

  const display = "-100%";
  setDisplayNav(display);

}

const Restart = () => {

}
const value = () => {
  let v1 = display_nav;
  return v1;
}

 useEffect(()=> {
 
  Header_data();
  const backAction = () => {
       let res = value();
       if(res == '30%')
       {
         const dis = '-70%';
         setDisplayNav(dis);
         return true;
       }
       else
       {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { 
            text: "YES", onPress: () => console.log("yes") }
          ]);
       }
       return true
       
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  
 return function cleanup()
 {

  BackHandler.removeEventListener("hardwareBackPress", backAction);
 }
  
},[display_nav]);

  return (
    <SafeAreaView style={{
      
      height: '100%',
      width : '100%',
      position : 'relative',
      zIndex : 1,
      flex: 1, 
      backgroundColor : 'white',
      
      } }>
         
      <View  style={{
      
      height: '100%',
      width : '100%',
      } }>
       
      <App_data a = {a}></App_data> 
     </View>

     <TouchableOpacity 
    
     style={{
      justifyContent : 'center',
      left : '30%',
      top:  '20%',
      } }
      >
      <Alert_page navigation = {navigation}></Alert_page>
      
     </TouchableOpacity>
    
    <View  style={{
      
      height: '120%',
      width : '70%',
      display : 'flex',
      backgroundColor : "#6A5ACD",
      top: -60,
      position : 'absolute',
      right : display_nav
      } }>
        <SafeAreaView
        style={{
          width :'100%',
          height : 80,
          marginVertical : 20,
          borderBottomWidth : 1,
          borderBottomColor : 'white',
          padding: 10,
          
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
      <Text
      style={ styles.side_nav}
      onPress={() => navigation.navigate('Main_page')}>
        <Side_page_names
        title = {'Continue'}
        title_data = {'To continue previous game'}
        ></Side_page_names>
      </Text>
    </SafeAreaView>
    <SafeAreaView>
    <Text
     style={styles.side_nav }
     onPress={() =>  navigation.navigate('SecondPage')}> 
      <Side_page_names 
      title = {'Start New game'}
      title_data = {'To start new game '}>
      </Side_page_names>
    </Text>
    </SafeAreaView>
    <SafeAreaView>
      <Text
      style={styles.side_nav}
      onPress={() => setDisplayNav("30%")}> 
          <Side_page_names
          title = {'Restart'}
          title_data = {'Restarting the game'}></Side_page_names>
      </Text>
    </SafeAreaView>
    <SafeAreaView>
      <Text 
      style={styles.side_nav }
      onPress={() => setDisplayNav("-70%")}> 
          <Side_page_names
          title = {'Settings'}
        title_data = {'Used to change play method'}
          ></Side_page_names>
      </Text>
    </SafeAreaView>
    <SafeAreaView>
    <Text
    style={styles.side_nav }
     onPress={() =>  navigation.navigate('Main_page')}> 
    <Side_page_names title = {'Main Menu'}
        title_data = {'Back to the Menu'}></Side_page_names>
    </Text>
    </SafeAreaView>
    </View>
   
    </SafeAreaView>
    
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