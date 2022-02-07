import React from 'react'
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import {DataContext} from '../reducers/datalayer'
import { CommonActions } from '@react-navigation/native';

const Swiper_Page = ({navigation}) =>
{
  const { state, dispatch } = React.useContext(DataContext)
  const funcall = (level) => {
    dispatch({
      type: 'Setgametype',
      gametype : 'Newgame'
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Game", params : {
            level : level,
          } },
        ],
      })
    );
  }
    return  (
    
        <Swiper  showsButtons loop={false}>
          <View testID="Hello" style={styles.slide1}>
            <Text style={styles.text} onPress = {() => funcall('Easy')} >Easy</Text>
          </View>
          <View testID="Beautiful" style={styles.slide1}>
            <Text onPress = {() => funcall('Medium')} style ={styles.text}>Medium</Text>
          </View>
          <View testID="Simple" style = {styles.slide1}>
            <Text onPress = {() => funcall('Hard')} style={styles.text}>Hard</Text>
          </View>
          <View testID="Simple" style={styles.slide1}>
            <Text onPress = {() => funcall('Samurai')
            } style={styles.text}>Samurai</Text>
          </View>
        </Swiper>
      )
}
var styles = {
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
      color: "#6A5ACD",
      fontSize: 30,
      fontWeight: 'bold'
    }
  }
export default Swiper_Page;
