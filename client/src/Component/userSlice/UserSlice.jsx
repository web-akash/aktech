import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userValue: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state.userValue = action.payload;
    },
  },
});

export const { activeUser } = userSlice.actions;

export default userSlice.reducer;
