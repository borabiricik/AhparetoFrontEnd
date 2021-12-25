import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

var initialState = {
  demografikData: null,
  dataCreate: {},
  loading: true,
  success: false,
};

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
    const response = await axios.post(apiUrl + "User/AddDemografik", {
      ...state,
      userId: localStorage.getItem("userId"),
      typeId: 10,
    });
    console.log(state);
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        timer: 1000,
        showConfirmButton: false,
      }).then((res) =>
        state.history.push(getLayoutName(state.history) + "/demografik")
      );
    }
    return response;
  }
);

export const editDemografik = createAsyncThunk(
  "editDemografik",
  async (state) => {
    const response = await axios.post(apiUrl + "User/UpdateDemografik", state);
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        timer: 1000,
        showConfirmButton: false,
      }).then((res) =>
        state.history.push(getLayoutName(state.history) + "/demografik")
      );
    }
    return response;
  }
);

export const deleteDemografik = createAsyncThunk(
  "deleteDemografik",
  async (state) => {
    const response = axios.get(apiUrl + "User/DeleteDemografik/" + state);
    return response;
  }
);

export const demografikSlice = createSlice({
  name: "demografik",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDemografik.fulfilled, (state, action) => {
      state.demografikData = action.payload.data.data;
      state.loading = false;
    });
  },
  // extraReducers: {
  //   [getDemografik.fulfilled]: (state, action) => {
  //     state.demografikData = action.payload.data.data;
  //     state.loading = false;
  //   },
  //   [createDemografik.fulfilled]: async (state, action, thunkAPI) => {
  //     state.success = await action.payload.data.success;
  //   },
  //   [editDemografik.fulfilled]: async (state, action) => {
  //     state.success = await action.payload.data.success;
  //   },
  //   [deleteDemografik.fulfilled]: async (state, action) => {
  //     if (action.payload.data.success) {
  //       Swal.fire({
  //         title: "Başarılı",
  //         timer: 1000,
  //         showConfirmButton: false,
  //         icon: "success",
  //       });
  //     }
  //   },
  // },
});

export default demografikSlice.reducer;

export const { setData } = demografikSlice.actions;
