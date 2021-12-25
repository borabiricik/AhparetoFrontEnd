import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  pollsterGroupsData: [],
  loading: null,
  success: false,
};

export const getPollsterGroups = createAsyncThunk(
  "getPollsterGroups",
  async (state) => {
    // console.log("pollsterData:"+ state.pollsterGroupsData)
    const response = await axios.get(
      apiUrl + "User/GetAllPollsterGroup/" + localStorage.getItem("userId")
    );
    return response;
  }
);

export const createPollsterGroup = createAsyncThunk(
  "createPollsterGroup",
  async (state) => {
    const response = await axios.post(apiUrl + "User/AddPollsterGroup", state);
    if(response.data.success){
      Swal.fire({
        icon:"success",
        title:"Başarılı",
        timer:1000,
        showConfirmButton:false
      }).then(res=>state.history.push(getLayoutName(state.history)+"/pollstergroups"))
    }
    return response;
  }
);

export const deletePollsterGroup = createAsyncThunk(
  "deletePollsterGroup",
  async (state) => {
    const response = axios.get(apiUrl + "User/DeletePollsterGroup/" + state);
    if(response.data.success){
      Swal.fire({
        icon:"success",
        title:"Başarılı",
        timer:1000,
        showConfirmButton:false
      }).then(res=>state.history.push(getLayoutName(state.history)+"/pollstergroups"))
    }
    return response;
  }
);

export const updatePollsterGroup = createAsyncThunk(
  "updatePollsterGroup",
  async (state) => {
    const response = await axios.post(
      apiUrl + "User/UpdatePollsterGroup",
      state
    );
    if(response.data.success){
      Swal.fire({
        icon:"success",
        title:"Başarılı",
        timer:1000,
        showConfirmButton:false
      }).then(res=>state.history.push(getLayoutName(state.history)+"/pollstergroups"))
    }
    return response;
  }
);

const pollsterGroupSlice = createSlice({
  name: "pollsterGroups",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPollsterGroups.fulfilled,(state,action) => {
      state.pollsterGroupsData = action.payload.data.data
      state.loading=false
    })
  }
  // extraReducers: {
  //   [getPollsterGroups.fulfilled]: (state, action) => {
  //     console.log(action.payload.data.data);
  //     state.pollsterGroupsData = action.payload.data.data;
  //     state.loading = false;
  //   },
  //   [createPollsterGroup.fulfilled]: (state, action) => {
  //     state.success = action.payload.data.success;
  //   },
  //   [deletePollsterGroup.fulfilled]: (state, action) => {
  //     state.success = action.payload.data.success;
  //   },
  //   [updatePollsterGroup.fulfilled]: (state, action) => {
  //     state.success = action.payload.data.success;
  //   },
  // },
});

export default pollsterGroupSlice.reducer;
