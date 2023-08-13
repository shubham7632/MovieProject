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


function FavouritePage(props) {
  const [movies,setMovies] = useState([])
  const dispatch = useDispatch();
  const favouriteMovie = useSelector((state) => state.users.favouriteItems);
  const navigation = useNavigation()

  const onPress = (item) =>{
    navigation.navigate('DetailsScreen',item)
  }

  const handleRemoveFavorite = (item) =>{
    dispatch(removeFavourite(item))
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
              style={styles.favouriteButton}>
              <TouchableOpacity
                onPress={() =>
                  handleRemoveFavorite(item)
                }
                style={styles.iconContainer}>
                <MaterialIcons
                  color="orange"
                  size={32}
                  name={'favorite'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
    return (
      <View contentContainerStyle={styles.container}>
        <View style={styles.titleConatiner}>
          <Text style={styles.titleStyle}>FavouritePage</Text>
        </View>
        <View style={styles.listStyle}>
        <FlatList
          data={favouriteMovie}
          renderItem={(item) => renderItem(item)}
          extraData={favouriteMovie}
          scrollEnabled
        />
        </View>
        {(!favouriteMovie.length>0) && 
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Please Add something to favourite</Text>
          </View>}
      </View>
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
titleStyle:{fontSize:32,textAlign:'center'},
listStyle:{padding:16},
subtitle:{justifyContent:'center',alignItems:'center'},
titleConatiner:{justifyContent:'center',alignContent:'center'},
subtitleText:{fontSize:24},
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
  padding: 2,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  width: 40,
}
});

export default FavouritePage