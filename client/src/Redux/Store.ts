import { createStore } from "redux";
import { userState } from "../Types/Types";

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

//reducer function
const userReducer = (
  state = initialState,
  action: { type: string; payload: userState }
) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR":
      return {
        ...initialState,
      };
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

// const loggingMiddleware: Middleware = (storeAPI) => (next) => (action) => {
//   console.log("Action:", action);
//   console.log("Current state:", storeAPI.getState());
//   next(action);
// };

export const store = createStore(userReducer, initialState);
