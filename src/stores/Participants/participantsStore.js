import { nodeAPI } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";
import { FireSwal } from "utils/FireSwal";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  participants: null,
  loading: false,
};

export const addParticipants = createAsyncThunk(
  "addParticipants",
  async (state) => {
    console.log(state.Participants);
    const response = await nodeAPI.post(
      "/participants/addParticipants/" + state.SurveyId,
      [...state.Participants]
    );
    return { ...response, history: state.history };
  }
);

export const getSurveyParticipants = createAsyncThunk(
  "getSurveyParticipants",
  async (state, { rejectWithValue }) => {
    try {
      const response = await nodeAPI.get(
        "/participants/getParticipants/" + state
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const participantsStore = createSlice({
  name: "participants",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(addParticipants.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        Swal.fire({
          title: "Başarılı",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then((resp) => {
          action.payload.history.goBack();
        });
      } else {
        Swal.fire({
          title: "Başarısız",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        }).then((resp) => {
          action.payload.history.goBack();
        });
      }
    });

    addCase(getSurveyParticipants.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.participants = action.payload.data;
      state.loading = false;
    });

    addCase(getSurveyParticipants.rejected, (state,action) => {
      FireSwal({
        message: action.payload.message,
        error: true,
        statusCode: action.payload.statusCode,
      });
    });
  },
});

export default participantsStore.reducer;
