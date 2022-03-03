import axios from "axios";
import { nodeAPI } from "Constants/api";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import build from "react-jvectormap";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  surveysData: null,
  loading: true,
  itemsLoading: false,
  items: null,
  criterias: null,
  itemCriterias: null,
  itemCriteriasLoading: false,
  questions: null,
  questionsLoading: false,
  surveyResults: null,
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

export const getSurveyCriterias = createAsyncThunk(
  "getSurveyCriterias",
  async (state) => {
    const response = await nodeAPI.get("/criteria/getCriterias/" + state);
    return response;
  }
);

export const getSurveyItemCriteria = createAsyncThunk(
  "getSurveyItemCriterias",
  async (state) => {
    const response = await nodeAPI.get(
      "/itemcriteria/getItemCriteria/" + state
    );
    return response;
  }
);

export const addItemCriterias = createAsyncThunk(
  "addItemCriteria",
  async (state) => {
    const response = await nodeAPI.post(
      "/itemcriteria/addItemCriterias/" + state.id,
      {
        itemCriterias: state.itemCriterias,
      }
    );
    return { ...response, history: state.history };
  }
);

export const getSurveyQuestions = createAsyncThunk(
  "getSurveyQuestions",
  async (state) => {
    const response = await nodeAPI.get("/question/getQuestion/" + state);
    return response;
  }
);

export const addQuestions = createAsyncThunk("addQuestions", async (state) => {
  const response = await nodeAPI.post("/question/addQuestions/" + state.Id, {
    questions: state.questions,
  });
  return response;
});

export const addCriterias = createAsyncThunk("addCriterias", async (state) => {
  const response = await nodeAPI.post("/criteria/addCriterias/" + state.id, {
    criterias: state.criterias,
  });
  return response;
});

export const getSurveyResults = createAsyncThunk(
  "getSurveyResults",
  async (state) => {
    const response = nodeAPI.get("/surveyResults/getSurveyResults/" + state);
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

    builder.addCase(getSurveyCriterias.fulfilled, (state, action) => {
      state.criterias = action.payload.data;
    });

    builder.addCase(addCriterias.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        Swal.fire({
          timer: 2000,
          icon: "success",
          title: "Success",
          showConfirmButton: false,
        });
      }
    });
    builder.addCase(getSurveyItemCriteria.pending, (state, action) => {
      state.itemCriteriasLoading = true;
    });
    builder.addCase(getSurveyItemCriteria.fulfilled, (state, action) => {
      console.log(action.payload);
      state.itemCriterias = action.payload.data;
      state.itemCriteriasLoading = false;
    });
    builder.addCase(getSurveyQuestions.pending, (state, action) => {
      state.questionsLoading = true;
    });
    builder.addCase(getSurveyQuestions.fulfilled, (state, action) => {
      console.log(action.payload);
      state.questions = action.payload.data;
      state.questionsLoading = false;
    });
    builder.addCase(addQuestions.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(addItemCriterias.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.data.success) {
        Swal.fire({
          timer: 2000,
          icon: "success",
          title: "Success",
          showConfirmButton: false,
        }).then((res) => {
          // action.payload.history.push(getLayoutName(action.payload.history) + "/surveys");
        });
      }
    });

    builder.addCase(getSurveyResults.fulfilled, (state, action) => {
      console.log(action.payload);
      state.surveyResults = action.payload.data;
    });
  },
});

export default surveySlice.reducer;
