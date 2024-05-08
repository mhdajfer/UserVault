import React, { useEffect } from "react";
import loginImg from "../../assets/loginImg.jpg";
import axios, { AxiosResponse } from "axios";
import { axiosResponseType, userState } from "../../Types/Types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = useSelector((state: userState) => ({
    email: state.email,
    password: state.password,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: AxiosResponse<axiosResponseType> = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success && res.data.message) {
        localStorage.setItem("token", res.data.token ? res.data.token : "");
        Cookies.set("token", res.data.token ? res.data.token : "", {
          expires: 7,
        });
        toast.success(res.data.message);
        dispatch({
          type: "LOGIN",
          payload: {
            firstName: res.data.user?.firstName,
            lastName: res.data.user?.lastName,
            email: res.data.user?.email,
            phone: res.data.user?.phone,
            age: res.data.user?.age,
            admin: res.data.user?.admin,
          },
        });

        navigate("/home");
      } else {
        console.log("Login failed:", res.data.message);
        toast.error(res.data.message || "failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    dispatch({
      type: "SET_USER_DATA",
      payload: { [name]: value },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  });

  return (
    <div className="min-h-screen flex items-center justify-evenly py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-1/2">
        <img src={loginImg} alt="" />
      </div>
      <div className="max-w-md w-full space-y-8 border shadow-md p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-6">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  mb-6 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md mb-6 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
