import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/login';
import App1 from './Components/app1';
import Login from './Components/login';
import Menu_page from './Components/Menu';
import Sudoku from './Components/sudoku_page';
import Side_page from './Components/side_page';
import Swiper_Page from './Components/swiper';
import Register from './Components/register';
import Mystats from './Components/mystats';
import LeaderBoard from './Components/leaderboard';
import Settings from './Components/settings';
import Success_Page from './Components/sucess';
export interface State {
  Navigation : any,
}

const Stack = createNativeStackNavigator();


function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Menu"
          component={Menu_page}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Game"
          component={App1}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Swiper"
          component={Swiper_Page}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Sudoku"
          component={Sudoku}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Mystats"
          component={Mystats}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Leaderboard"
          component={LeaderBoard}
          options={{
            headerShown: false,
          }} />
           <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }} />
           <Stack.Screen
          name="Success"
          component={Success_Page}
          options={{
            headerShown: false,
          }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
