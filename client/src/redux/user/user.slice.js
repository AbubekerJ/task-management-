import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   currentUser: null,
   loading: false,
   error: null
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
       signInStart: (state) => {
           state.loading = true;
           state.error = null
       },
       signInSuccess: (state, action) => {
           state.loading = false;
           state.currentUser = action.payload;
           state.error = null;
       },
       signInFail: (state, action) => {
           state.error = action.payload;
           state.loading = false;
       },
       signOutStart: (state) => {
        state.loading = true;
        state.error = null
    },
    signOutSuccess: (state, action) => {
        state.loading = false;
        state.currentUser = null
        state.error = null;
    },
    signOutFail: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
       
   }
})

export const { signInStart, signInSuccess, signInFail  , signOutFail , signOutStart , signOutSuccess} = userSlice.actions

export default userSlice.reducer
