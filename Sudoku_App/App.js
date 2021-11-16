import 'react-native-gesture-handler';
import React, { Component, useDebugValue, useState, useEffect, useCallback } from 'react';
import { SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,Alert, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App_data from './Components/sudoku_page';
import Home from './Components/Home';
import Swiper_Page from './Components/Swiper';
import Success_Page from './Components/Sucess_page';
import Main_page from './Components/main_page';
import Side_page from './Components/side_page'
import { useDataLayerValue } from './reducers/datalayer';


const Stack = createStackNavigator();


//This is the starting point of the application.
// Here a Context Navigator is created and assigned screen names to navigate to other screens.
const App = ({navigation}) => {

  const [{show_nav_bar}, dispatch] = useDataLayerValue();
  // componentDidMount()
  // {
  
  // }
  // useEffect(()=> {
  //   dispatch({
  //   type: "SET_TOKEN",
  //   token: "Sai",
  // });
  // },[]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Home}
          options={{
<<<<<<< Updated upstream
            title: 'Welcome to Sudoku', 
            headerStyle: {
              backgroundColor: '#f194ff',
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
=======
            title: null,
            backgroundColor : '#FFFFFF'
          }}
        />
        <Stack.Screen
          name="Main_page"
          component={Main_page}
          options={{
            title: null,
            backgroundColor : '#FFFFFF',
            headerLeft: () => {
              return null;
>>>>>>> Stashed changes
            },
          
          }}
        />
        <Stack.Screen
          name="SecondPage"
          component={Swiper_Page}
          options={{
            headerLeft: () => {
              return null;
            },
            title: 'Choose Difficulty',
            headerStyle: {
<<<<<<< Updated upstream
              backgroundColor: '#f194ff',
=======
              backgroundColor : "#6A5ACD",
>>>>>>> Stashed changes
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            headerTitleAlign : 'center'
          }}
        />
        <Stack.Screen
          name="ThirdPage"
          component={App_data}
          options={{
            headerLeft: () => {
              return null;
            },
           
            title: "Sudoku", 
            
            headerStyle: {
<<<<<<< Updated upstream
              backgroundColor: "#f194ff", 
=======
              backgroundColor:  '#FFFFFF',
              height : 60,
>>>>>>> Stashed changes
            },
           
            headerTintColor: "#6A5ACD", 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            headerTitleAlign : 'center',
            alignItems: 'center',
            headerShown : true,

            
            
          }}
          
        />
        <Stack.Screen
          name="FourthPage"
          component={Success_Page}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SidePage"
          component={Side_page}
          options={{
            headerLeft: () => {
              return null;
            },
           
            title: "Sudoku", 
            
            headerStyle: {
              backgroundColor:  '#FFFFFF',
              height : 60,
            },
           
            headerTintColor: "#6A5ACD", 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            headerTitleAlign : 'center',
            alignItems: 'center',
            headerShown : true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
    new_game : {color : 'white',textAlign :'center', fontWeight : 'bold',fontSize : 18}
});
export default App;
