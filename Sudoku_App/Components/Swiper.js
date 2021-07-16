import React from 'react'
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: '#f4511e',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

const Swiper_Page = ({route,navigation}) =>
{
  const {paramKey} = route.params;
    return  (
        <Swiper style={styles.wrapper} showsButtons loop={false}>
          <View testID="Hello" style={styles.slide1}>
            <Text onPress = {() => navigation.navigate('ThirdPage', {
              paramKey: paramKey,
              level : "Easy",
            })} style={styles.text}>Easy</Text>
          </View>
          <View testID="Beautiful" style={styles.slide1}>
            <Text onPress = {() => navigation.navigate('ThirdPage',{
              paramKey: paramKey,
              level : "Medium",
            })} style={styles.text}>Medium</Text>
          </View>
          <View testID="Simple" style={styles.slide1}>
            <Text onPress = {() => navigation.navigate('ThirdPage',{
              paramKey: paramKey,
              level : "Hard",
            }
            )} style={styles.text}>Hard</Text>
          </View>
          <View testID="Simple" style={styles.slide1}>
            <Text onPress = {() => navigation.navigate('ThirdPage',{
              paramKey: paramKey,
              level : "Samurai",
            }
            )} style={styles.text}>Samurai</Text>
          </View>
        </Swiper>
      )
}
export default Swiper_Page;
