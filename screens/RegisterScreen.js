/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component,useEffect,useState } from 'react';
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
import { userName } from '../actions/action';
import { NativeModules } from 'react-native';
import { getUserName,getPassword, saveUserData } from '../reducer/persistReducer';
import { useNavigation } from '@react-navigation/native';

function RegisterScreen() {
    const data =  useSelector((state)=>state.persistReducer.userDetails)


  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [userDetail,setUserDetails] = useState([])

  const dispatch = useDispatch();
  const navigation = useNavigation()

  useEffect(()=>{
    setUserDetails(data)
  },[data])
  
  const onChangeText = (text) => {
    setUserName(text)
  }

  const onChangeText2 = (text) => {
    setPassword(text)
  }

  const onChangeText3 = (text) => {
    setEmail(text)
  }

  const onChangeText4 = (text) => {
    setPhone(text)
  }

const search=()=>{
    const myArray = userDetail
   const  nameKey = email
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].email === nameKey) {
            return true;
        }
    }
    return false
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phoneRegex = /^[0-9]{10}$/;

  const onPress = () => {
    if(!(emailRegex.test(email) && phoneRegex.test(phone))){
      Alert.alert('Wrong Fields')
    }
    else{
    if(!search()){
        const newObj = { "name": username, "password": password, "email": email, "phone": phone }
        dispatch(saveUserData(newObj))
        navigation.navigate('LoginScreen')
        setEmail('')
        setUserName('')
        setPassword('')
        setPhone('')
    }
    else{
        Alert.alert('Already Exist')
    }
  }
  }
 
    return (
      <View style={styles.container}>
        <Text>{'Welcome Please enter your name'}</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText(text)}
          value={username}
          placeholder={'Please Enter your username'}
        />
         <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText2(text)}
          value={password}
          placeholder={'Please Enter your password'}
          password
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText3(text)}
          value={email}
          placeholder={'Please Enter your email'}
        />
         <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText4(text)}
          value={phone}
          placeholder={'Please Enter your phone'}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
          <Text style={{ color: 'white' }}>{'Submit'}</Text>
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
  buttonStyle: { height: '7%', 
  width: '80%', 
  alignItems: 'center', 
  backgroundColor: 'black', 
  justifyContent: 'center' 
}
});


export default RegisterScreen