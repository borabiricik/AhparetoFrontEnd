import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "Constants/api";

const initialState = {
  success: null,
  data: null,
};

export const register = createAsyncThunk(
  "userRegister",
  async (state, thunkAPI) => {
    const response = await axios.post(apiUrl + "Auth/register", {
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
    });
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload.data;
      if (action.payload.data.success) {
        history.push("/auth/login");
      } else {
       FailAlert(action.payload.message)
      }
    });
  },
});

export default authSlice.reducer;
