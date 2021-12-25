import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Auth/authSlice";
import demografikSlice from "./Demografik/demografikSlice";
import pollsterGroupSlice from "./PollsterGroups/pollsterGroupSlice";
import pollsterSlice from "./Pollsters/pollsterSlice";
import surveySlice from "./Survyes/surveySlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    demografik: demografikSlice,
    pollsterGroups: pollsterGroupSlice,
    pollsters:pollsterSlice,
    surveys: surveySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

