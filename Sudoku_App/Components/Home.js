import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
//This screen allows user to create a username to play to sudoku.
const Home = ({navigation}) => {
  const [userName, setUserName] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Please insert your Name
        </Text>
        <TextInput
          value={userName}
          onChangeText={(username) => setUserName(username)}
          style={styles.inputStyle}
        />
        <Button
          title="Play"
          //Button Title
          backgroundColor = '#f4511e'
          onPress={() =>
            navigation.navigate('SecondPage', {
              paramKey: userName,
            })
          }
        />
      </View>
      <Text style={{textAlign: 'center', color: 'grey'}}>
        Don’t Guess
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center',
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 16,
      marginVertical: 10,
    },
    inputStyle: {
      width: '80%',
      height: 44,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#DBDBD6',
    },
  });
export default Home;