import { nodeAPI } from "Constants/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  questions: null,
  criteria: null,
};

export const getQuestions = createAsyncThunk("getQuestions", async (state) => {
  const response = nodeAPI.get("question/getQuestion/133");
  return response;
});

export const getCriterias = createAsyncThunk("getCriterias", async (state) => {
  const response = nodeAPI.get("criteria/getCriterias/133");
  return response;
});

const fillSurveySlice = createSlice({
  name: "fillSurveySlice",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getQuestions.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.data;
      state.isLoading = false;
    });
    addCase(getCriterias.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(getCriterias.fulfilled, (state, action) => {
      state.criteria = action.payload.data;
      state.isLoading = false;
    });
  },
});

export default fillSurveySlice.reducer;
