import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";

const initialState = {
  demografikData: null,
  dataCreate: {},
  loading: true,
};

// export const addDemografik = createAsyncThunk("addDemografik",async (state) => {
//   const response = await axios.post(apiUrl+ "User/AddDemografik",)
// })

export const getDemografik = createAsyncThunk(
  "getDemografik",
  async (state) => {
    const response = await axios.get(
      apiUrl + "User/GetAllDemografik/" + localStorage.getItem("userId")
    );
    return response;
  }
);

export const demografikSlice = createSlice({
  name: "demografik",
  initialState,
  reducers: {
    setData: (state, action) => {
      const apiName = action.payload.apiName
      state.dataCreate = action.payload;
      // state.dataCreate = {...state.dataCreate,state.: action.payload.data }
      state.dataCreate[apiName] = action.payload.data
      console.log(state.dataCreate)
    },
  },
  extraReducers: {
    [getDemografik.fulfilled]: (state, action) => {
      const { data } = action.payload.data;
      state.demografikData = data;
      state.loading = false;
    },
  },
});

export default demografikSlice.reducer;

export const { setData } = demografikSlice.actions;
