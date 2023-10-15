import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer
    },
});
