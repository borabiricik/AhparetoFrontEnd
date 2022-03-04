import { nodeAPI } from "Constants/api";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  questions: null,
  criteria: null,
  surveyResults: null,
  VerificationCode: null,
  SurveyId: null,
  isResultsLoading: false,
};

export const getQuestions = createAsyncThunk("getQuestions", async (state) => {
  const response = nodeAPI.get("question/getQuestion/133");
  return response;
});

export const getCriterias = createAsyncThunk("getCriterias", async (state) => {
  const response = nodeAPI.get("criteria/getCriterias/133");
  return response;
});

export const finishSurvey = createAsyncThunk("finishSurvey", async (state) => {
  const response = await nodeAPI.post(
    "surveyActions/finishSurvey/" + state.SurveyId,
    {
      VerificationCode: state.VerificationCode,
      DemografikDetails: [
        {
          DemografikId: 1106,
          DemografikValue: "Erkek",
        },
        {
          DemografikId: 1107,
          DemografikValue: "Lise",
        },
      ],
      AnswersJson: JSON.stringify(state.Results),
    }
  );

  if (response.data.success) {
    state.history.push(
      "/survey/results/" +
        state.SurveyId +
        "/" +
        state.VerificationCode
    );
  }
  else{
    Swal.fire({
      text: response.data.message,
      icon: "error",
      showConfirmButton:false,
      timer:2000
    });
  }
  return {
    ...response,
    history: state.history,
    VerificationCode: state.VerificationCode,
    SurveyId: state.SurveyId,
  };
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
    addCase(finishSurvey.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default fillSurveySlice.reducer;
