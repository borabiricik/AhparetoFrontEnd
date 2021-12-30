import axios from "axios";
import { apiUrl } from "Constants/api";
import { getLayoutName } from "Functions/Router";
import Swal from "sweetalert2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  pollstersData: null,
  loading: null,
};

export const getPollsters = createAsyncThunk("getPollsters", async (state) => {
  const response = await axios.get(
    apiUrl + "User/GetPollsterDtoById/" + localStorage.getItem("userId")
  );
  return response;
});

export const createPollster = createAsyncThunk(
  "createPollster",
  async (state) => {
    const response = await axios.post(apiUrl + "User/AddPollster", {
      ...state,
      pollsterGroup: [{ id: state.pollsterGroup }],
    });
    if (response.data.success) {
      Swal.fire({
        timer: 1000,
        showConfirmButton: false,
        title:"Success",
        icon:"success"
      }).then((res=> state.history.push(getLayoutName(state.history)+"/pollsters")))
    }
    else{
      Swal.fire({
        title:"Başarısız",
        showConfirmButton:false,
        timer:2000,
        icon:"error",
        text: response.data.message
      })
    }
    return response;
  }
);

export const editPollster = createAsyncThunk("editPollster",async (state) => {
  const response = await axios.post(apiUrl + "User/UpdatePollster",state)
  console.log(response)
  return response
})

export const deletePollster = createAsyncThunk("deletePollster" ,async (state) => {
  const response = await axios.get(apiUrl + "User/DeletePollster/"+state)
  if(response.data.success){
    Swal.fire({
      timer:1000,
      title:"Success",
      icon:"success",
      showConfirmButton:false
    }).then(res=>state.history.push(getLayoutName(state.history)+ "/pollsters"))
    return response
  }
 
})

const pollsterSlice = createSlice({
  name: "pollsters",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPollsters.fulfilled, (state, action) => {
      // console.log(action.payload.data.data)
      state.pollstersData = action.payload.data.data;
      state.loading = false;
    });
  },
});

export default pollsterSlice.reducer;
