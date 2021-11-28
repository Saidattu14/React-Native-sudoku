import React, { Component, useDebugValue, useState, useEffect, useCallback } from 'react';
import 'react-native-gesture-handler';

import {TextInput,Pressable,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
  Alert,
  FlatList,
  AccessibilityInfo,
  Appearance,
  BackHandler,
  TouchableOpacity
} from 'react-native';
//This component is responsible to call sudoku functions and manipuate the user inputs.
const Timer = ({route,navigation}) => {
 const [val,setVal] = useState(false);
 const [start_timer] = useState((new Date()).getTime());
 const [time_details,setTime_details] = useState(0);
 


const Timer_function = () => {
   let timer_data = (new Date()).getTime();
   let timer = Math.floor(((timer_data-start_timer)/1000))  
   var minutes = Math.floor(timer/60);
   if(timer >= 3600)
   {
     let hrs = Math.floor(timer/3600);
     let mints = Math.floor((timer%3600)/60);
     let secs = Math.floor((timer%3600)/60);
     if(mints < 10)
     {
       if(hrs < 10)
       {
         minutes = "0" + String(hrs) + ":0" + String(mints) 
       }
       else
       {
         minutes = String(hrs) + ":0" + String(mints) 
       }
     }
     else
     {
       if(hrs < 10)
       {
         minutes = "0" + String(hrs) + ":0" + String(mints) 
       }
       else
       {
         minutes = String(hrs) + ":0" + String(mints) 
       }
     }
     
     return minutes;

   }
   else if(timer > 60)
   {
    let secs =  timer - Math.floor((timer)/60)*60;
    if ((secs) <= 9)
    {
      secs = String(0) + String(secs)
    } 
    
    
     if(minutes < 10)
     {
       minutes = "00:0" + String(minutes) +  ":" + secs
     }
     else
     {
       minutes = "00:" + String(minutes) + ":" + secs
     }
     return minutes;
   }
   else if(timer >= 0)
   {
    let secs =  timer - Math.floor((timer)/60)*60;
    if ((secs) <= 9)
    {
      secs = String(0) + String(secs)
    } 
    
     if(minutes < 10)
     {
       minutes = "00:0" + String(minutes)  + ":" + secs
     }
     else
     {
       minutes = "00:" + String(minutes) + ":" + secs
     }
     return minutes;
   }
 }


  const t = useCallback(() => {
   if(val == false )
   {
   const t1 = setTimeout(() => {
     const dt = Timer_function();
     setTime_details(dt);
     setVal(true);
   },900);
   return t1;
   }
  },[val]);
 
 useEffect(()=> {
   const val = false;
   setVal(val);
   const time = t();
   
  return function cleanup()
  {
   clearTimeout(time)
  }
 },[val,t]);

  return (
    <View >
        <Text>
        {time_details}
        </Text>
    </View>
    );
 
};

export default Timer;