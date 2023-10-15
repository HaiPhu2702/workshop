import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAddPosts, apiListPosts, apiGetPostDetail, apiSearchPost, apiDeletePost } from "../../api/posts"

//reducer thunk
// export const getTodos = createAsyncThunk('todos/getTodos', async params => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//     return res.data
// })

export const addPosts = createAsyncThunk('posts/addPosts', async post => {
    const res = await apiAddPosts(post)
    return res.data
})

export const listPosts = createAsyncThunk('posts/listPosts', async () => {
    const res = await apiListPosts()
    return res.data
})

export const getPostDetail = createAsyncThunk('posts/getPostDetail', async (postId) => {
    const res = await apiGetPostDetail(postId)
    return res.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {

    const res = await apiDeletePost(postId)
    if (res.data.success) {
        return postId
    }
    else {
        // onError("delete failed")
    }
})

export const searchPosts = createAsyncThunk('posts/searchPosts', async (textSearch) => {
    const res = await apiSearchPost(textSearch)
    return res.data
})

//slice
const PostsSlicer = createSlice({
    name: "posts",
    initialState: {
        list: [],
        detail: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPosts.fulfilled, (state, action) => {
                state.list.unshift(action.payload)
            })
            .addCase(addPosts.rejected, (state, action) => { })

            .addCase(listPosts.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(listPosts.rejected, (state, action) => { })

            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.detail = action.payload;
            })
            .addCase(getPostDetail.rejected, (state, action) => { })

            .addCase(deletePost.fulfilled, (state, action) => {
                state.list = state.list.filter((post, index) => post._id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => { })

            .addCase(searchPosts.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => { })
    },
})

// reducer
export default PostsSlicer.reducer
