import axios from "axios";
import { nodeAPI } from "Constants/api";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  surveys: null,
  pollstersData: null,
  loading: null,
};

export const getPollsters = createAsyncThunk("getPollsters", async (state) => {
  const response = await nodeAPI.get(
    "/pollster/getByUserId/" + localStorage.getItem("userId")
  );
  return response;
});

export const getPollsterSurveys = createAsyncThunk(
  "getPollsterSurveys",
  async (state) => {
    const response = await nodeAPI.get(
      "/pollster/getPollsterSurveys/" +
        jwtDecode(localStorage.getItem("token")).Id
    );
    return response;
  }
);

export const finishSurveyPollster = createAsyncThunk(
  "finishSurveyPollster",
  async (state) => {
    const response = await nodeAPI.post(
      "surveyActions/finishSurveyPollster/" + state.SurveyId,
      {
        VerificationCode: state.VerificationCode,
        DemografikDetails: JSON.parse(
          localStorage.getItem("DemografikDetails")
        ),
        PollsterId: jwtDecode(localStorage.getItem("token")).Id,
        AnswersJson: JSON.stringify(state.Results),
      }
    );

    if (response.data.success) {
      console.log(response.data)
      state.history.push(
        "/pollster/survey/results/" + state.SurveyId + "/" + response.data.Id
      );
    } else {
      Swal.fire({
        text: response.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    return {
      ...response,
      history: state.history,
      SurveyId: state.SurveyId,
    };
  }
);

export const createPollster = createAsyncThunk(
  "createPollster",
  async (state) => {
    const response = await nodeAPI.post("/pollster/create", {
      ...state,
      UserId: localStorage.getItem("userId"),
    });
    if (response.data.success) {
      Swal.fire({
        timer: 1000,
        showConfirmButton: false,
        title: "Success",
        icon: "success",
      }).then((res) =>
        state.history.push(getLayoutName(state.history) + "/pollsters")
      );
    } else {
      Swal.fire({
        title: "Başarısız",
        showConfirmButton: false,
        timer: 2000,
        icon: "error",
        text: response.data.message,
      });
    }
    return response;
  }
);

export const editPollster = createAsyncThunk("editPollster", async (state) => {
  const response = await axios.post(apiUrl + "User/UpdatePollster", state);
  return response;
});

export const deletePollster = createAsyncThunk(
  "deletePollster",
  async (state) => {
    const response = await axios.get(apiUrl + "User/DeletePollster/" + state);
    if (response.data.success) {
      Swal.fire({
        timer: 1000,
        title: "Success",
        icon: "success",
        showConfirmButton: false,
      }).then((res) =>
        state.history.push(getLayoutName(state.history) + "/pollsters")
      );
      return response;
    }
  }
);

const pollsterSlice = createSlice({
  name: "pollsters",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getPollsters.fulfilled, (state, action) => {
      console.log(action.payload.data);
      // console.log(action.payload.data.data)
      state.pollstersData = action.payload.data;
      state.loading = false;
    });

    addCase(getPollsterSurveys.fulfilled, (state, action) => {
      state.surveys = action.payload.data;
    });
  },
});

export default pollsterSlice.reducer;
