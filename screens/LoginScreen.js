/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component,useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { email } from '../actions/action';
import { NativeModules } from 'react-native';
import { getEmail,getPassword, saveLoggedIn, setUserData } from '../reducer/persistReducer';
import { useNavigation } from '@react-navigation/native';

function LoginScreen(props) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userDetail,setUserDetails] = useState([])

  const data =  useSelector((state)=>state.persistReducer.userDetails)
  const navigation = useNavigation()

  useEffect(()=>{
    setUserDetails(data)
  },[data])
  

  const dispatch = useDispatch()
  
  const onChangeText = (text) => {
    setEmail(text)
  }

  const onChangeText2 = (text) => {
    setPassword(text)
  }

  const onPress2 = () => {
   props.navigation.navigate('RegisterScreen')
  }

  const search=()=>{
    const myArray = userDetail
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].email.toLowerCase() == email.toLowerCase() && myArray[i].password.toLowerCase() == password.toLowerCase()) {
        dispatch(setUserData(myArray[i]))
        return true
      }
    }
    return false
  }

  const onPress = () => {
    if(password == '' && email == ''){
      Alert.alert('Please enter something')
    }
    else{
    const myArray = userDetail
    if (search()) {
      dispatch(saveLoggedIn(true))
      navigation.navigate('HomePage')
    }
    else {
      Alert.alert('Incorrect Email or Password')
    }
  }
  }
  console.log('userDetail',userDetail)
 
    return (
      <View style={styles.container}>
        <Text>{'Welcome Please enter your name'}</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText(text)}
          value={email}
          placeholder={'Please Enter your email'}
        />
         <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText2(text)}
          value={password}
          placeholder={'Please Enter your password'}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
          <Text style={{ color: 'white' }}>{'Submit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButtonStyle} onPress={onPress2}>
          <Text style={{ color: 'black' }}>{'NewUser?SignIN'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua'
  },
  textCenter: {
    textAlign: 'center',
    color: 'red'
  },
  textInputStyle: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonStyle: { height: '7%', width: '80%', alignItems: 'center', backgroundColor: 'black', justifyContent: 'center' },
  bottomButtonStyle:{justifyContent:'center',paddingTop:16}
});


export default LoginScreen