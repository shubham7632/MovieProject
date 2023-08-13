/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveLoggedIn, saveUserData, setUserData } from '../reducer/persistReducer';
import { emptyFavouriteList, emptyWatchList, getUserName } from '../reducer/toolkitReducer';

function ProfileScreen() {
   const route = useRoute()
   const userData = useSelector((state)=>state.persistReducer.userData)
   const dispatch = useDispatch();
   const onPressLogout = () =>{
      dispatch(saveLoggedIn(false))
      dispatch(setUserData({}))
      dispatch(emptyWatchList())
      dispatch(emptyFavouriteList()),
      dispatch(getUserName(''))
   }
    return (
      <>
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}>Profile Page</Text>
      </View>
      <View style={styles.textConatiner}>
        <Text style={styles.textStyle}>Name: {userData.name}</Text>
        <Text style={styles.textStyle}>Email: {userData.email}</Text>
        <Text style={styles.textStyle}>Phone: {userData.phone}</Text>
        <TouchableOpacity onPress={onPressLogout}><Text style={styles.logOutStyle}>Logout</Text></TouchableOpacity>
      </View>
     </>
    );
  }

const styles = StyleSheet.create({
  mainContainer:{alignItems:'center'},
  textConatiner:{ flex: 1 ,justifyContent:'center',alignItems:'center'},
  textStyle:{fontSize:25},
  logOutStyle:{fontSize:32,textAlign:'center'},
  titleStyle:{fontSize:50}
});


export default ProfileScreen