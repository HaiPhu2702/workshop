import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postSlice'
import usersReducer from './reducers/usersSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users:usersReducer
    },
});
