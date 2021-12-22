import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";

const initialState = {
    demografikData:null,
    loading:true
};

export const getDemografik = createAsyncThunk(
  "getDemografik",
  async (state) => {      
    const response = await axios.get(apiUrl + "User/GetAllDemografik/1");
    return response;
  }
);

export const demografikSlice = createSlice({
  name: "demografik",
  initialState,
    extraReducers: {
      [getDemografik.fulfilled]: (state, action) => {          
          const {data} = action.payload.data;
          state.demografikData = data
          state.loading = false
      },
    },
//   extraReducers: (builder) => {
//       builder.addCase(getDemografik.fulfilled,(state,action) => {
//         console.log("getting demografik")
//       })
//   },
});

export default demografikSlice.reducer;
