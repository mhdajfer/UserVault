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

const newUserSlice = createSlice({
  name: "newUser",
  initialState,
  reducers: {
    setNewUserData: (state, action) => {
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
    signupNewUserData: (state, action) => {
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
    clearNewUserStore: () => initialState,
  },
});

export const { setNewUserData, signupNewUserData, clearNewUserStore } =
  newUserSlice.actions;

export default newUserSlice.reducer;
