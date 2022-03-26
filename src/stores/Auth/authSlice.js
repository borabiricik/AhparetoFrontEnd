import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nodeAPI } from "Constants/api";
import jwtDecode from "jwt-decode";
import { FireSwal } from "utils/FireSwal";

const initialState = {};

export const login = createAsyncThunk(
  "login",
  async (state, { rejectWithValue }) => {
    try {
      const response = await nodeAPI.post("/auth/login", state);
      return { ...response, history: state.history };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (state, { rejectWithValue }) => {
    try {
      const response = await nodeAPI.post("/auth/register", state);
      return { ...response, history: state.history };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      console.log(action.payload);
      localStorage.removeItem("token");
      action.payload.history.push("/auth/login");
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(login.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        localStorage.setItem("token", action.payload.data.token);
        FireSwal({ message: "Giriş Yapıldı" }).then(() => {
          action.payload.history.push("/admin/dashboard");
          if (jwtDecode(action.payload.data.token).isAdmin) {
            action.payload.history.push("/admin/dashboard");
          } else {
            action.payload.history.push("/user/dashboard");
          }
        });
      } else {
        FireSwal({ message: "Giriş Yapılamadı", error: true });
      }
    });

    addCase(login.rejected, (state, action) => {
      FireSwal({
        message: action.payload.message,
        error: true,
        statusCode: action.payload.statusCode,
      });
    });

    addCase(register.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        localStorage.setItem("token", action.payload.data.token);
        FireSwal({ message: "Registered Successfully" }).then(() => {
          action.payload.history.push("/auth/login");
        });
      } else {
        FireSwal({ message: "Kayıt Başarısız", error: true });
      }
    });

    addCase(register.rejected, (state, action) => {
      FireSwal({
        message: action.payload.message,
        error: true,
        statusCode: action.payload.statusCode,
      });
    });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
