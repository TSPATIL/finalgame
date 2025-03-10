import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/Authentication/AuthenticationSlice'
import alertReducer from './features/Alerts/AlertSlice'
import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
import contactReducer from './features/Contact/ContactSlice';

const persistConfig = {
  key: 'reducer',
  storage
}

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  alert: alertReducer,
  contact: contactReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);