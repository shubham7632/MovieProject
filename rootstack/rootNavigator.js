/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import LoginScreen from '../screens/LoginScreen';
import FavouritePage from '../screens/FavouritePage';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';
import WatchListPage from '../screens/WatchListpage';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();


function RootNavigator() {
    const login = useSelector(state => state.persistReducer.isUserLoggedIn)

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen options={{
                    headerShown: false, tabBarIcon: ({ }) => (
                        <View>
                            <MaterialIcons
                                color="orange"
                                size={32}
                                name={'home'}
                            />
                        </View>
                    ),
                }} name="Home" component={StackNavigator} />
                {
                    (!login) ? <Tab.Screen options={{
                        headerShown: false, tabBarIcon: ({ }) => (
                            <View>
                                <MaterialIcons
                                    color="orange"
                                    size={32}
                                    name={'login'}
                                />
                            </View>
                        ),
                    }} name="LoginScreen" component={LoginScreen} /> :
                        <>
                            <Tab.Screen options={{
                                headerShown: false, tabBarIcon: ({ }) => (
                                    <View>
                                        <MaterialIcons
                                            color="orange"
                                            size={32}
                                            name={'favorite'}
                                        />
                                    </View>
                                ),
                            }} name="favourite" component={FavouritePage} />
                            <Tab.Screen options={{
                                headerShown: false, tabBarIcon: ({ }) => (
                                    <View>
                                        <MaterialIcons
                                            color="orange"
                                            size={32}
                                            name={'watch-later'}
                                        />
                                    </View>
                                ),
                            }} name="WatchList" component={WatchListPage} />
                            <Tab.Screen options={{
                                headerShown: false, tabBarIcon: ({ }) => (
                                    <View>
                                        <MaterialIcons
                                            color="orange"
                                            size={32}
                                            name={'folder'}
                                        />
                                    </View>
                                ),
                            }} name="Profile" component={ProfileScreen} />
                        </>
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
