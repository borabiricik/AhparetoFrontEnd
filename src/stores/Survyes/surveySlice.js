import axios from "axios";
import { nodeAPI } from "Constants/api";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  surveysData: null,
  loading: true,
  itemsLoading: false,
  items: null,
};

export const getSurveys = createAsyncThunk("getSurveys", async (state) => {
  const response = nodeAPI.get(
    "/survey/getByUserId/" + localStorage.getItem("userId")
  );
  return response;
});

export const addSurvey = createAsyncThunk("addSurvey", async (state) => {
  const response = await nodeAPI.post("/survey/create", {
    ...state,
    UserId: parseInt(localStorage.getItem("userId")),
  });
  if (!response.data.success) {
    Swal.fire({
      timer: 1000,
      icon: "success",
      title: "Success",
      showConfirmButton: false,
    }).then((res) => {
      state.history.push(getLayoutName(state.history) + "/surveys");
    });
  }

  return response;
});

export const updateSurvey = createAsyncThunk("updateSurvey", async (state) => {
  const response = await nodeAPI.patch("/survey/edit/" + state.Id, state);
  if (response.status === 200) {
    Swal.fire({
      timer: 1000,
      icon: "success",
      title: "Success",
      showConfirmButton: false,
    }).then((res) => {
      state.history.push(getLayoutName(state.history) + "/surveys");
    });
  }
  return response;
});

export const addItems = createAsyncThunk("addItems", async (state) => {
  console.log(state.items);
  const response = await nodeAPI.post("/item/addItems/" + state.id, {
    items: state.items,
  });
  console.log(response);
  return response;
});

export const getSurveyItems = createAsyncThunk(
  "getSurveyItems",
  async (state) => {
    const response = nodeAPI.get("/item/getItem/" + state);
    return response;
  }
);

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSurveys.fulfilled, (state, action) => {
      console.log(action.payload);
      state.surveysData = action.payload.data;
      state.loading = false;
    });
    builder.addCase(addSurvey.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(updateSurvey.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getSurveyItems.pending, (state, action) => {
      state.items = null;
      state.itemsLoading = true;
    });
    builder.addCase(getSurveyItems.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.itemsLoading = false;
      console.log(action.payload.data);
    });
    builder.addCase(addItems.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        Swal.fire({
          timer: 2000,
          icon: "success",
          title: "Success",
          showConfirmButton: false,
        });
      }
    });
  },
});

export default surveySlice.reducer;
