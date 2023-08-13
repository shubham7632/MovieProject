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
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteItems, getWatchListItems, removeFavourite, removeWatchList } from '../reducer/toolkitReducer';

function DetailsScreen() {
   const route = useRoute()
   const dispatch = useDispatch()

   const data = route.params
   const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + data.poster_path;
   const favouriteMovie = useSelector((state) => state.users.favouriteItems);
   const watchListMovie = useSelector((state) => state.users.watchListItems);
   const loggedIn = useSelector((state)=>state.persistReducer.isUserLoggedIn)


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

  const exists = () => {
    if (favouriteMovie.filter(movie => movie.id === data.id).length > 0) {
      return true;
    }
    return false;
  };

  const existsWatchList = () => {
    if (watchListMovie.filter(movie => movie.id === data.id).length > 0) {
      return true;
    }
    return false;
  };

  const handleRemoveWatchList = (item) =>{
    dispatch(removeWatchList(item))
  }
   const onPressFavourite = () =>{
      exists() ? handleRemoveFavorite(data) : handleAddFavorite(data)
   }
   const onPressWatchList = ()=>{
      existsWatchList() ? handleRemoveWatchList(data) : handleAddWatchList(data)
   }

   
    return (
      <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={{
              uri: IMAGE_URL,
            }}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 24 }}>{data.title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style ={{fontSize:14}}>{data.overview}</Text>
          </View>
        </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.viewStyle} onPress={onPressWatchList}>
              <Text style={styles.buttonStyle}>{existsWatchList() ? 'Remove WatchList' : 'Add WatchList'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle2} onPress={onPressFavourite}>
                <Text style={styles.buttonStyle}>{exists() ?  'Remove Favourite': 'Add favourite'}</Text>
            </TouchableOpacity>
          </View>
      </View>
     </>
    );
  }

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  subContainer:{ justifyContent: 'flex-start', alignItems: 'center',paddingVertical:16 },
  textCenter: {
    textAlign: 'center',
    color: 'red'
  },
  imageStyle : { width: 100, height: 150, borderRadius: 10 },
  buttonStyle: { 
  alignItems: 'center',
  justifyContent: 'center',
  padding:16,
  textAlign:'center',
  color:'white'
},
viewStyle: {
  borderRadius: 5,
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  backgroundColor:'black'
},
viewStyle2: {
  borderRadius: 5,
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  backgroundColor:'pink'
},
textContainer:{ paddingVertical: 20, paddingHorizontal: 10 },
bottomContainer:{ flex:1,justifyContent: 'flex-end', alignItems: 'center' }
});


export default DetailsScreen