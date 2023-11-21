import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Component/userSlice/UserSlice";
export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
