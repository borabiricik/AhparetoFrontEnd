import { nodeAPI } from "Constants/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  results: null,
};

export const getSurveyResultsByVerificationCode = createAsyncThunk(
  "getSurveyResultsByVerificationCode",
  async (state) => {
    const response = await nodeAPI.get(
      "surveyResults/getSurveyResultsByVerificationCode/" +
        state.SurveyId +
        "/" +
        state.VerificationCode
    );
    return response;
  }
);

const surveyResultsSlice = createSlice({
  name: "surveyResults",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getSurveyResultsByVerificationCode.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(getSurveyResultsByVerificationCode.fulfilled, (state, action) => {
      console.log(action.payload);
      state.results = action.payload.data;
      state.isLoading = false;
    });
  },
});

export default surveyResultsSlice.reducer;
