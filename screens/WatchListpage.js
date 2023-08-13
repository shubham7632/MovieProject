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
  Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSomeData, getFavouriteItems, getWatchListItems, removeFavourite,removeWatchList } from '../reducer/toolkitReducer';
import { NavigationContainer, findFocusedRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


function WatchListPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSomeData());
  },[dispatch]);
  const watchListMovie = useSelector((state) => state.users.watchListItems);
  const navigation = useNavigation()

  const onPress = (item) =>{
    navigation.navigate('DetailsScreen',item)
  }

  const handleRemoveWatchList = (item) =>{
    dispatch(removeWatchList(item))
  }

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
                  handleRemoveWatchList(item)
                }
                style={styles.watchListButton}>
              <Text
                style={styles.watchListTextStyle}>
                {'Remove From watchList'}
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleConatiner}>
          <Text style={{fontSize:32,textAlign:'center'}}>WatchListpage</Text>
        </View>
        <View>
        <FlatList
          data={watchListMovie}
          renderItem={(item) => renderItem(item)}
          extraData={watchListMovie}
          scrollEnabled
        />
        {(!watchListMovie.length>0) && <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Please Add something to WatchList</Text>
          </View>}
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
    color: 'red'
  },
  textInputStyle: {
    flex:1,
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
titleConatiner:{justifyContent:'center',alignContent:'center'},
subtitleText:{fontSize:24},
subtitle:{paddingTop:16,paddingHorizontal:4}
});

export default WatchListPage