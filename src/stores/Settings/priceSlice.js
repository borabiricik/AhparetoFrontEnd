import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  priceData: null,
  loading:false
};

export const getPrice = createAsyncThunk("getPrice",async (state) => {
  const response = await axios.get(apiUrl+"User/GetPriceAll")
  return response
})

export const updatePrice = createAsyncThunk("updatePrice",async (state) => {
  const response = await axios.post(apiUrl + "User/UpdatePrice",state)
  return {...response, history: state.history}
})

export const addPrice = createAsyncThunk("addPrice" ,async (state) => {
  const response = await axios.post(apiUrl + "User/AddPrice",state)
  return {...response,history: state.history }
})

const priceSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getPrice.pending,(state,action) => {
      state.loading = true
    })
    addCase(getPrice.fulfilled, (state,action) => {
      console.log(action.payload.data.data)
      state.priceData = action.payload.data.data
      state.loading = false
    })
    addCase(updatePrice.fulfilled,(state,action) => {
      console.log(action.payload)
      if(action.payload.data.success){
        Swal.fire({
          icon: "success",
          title: "Success",
          timer: 1000,
          showConfirmButton: false,
        }).then((res) =>
         action.payload.history.push(getLayoutName(action.payload.history) + "/pricing-settings")
        );
      }
    })
    addCase(addPrice.fulfilled,(state,action) => {
      if(action.payload.data.success){
        Swal.fire({
          icon: "success",
          title: "Success",
          timer: 1000,
          showConfirmButton: false,
        }).then((res) =>
         action.payload.history.push(getLayoutName(action.payload.history) + "/pricing-settings")
        );
      }
    })
  },
});

export default priceSlice.reducer
