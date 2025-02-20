import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminAuth from './ReduxFunction';
import baseApi from './Api/baseApi';
import forgotEmailReducer from './allSlice/otpSlice';



// Persist configuration for `formData`
const formPersistConfig = {
  key: 'formData',
  storage,
};


const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, adminAuth);

export const store = configureStore({
  reducer: {
 
    Auth: persistedReducer,
    forgotPass: forgotEmailReducer,



    // Add API reducers
    [baseApi.reducerPath]: baseApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['Auth.somePathWithNonSerializableValues'],
      },
    })
    .concat(baseApi.middleware), // Concatenate all middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
