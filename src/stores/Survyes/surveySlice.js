import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  surveysData: null,
  loading: true,
};

export const getSurveys = createAsyncThunk("getSurveys", async (state) => {
  const response = await axios.get(
    apiUrl + "User/GetAllSurvey/" + localStorage.getItem("userId")
  );
  return response;
});

export const addSurvey = createAsyncThunk("addSurvey", async (state) => {
  const response = await axios.post(apiUrl + "User/AddSurvey", {
    ...state,
    demografikJson: JSON.stringify(state.demografikJson),
    pollsterJson: JSON.stringify(state.pollsterJson),
  });
  if (response.data.success) {
    Swal.fire({
      timer: 1000,
      icon: "success",
      title: "Başarılı",
      showConfirmButton: false,
    }).then((res) => {
      state.history.push(getLayoutName(state.history) + "/surveys")
    });
  }
  return response;
});

export const updateSurvey = createAsyncThunk("updateSurvey", async (state) => {
  const response = await axios.post(apiUrl + "User/UpdateSurvey", state);
  if (response.status === 200) {
    Swal.fire({
      timer: 1000,
      icon: "success",
      title: "Başarılı",
      showConfirmButton: false,
    }).then((res) =>
      state.history.push(getLayoutName(state.history) + "/surveys")
    );
  }
  return response;
});

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSurveys.fulfilled, (state, action) => {
      state.surveysData = action.payload.data.data;
      state.loading = false;
    });
    builder.addCase(addSurvey.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default surveySlice.reducer;
