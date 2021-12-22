import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Auth/authSlice";
import demografikSlice from "./Demografik/demografikSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    demografik: demografikSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

