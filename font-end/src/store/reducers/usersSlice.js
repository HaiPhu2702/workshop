import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiLogin } from "../../api/users"


export const login = createAsyncThunk('users/login', async account => {
    const res = await apiLogin(account)
    return res.data.access_token
})

//slice
const UserSlicer = createSlice({
    name: "login",
    initialState: {

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("access_token", action.payload)
            })
            .addCase(login.rejected, (state, action) => { })
    },
})

// reducer
export default UserSlicer.reducer
