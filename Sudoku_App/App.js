import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,Alert, 
 } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App_data from './Components/Main';
import Home from './Components/Home';
import Swiper_Page from './Components/Swiper';
import Success_Page from './Components/Sucess_page';
const Stack = createStackNavigator();
//This is the starting point of the application.
// Here a Context Navigator is created and assigned screen names to navigate to other screens.
const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Home}
          options={{
            title: 'Welcome to Sudoku', 
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign : 'center'
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
              backgroundColor: '#f4511e',
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
            title: 'Sudoku', 
            headerStyle: {
              backgroundColor: '#f4511e', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            alignItems: 'center', 
          }}
        />
        <Stack.Screen
          name="FourthPage"
          component={Success_Page}
          options={{
            headerShown: false,
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
