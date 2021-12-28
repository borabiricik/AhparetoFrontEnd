import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Auth/authSlice";
import demografikSlice from "./Demografik/demografikSlice";
import pollsterGroupSlice from "./PollsterGroups/pollsterGroupSlice";
import pollsterSlice from "./Pollsters/pollsterSlice";
import iyzicoSlice from "./Settings/iyzicoSlice";
import mailSlice from "./Settings/mailSlice";
import priceSlice from "./Settings/priceSlice";
import surveySlice from "./Survyes/surveySlice";
import wizardSlice from "./Wizard/wizardSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    demografik: demografikSlice,
    pollsterGroups: pollsterGroupSlice,
    pollsters:pollsterSlice,
    surveys: surveySlice,
    wizard: wizardSlice,
    iyzico: iyzicoSlice,
    mail:mailSlice,
    price: priceSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
  devTools:true
});

