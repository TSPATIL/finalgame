import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/Authentication/AuthenticationSlice'


export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
})