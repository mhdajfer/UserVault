import { userState } from "../Types/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: userState = {
  firstName: "",
  lastName: "",
  age: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  admin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { firstName, lastName, email, age, phone, admin } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.age = age;
      state.phone = phone;
      state.admin = admin;
    },
    setLoginData: (state, action) => {
      action.payload.email
        ? (state.email = action.payload?.email)
        : (state.password = action.payload?.password || "");
    },
  },
});

export const { setUserData, setLoginData } = userSlice.actions;

export default userSlice.reducer;
