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
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { firstName, lastName, email, age, phone, admin, image } =
        action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.age = age;
      state.phone = phone;
      state.admin = admin;
      state.image = image;
    },
    setLoginData: (state, action) => {
      action.payload.email
        ? (state.email = action.payload?.email)
        : (state.password = action.payload?.password || "");
    },
    signupData: (state, action) => {
      const {
        firstName,
        lastName,
        email,
        age,
        phone,
        admin,
        password,
        confirmPassword,
      } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.age = age;
      state.phone = phone;
      state.admin = admin;
      state.password = password;
      state.confirmPassword = confirmPassword;
    },
    setProfilePic: (state, action) => {
      state.image = action.payload.url;
    },
    clearStore: () => initialState,
  },
});

export const {
  setUserData,
  setLoginData,
  signupData,
  clearStore,
  setProfilePic,
} = userSlice.actions;

export default userSlice.reducer;
