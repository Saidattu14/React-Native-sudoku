import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';


//This screen is to congratulates the user for successfully solving the sudoku
const Success_Page = ({route,navigation}) => {
  const {username} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.textStyle} onPress={() =>
            navigation.navigate('SecondPage', {
              paramKey: username,
            })}>
        congratulations {username} 🎊🎉🎈 Tap to Start NewGame
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