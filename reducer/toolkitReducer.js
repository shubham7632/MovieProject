import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'react-native-axios'
import { useDispatch } from 'react-redux';


export const fetchSomeData = createAsyncThunk('data/movieData', async () => {
  const response = await axios.get('https://api.themoviedb.org/3/discover/movie',{headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWYwNWNhYWFlZTcxOTRmOTQ1NGQ4NmFjNWZhNzIwYSIsInN1YiI6IjY0ZDYxMWFmZGI0ZWQ2MDBmZmI3YjUyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9-IE5i2safnLVJkb-Fl5sW-A7UOUnedY92Mhx0Qw89E',
    accept : 'application/json'
  }});
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState:{
    name1:'',
    items:[],
    watchListItems:[],
    favouriteItems:[]
  },
  reducers: {
    getUserName(state, action) {
      state.name1=action.payload
    },
    getWatchListItems(state,action){
      state.watchListItems=action.payload
    },
    getFavouriteItems(state,action){
      state.favouriteItems=[...state.favouriteItems,action.payload]
    },
    removeFavourite(state,action){
      const data = action.payload
      state.favouriteItems = state.favouriteItems.filter((item)=>{
          return item.id !== data.id
      })
    },
    getWatchListItems(state,action){
      state.watchListItems=[...state.watchListItems,action.payload]
    },
    removeWatchList(state,action){
      const data = action.payload
      state.watchListItems = state.watchListItems.filter((item)=>{
          return item.id !== data.id
      })
    },
    emptyWatchList(state,action){
      state.watchListItems = []
    },
    emptyFavouriteList(state,action){
      state.favouriteItems = []
    }
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSomeData.fulfilled, (state, action) => {
          state.items = action.payload;
        })
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = postsSlice
// Extract and export each action creator by name
export const { getWatchListItems, getFavouriteItems, getUserName,getItems,removeFavourite,removeWatchList,emptyWatchList,emptyFavouriteList } = actions
// Export the reducer, either as a default or named export
export default reducer

