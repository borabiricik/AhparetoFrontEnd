import axios from "axios";
import { apiUrl } from "Constants/api";

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

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSurveys.fulfilled, (state, action) => {
      state.surveysData = action.payload.data.data;
      state.loading = false;
    });
  },
});

export default surveySlice.reducer;
