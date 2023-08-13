import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// if not working  try https://ide-fbecccadeabdedfcebceacafcdfdaafcdadabbbdecf.project.examly.io/proxy/8080
export let getUserDetails = createAsyncThunk("/login", (state) => {
    return axios
        .get("http://localhost:8080/userDetails",)
        .then((res) => res.data)
        .catch((err) => { console.log(err); state.user = [] });
});
const initialState = {
    user: {},
};

let UserReducer = createSlice({
    name: "User",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action.payload;
            console.log(state.user)
            console.log('done')
        });
        builder.addCase(getUserDetails.pending, () => {
            console.log("pending");

        });
        builder.addCase(getUserDetails.rejected, () => {
            console.log("rejected");
        });
    },
});
export default UserReducer.reducer;