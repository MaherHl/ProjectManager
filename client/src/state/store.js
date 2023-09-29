import { configureStore } from '@reduxjs/toolkit';
import authReducer from  './State'
const store = configureStore({
  reducer: authReducer,

});

export default store;