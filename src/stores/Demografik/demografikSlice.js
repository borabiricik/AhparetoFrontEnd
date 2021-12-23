import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";
import Swal from "sweetalert2";

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

export const createDemografik = createAsyncThunk(
  "createDemografik",
  async (state) => {
    console.log(state);
    const response = axios.post(apiUrl + "User/AddDemografik", {
      ...state,
      userId: localStorage.getItem("userId"),
      typeId: 10,
    });
    return response;
  }
);

export const demografikSlice = createSlice({
  name: "demografik",
  initialState,
  extraReducers: {
    [getDemografik.fulfilled]: (state, action) => {
      const { data } = action.payload.data;
      state.demografikData = data;
      state.loading = false;
    },
    [createDemografik.fulfilled]: (state, action) => {
      return Swal.fire({
        title: "Başarılı",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    },
  },
});

export default demografikSlice.reducer;

export const { setData } = demografikSlice.actions;
