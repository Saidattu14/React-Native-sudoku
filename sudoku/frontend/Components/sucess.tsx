import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  BackHandler
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
const Success_Page = ({route,navigation}) => {
 
  const fun = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Menu" },
        ],
      })
    );
  }
  const backAction = () => {
    fun();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.textStyle} onPress={() =>
           fun()}>
        congratulations and Great Job🎊🎉🎈 TapHere for Main Menu
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center'
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 16,
      marginVertical: 10,
    },
    
  });
export default Success_Page;