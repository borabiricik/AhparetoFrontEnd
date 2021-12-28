import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const initialState = {
  iyzicoData: null,
  loading: false,
};

export const getPaymentConfig = createAsyncThunk(
  "getPaymentConfig",
  async (state) => {
    const response = await axios.get(apiUrl + "User/GetPaymentConfig");
    console.log(response);
    return response;
  }
);

export const updatePaymentConfig = createAsyncThunk(
  "updatePaymentConfig",
  async (state) => {
    const response = await axios.post(
      apiUrl + "User/UpdatePaymentConfig",
      state
    );
    return { ...response, history: state.history };
  }
);

const iyzicoSlice = createSlice({
  name: "iyzico",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getPaymentConfig.pending, (state, action) => {
      state.loading = true;
    });
    addCase(getPaymentConfig.fulfilled, (state, action) => {
      state.iyzicoData = action.payload.data;
      state.loading = false;
    });
    addCase(updatePaymentConfig.fulfilled, (state,action) => {
      if(action.payload.data.success){
          Swal.fire({
              icon:"success",
              title:"Başarılı",
              timer:1000,
              showConfirmButton:false
          })
          .then(res=> action.payload.history.push(getLayoutName(action.payload.history) + "/iyzico-settings"))
      }
    })
  },
});

export default iyzicoSlice.reducer;
