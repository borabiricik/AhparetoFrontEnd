import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthSuccessAlert } from "components/Alerts/AuthSuccessAlert";
import { FailAlert } from "components/Alerts/FailAlert";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const initialState = {
  id: null,
};

export const registerF = createAsyncThunk(
  "registerF",
  async (state, action) => {
    const response = await axios.post(apiUrl + "Auth/register", {
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
    });
    const history = state.history;
    return await { ...response, history };
  }
);

export const login = createAsyncThunk("loginF", async (state) => {
  const response = await axios.post(apiUrl + "Auth/login", {
    email: state.email,
    password: state.password,
  });
  const history = state.history;
  return { ...response, history };
});

export const logout = createAsyncThunk("logoutF", async (state, action) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("expiration");
  state.go("/auth/login");
});

export const rePassword = createAsyncThunk("rePassword", async (state) => {
  const response = await axios.post(apiUrl + "Auth/rePassword", state);
  return { ...response, history: state.history };
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerF.fulfilled]: (state, action) => {
      if (action.payload.data.success) {
        AuthSuccessAlert(
          "Başarıyla Kayıt Oluşturuldu",
          action.payload.history,
          "/auth/login"
        );
      } else {
        FailAlert(action.payload.data.message);
      }
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.data.success) {
        const { token, expiration, role, id } = action.payload.data.data;
        const expirationDate = new Date(expiration);
        AuthSuccessAlert(
          "Başarıyla Giriş Yapıldı",
          action.payload.history,
          "/admin"
        );
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
        localStorage.setItem("role", role);
        localStorage.setItem("expiration", expiration);
        state.id = id;
      } else {
        FailAlert(action.payload.data.message);
      }
    },
    [rePassword.fulfilled]: (state,action) => {
      console.log(action.payload)
      const {history,data} = action.payload
      if (data.success) {
        Swal.fire({
          timer: 1000,
          showConfirmButton: false,
          title:"Başarılı",
          icon:"success"
        }).then((res=> {
          logout()
          history.push(getLayoutName(history)+"/dashboard")
        }))
      }
      else{
        Swal.fire({
          title:"Başarısız",
          showConfirmButton:false,
          timer:3000,
          icon:"error",
          text: data.message
        })
      }
    }
  },
});

export default authSlice.reducer;
