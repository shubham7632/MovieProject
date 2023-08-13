
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import RegisterScreen from '../screens/RegisterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import WatchListPage from '../screens/WatchListpage';
import FavouritePage from '../screens/FavouritePage';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="WatchListPage" component={WatchListPage} />
          <Stack.Screen name="FavouritePage" component={FavouritePage} />
          <Stack.Screen name="ProfilePage" component={ProfileScreen} />
      </Stack.Navigator>

  );
}
export default StackNavigator;
