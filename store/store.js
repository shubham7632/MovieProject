// import { createStore, combineReducers } from 'redux';
import userNameReducer from '../reducer/persistReducer';
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import postsSlice from '../reducer/toolkitReducer'
import persistSlice from '../reducer/persistReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  users: postsSlice,
  persistReducer: persistSlice

})
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);