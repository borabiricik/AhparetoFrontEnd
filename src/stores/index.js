import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Auth/authSlice";
import demografikSlice from "./Demografik/demografikSlice";
import pollsterGroupSlice from "./PollsterGroups/pollsterGroupSlice";
import pollsterSlice from "./Pollsters/pollsterSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    demografik: demografikSlice,
    pollsterGroups: pollsterGroupSlice,
    pollsters:pollsterSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

