/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
  Alert,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { emptyFavouriteList, emptyWatchList, fetchSomeData, getFavouriteItems, getUserName, getWatchListItems, removeFavourite,removeWatchList } from '../reducer/toolkitReducer';
import { NavigationContainer, findFocusedRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { saveLoggedIn, saveUserData, setUserData } from '../reducer/persistReducer';

function HomePage(props) {
  const [filterText,setFilterText] = useState('')
  const [filteredData,setFilteredData] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSomeData());
  },[]);
  const data = useSelector((state) => state.users.items);
  const favouriteMovie = useSelector((state) => state.users.favouriteItems);
  const watchListMovie = useSelector((state) => state.users.watchListItems);
  const navigation = useNavigation()

  const userData = useSelector((state)=>state.persistReducer.userData)
  const loggedIn = useSelector((state)=>state.persistReducer.isUserLoggedIn)

  const onPress = (item) =>{
    navigation.navigate('DetailsScreen',item)
  }

  const onPressLogout = ()=>{
    dispatch(saveLoggedIn(false))
    dispatch(setUserData({}))
    dispatch(emptyWatchList())
    dispatch(emptyFavouriteList()),
    dispatch(getUserName(''))
  }

  const handleAddFavorite = (item) =>{
    if(!loggedIn){
      Alert.alert('Please Login')
    }else{
      dispatch(getFavouriteItems(item))
    }
  }

  const handleRemoveFavorite = (item) =>{
    dispatch(removeFavourite(item))
  }

  const handleAddWatchList = (item) =>{
    if(!loggedIn){
      Alert.alert('Please Login')
    }else{
    dispatch(getWatchListItems(item))
  }
  }

  const handleRemoveWatchList = (item) =>{
    dispatch(removeWatchList(item))
  }

  const onChangeText = (text) =>{
    setFilterText(text)
    const filtered = data.results.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  }

  const exists = (item) => {
    if (favouriteMovie.filter(movie => movie.id === item.id).length > 0) {
      return true;
    }
    return false;
  };

  const existsWatchList = (item) => {
    if (watchListMovie.filter(movie => movie.id === item.id).length > 0) {
      return true;
    }
    return false;
  };

  const renderItem = ({item}) =>{
    const IMAGE_URL =
        'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return(
      <TouchableOpacity onPress={()=>onPress(item)} style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <Image
            source={{
              uri: IMAGE_URL,
            }}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={styles.buttonContainer}>
            <View>
              <Text style={styles.listTitleStyle}>
                {item.title}
              </Text>
            </View>
            <View
              style={styles.watchListContainer}>
                <TouchableOpacity
                onPress={() =>
                  existsWatchList(item) ? handleRemoveWatchList(item) : handleAddWatchList(item)
                }
                style={styles.watchListButton}>
              <Text
                style={styles.watchListTextStyle}>
                {existsWatchList(item) ? 'Remove From watchList' :'Add To watchList'}
              </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  exists(item) ? handleRemoveFavorite(item) : handleAddFavorite(item)
                }
                style={styles.iconContainer}>
                <MaterialIcons
                  color="orange"
                  size={32}
                  name={exists(item) ? 'favorite' : 'favorite-outline'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const renderItem2 = ({item}) =>{
    const IMAGE_URL =
        'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return(
      <TouchableOpacity onPress={()=>onPress(item)} style={styles.itemContainer}>
      <Image source={{uri:IMAGE_URL}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
    )
  }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleConatiner}>
          <View style={{flex:0.8,justifyContent:'center'}}>
          <Text style={styles.titleStyle}>{`Hii ${userData.name ? userData.name : ''}`}</Text>
          </View>
          {loggedIn && <TouchableOpacity style={{justifyContent:'flex-end',alignItems:'flex-end'}} onPress={onPressLogout}>
            <View style={styles.logoutStyle}>
              <MaterialIcons
                color="black"
                size={32}
                name={'logout'}
              />
            </View>
            </TouchableOpacity>}
        </View>
        <View style={styles.viewConatiner}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText(text)}
          value={filterText}
          placeholder={'Search'}
        />
        </View>
        <View style={styles.viewConatiner}>
          <Text style={styles.subtitle}>Trending</Text>
          <FlatList
            data={data.results}
            extraData={data.results}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem2}
          />
        </View>
        <View style={styles.viewConatiner}>
          {watchListMovie.length>0 && <Text style={styles.subtitle}>WatchList</Text>}
          <FlatList
            data={watchListMovie.length>0 ? watchListMovie : null}
            extraData={watchListMovie}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem2}
          />
        </View>
        <View style={styles.listContainer}>
        <FlatList
          data={filterText == '' ? data.results : filteredData}
          renderItem={(item) => renderItem(item)}
          extraData={[data,favouriteMovie]}
          scrollEnabled
        />
        </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textInputStyle: {
    flex:1,
    borderWidth:1,
    height:'10%'
  },
  buttonStyle: { 
  height: '7%', 
  width: '80%', 
  alignItems: 'center', 
  backgroundColor: 'black', 
  justifyContent: 'center' 
},
itemContainer: {
  marginRight: 16,
  alignItems: 'center',
  borderWidth:1
},
image: {
  width: 150,
  height: 150,
  borderRadius: 10,
},
title: {
  marginTop: 8,
  fontWeight: 'bold',
},
titleConatiner:{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'},
titleStyle:{fontSize:32,textAlign:'center'},
viewConatiner:{width:'100%',padding:16},
subtitle:{fontWeight:'bold',fontSize:20,paddingVertical:16},
listContainer:{justifyContent:'flex-end',paddingHorizontal:16},
mainContainer:{ marginVertical: 12 },
listContainer:{ flexDirection: 'row', flex: 1 },
imageStyle :{ width: 100, height: 150, borderRadius: 10 },
buttonContainer:{ flex: 1, marginLeft: 12 },
listTitleStyle:{ fontSize: 22, paddingRight: 16 },
favouriteButton:{
  flexDirection: 'row',
  marginTop: 10,
  alignItems: 'center',
},
iconContainer:{
  marginLeft: 14,
  flexDirection: 'row',
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  width: 40,
},
watchListContainer:{
  flexDirection: 'row',
  marginTop: 10,
  alignItems: 'center',
},
watchListButton:{
  marginLeft: 14,
  flexDirection: 'row',
  padding: 2,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
watchListTextStyle:{
  fontSize: 18,
  paddingLeft: 10,
  color: '#64676D',
},
logoutStyle: {alignItems:'flex-end',justifyContent:'center',paddingTop:8}
});

export default HomePage