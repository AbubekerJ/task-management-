import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice";
import storage from 'redux-persist/lib/storage'; //
import { persistStore, persistReducer } from 'redux-persist';


const rootReducer = combineReducers({user:userSlice}) //this is used if we have more slice reducers 
const persistConfig = {
    key: 'root',
    storage, //this need to be imported 
    verion :1
  };
const persistedReducer  = persistReducer(persistConfig , rootReducer) //persistReducer need to be imported


export const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    }
});

export const persistor = persistStore(store);