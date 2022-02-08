import React, { useEffect, useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View,SafeAreaView,TouchableOpacity,BackHandler, Alert } from "react-native";
import Side_page from "./side_page";
import LottieView from 'lottie-react-native';
import Sudoku from "./sudoku_page";
import Alert_page from "./alert";
import {DataContext} from '../reducers/datalayer'
import { CommonActions } from '@react-navigation/native';
const App1 = ({navigation,route}) => {
  const drawer = useRef(null);
  const { state, dispatch } = React.useContext(DataContext);
  const [alert, setAlert] = useState('none');
  const{level} = route.params;
  const navigationView = () => (
    <View >
      <Side_page navigation={navigation}></Side_page>
    </View>
  );
  const a1 = () => {

    drawer.current.openDrawer();
  }
  const backAction = () => {
    navigation.navigate('Menu',{
      level : null,
    })
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
 
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
      drawerBackgroundColor=  "#6A5ACD"
    >
    <View style = {{
        height : '100%',
        width : '100%',
        backgroundColor : 'white'
          } }>
    <View style = {{
        height : 50,
        backgroundColor : "#6A5ACD",
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%'
          } }>
        <TouchableOpacity  style = {{
        width : '33%',
        margin : 10,
        
          } }onPress={() => drawer.current.openDrawer()}>
          <SafeAreaView style = {{
           
          } }>
          <LottieView
            source={require('../Assets/menu1.json')}
            width = {25} height = {25} autoPlay = {false} loop = {false}>
            </LottieView>
          </SafeAreaView>
          </TouchableOpacity>
          <SafeAreaView style = {{
        width : '33%',
        margin : 10,
          } }>
            <Text  style={{
        color : 'white',
        fontWeight: 'bold', 
        fontSize : 18,
      
        }}>
        Sudoku
        </Text>
        </SafeAreaView>
        <TouchableOpacity style = {{
        width : '33%',
        marginTop : 8,
        marginLeft : 50,
          } }  
        onPress = {() => dispatch({
            type: 'Setcancel',
            cancel : 'flex',
          })}>
        <SafeAreaView>
        <LottieView
            source={require('../Assets/profile1.json')}
            width = {35} height = {35} autoPlay = {false} loop = {false}>
            </LottieView>
        </SafeAreaView>
        </TouchableOpacity>
        </View>
        <View style = {{
          display : 'flex',
        }}>
        <Sudoku navigation = {navigation} level= {level}></Sudoku>
        <View style = {{
          top : '-54%'}} >
        <Alert_page navigation = {navigation}></Alert_page>
        </View>
        </View>
        </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default App1;