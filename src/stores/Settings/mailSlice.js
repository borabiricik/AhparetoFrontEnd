import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  mailData: null,
  loading: false,
};

export const getMailConfig = createAsyncThunk(
  "getMailConfig",
  async (state) => {
    const response = await axios.get(apiUrl + "User/GetMailConfig", state);
    return response
  }
);

export const updateMailConfig = createAsyncThunk(
  "updateMailConfig",
  async (state) => {
    const response = await axios.post(apiUrl + "User/UpdateMailConfig", state);
    console.log(response)
    return {...response, history: state.history};
  }
);

const mailSlice = createSlice({
  name: "mail",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getMailConfig.pending, (state, action) => {
      state.loading = true;
    });
    addCase(getMailConfig.fulfilled, (state, action) => {
      state.mailData = action.payload.data;
      state.loading = false;
    });

    addCase(updateMailConfig.fulfilled, (state, action) => {
        console.log(action.payload)
      if (action.payload.data.success) {
        Swal.fire({
          icon: "success",
          title: "Başarılı",
          timer: 1000,
          showConfirmButton: false,
        }).then((res) =>
          action.payload.history.push(
            getLayoutName(action.payload.history) + "/mail-settings"
          )
        );
      }
    });
  },
});

export default mailSlice.reducer;
