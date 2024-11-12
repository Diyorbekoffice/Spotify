import { configureStore } from '@reduxjs/toolkit';
import musicReducer from '../redax/musicSlice';
import likesReducer from '../redax/likesSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    likes: likesReducer,
  },
});
