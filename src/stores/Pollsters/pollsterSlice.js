import axios from "axios";
import { apiUrl } from "Constants/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState= {
  pollstersData: null,
  loading:null
}



export const getPollsters = createAsyncThunk("getPollsters", async (state) => {
  const response = await axios.get(
    apiUrl + "User/GetPollsterDtoById/" + localStorage.getItem("userId")
  );
  return response;
});

const pollsterSlice = createSlice({
  name: "pollsters",
  initialState,
  extraReducers:(builder)=> {
    builder.addCase(getPollsters.fulfilled,(state,action) => {
      // console.log(action.payload.data.data)
      state.pollstersData =action.payload.data.data 
      state.loading = false
    })
  },
});

export default pollsterSlice.reducer;
