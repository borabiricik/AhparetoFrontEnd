import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import demografikSlice from "./Demografik/demografikSlice";
import pollsterGroupSlice from "./PollsterGroups/pollsterGroupSlice";
import pollsterSlice from "./Pollsters/pollsterSlice";
import iyzicoSlice from "./Settings/iyzicoSlice";
import mailSlice from "./Settings/mailSlice";
import priceSlice from "./Settings/priceSlice";
import surveySlice from "./Survyes/surveySlice";
import wizardSlice from "./Wizard/wizardSlice";
import fillSurveySlice from "./Survyes/fillSurveySlice";
import surveyResultsSlice from "./Survyes/surveyResultsSlice";
import participantsStore from "./Participants/participantsStore";

export default configureStore({
  reducer: {
    auth: authSlice,
    demografik: demografikSlice,
    pollsterGroups: pollsterGroupSlice,
    pollsters: pollsterSlice,
    surveys: surveySlice,
    wizard: wizardSlice,
    iyzico: iyzicoSlice,
    mail: mailSlice,
    price: priceSlice,
    fillSurvey: fillSurveySlice,
    surveyResults: surveyResultsSlice,
    participants: participantsStore,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: false,
});
