import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const persistSlice = createSlice({
    name: 'persist',
    initialState:{
     userDetails:[],
     isUserLoggedIn:false,
     userData:{}
    },
    reducers: {
      saveUserData(state, action) {
        state.userDetails=[...state.userDetails || [],action.payload]
      },
      saveLoggedIn(state, action) {
        state.isUserLoggedIn=action.payload
      },
      setUserData(state,action){
        state.userData=action.payload
      }
    },
  })
  
  // Extract the action creators object and the reducer
  const { actions, reducer } = persistSlice
  // Extract and export each action creator by name
  export const { saveUserData,saveLoggedIn,setUserData } = actions
  // Export the reducer, either as a default or named export
  export default reducer