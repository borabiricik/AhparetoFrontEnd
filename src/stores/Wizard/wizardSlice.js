const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  desiredSurveyType: 1,
};

const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setType: (state, action) => {
        state.desiredSurveyType = action.payload
    },
  },
});

export const {setType} = wizardSlice.actions

export default wizardSlice.reducer
