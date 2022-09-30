import React, {useEffect, useState} from 'react';
import {SafeAreaView,StyleSheet,View,Text,TextInput,Button,TouchableOpacity,
  FlatList,Image,BackHandler} from 'react-native';
import {DataContext} from '../reducers/datalayer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const UserList : React.FC<{Value : any}> = ({Value}) => {
    return (
        <SafeAreaView  style = {styles.sectionDescription}>
        <View style = {styles.sectionList} >
                  <SafeAreaView style = {styles.sectionRank}>
                    <Text style = {styles.sectionRankData}>{Value.index+1}</Text>
                  </SafeAreaView>
                 <SafeAreaView style = {styles.sectionProfile}>
                    <Image
                      style = {styles.ImageData}
                      source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                      }}>
                    </Image>
                  </SafeAreaView>
                  <SafeAreaView style = {styles.sectionProfileData}>
                    <Text style = {styles.sectionName}>{Value.username}</Text>
                  </SafeAreaView>
                  <SafeAreaView style = {styles.sectionPoints}>
                    <Text style = {styles.sectionName}>{Value.score}</Text>
                  </SafeAreaView>
                </View>
       </SafeAreaView>
  );
  }
const LeaderBoard = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext);
  const [data,setData] = useState({});
  const [list, setList] = useState([]);
  var token = state.token;
  const getleaderboarddata = async() => {
    try {
        const response = await fetch('http://192.168.43.99:9008/api/sudoku/Leader-Board', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${token}`
            },
          });
        if(response.status == 200)
        {
            const res = await response.json();
            setList(res)
        }

    } catch (error) {
        
    }
  }

  const renderItem = ({ item }) => (
    <UserList Value = {item}/>
  );
  const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Menu" },
        ],
      })
    );
    return true;
  };
  useEffect(() => {
    getleaderboarddata();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
 
      return (
          <SafeAreaView style={{
            flex: 1, 
            backgroundColor : '#FFFFFF',
            justifyContent: 'center',
            }}>
            <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.index}
          />
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
      sectionContainer: {
        alignContent : 'center', 
        height : '70%',
        width : '100%',
      },
      main : {
       height : '100%',
       width : '100%',
       backgroundColor : '#1c1c1c',
      },
      sectionTitle: {
        fontSize: 15, 
        fontFamily: 'Times New Roman',
        color : 'green',
        width : '100%',
        height : 50,
        padding : 12,
        borderWidth : 1,
        borderRadius : 20,
        borderColor : 'white',
      },
      sectionList: {
        flexDirection : 'row',
        margin : 5,
        width : '97%',
        height : 80,
        borderWidth : 1,
        borderRadius : 20,
        borderColor : 'white',
        backgroundColor : "#6A5ACD"
      },
      sectionProfileData: {
        
        color : 'green',
        width : '38%',
        height : 98,
      },
      sectionRank: {
        
        color : 'green',
        width : '10%',
        height : 98,
        
      },

      sectionPoints: {
        
        color : 'green',
        width : '25%',
        height : 98,
      },
      sectionRequest: {
       
        width : '34%',
        height : 100,
        textAlign : 'center'
      },
     
      
      
      sectionProfile: {
       
        alignItems : 'center',
        color : 'green',
        width : '28%',
        height : 98,
        
      },
      sectionName: {
        margin : 10,
        fontSize: 30,
        paddingTop : 12,
        fontFamily: 'Times New Roman',
        color : 'white',
        width : '100%',
        height : 50,
        
      },
      sectionRankData: {
        margin : 15,
        fontSize: 30,
        paddingTop : 10,
        paddingLeft : 5,
        fontFamily: 'Times New Roman',
        color : 'white',
        width : '100%',
        height : 50,
        
      },
     
      sectionDescription: {
        margin : 10,
        alignItems : 'center',
      },
     
      ImageData: {
        margin : 7,
        height : '70%',
        width : '70%',
        borderWidth : 1,
        borderRadius : 50,
        borderColor :  "#6A5ACD",
        
      
      },
  });
export default LeaderBoard;
