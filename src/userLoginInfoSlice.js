import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null
};
export const userLoginInfoSlice = createSlice({
  initialState,
  name: "userValue",
  reducers: {
    userData: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { userData } = userLoginInfoSlice.actions;
export default userLoginInfoSlice.reducer;
