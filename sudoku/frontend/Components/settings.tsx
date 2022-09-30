import React, { useState,useEffect } from "react";
import { View, Switch, StyleSheet,Text,BackHandler } from "react-native";
import { CommonActions } from '@react-navigation/native';
import {DataContext} from '../reducers/datalayer'
const Settings = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext);
  const [isEnabled, setIsEnabled] = useState(state.touchpad);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch({
      type: 'Settouchpad',
      touchpad : isEnabled,
    });
    console.log(state.touchpad)
  }
  const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Game" },
        ],
      })
    );
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>
        Touch Pad
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection : 'row'
  }
});

export default Settings;