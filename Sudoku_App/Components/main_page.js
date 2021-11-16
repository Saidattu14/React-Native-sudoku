import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import fetch from 'node-fetch';
import { useDataLayerValue } from '../reducers/datalayer';

//This screen allows user to create a username to play to sudoku.
const Main_page = ({navigation}) => {
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [show_password, setShowPassword] = useState(true);
  const [{ user, token, playlists, user_play_list_tracks, }, dispatch] = useDataLayerValue()
 
  return (
    <SafeAreaView style={{
      flex: 1, 
      backgroundColor : '#FFFFFF',
      justifyContent: 'center',
      }}>
    <View  style={styles.container}>
    <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password)}>
      <Text style={styles.text_data} >
       Continue Game
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.text} onPress={() => 
        navigation.navigate('SecondPage', {
            paramKey: null,
        })
        }>
      <Text style={styles.text_data} >
       New Game
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.text} onPress={
        () =>  navigation.navigate('SidePage', {
            paramKey: null,
        })
    }
        >
      <Text style={styles.text_data} >
       My Stats
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password)}>
      <Text style={styles.text_data} >
       Leader Board
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.text} onPress={() => submit_request(Username,Password)}>
      <Text style={styles.text_data} >
       Log out
      </Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    text : {
      alignItems: 'center',
      marginVertical: 10,
      height :40, 
      width : 290,
      backgroundColor : "#6A5ACD",
      borderWidth: 0.7,
      borderRadius : 10,
    },
    text_data : {
      textAlign :'center',
      color: 'white',
      padding: 10,
    },
  });
export default Main_page;