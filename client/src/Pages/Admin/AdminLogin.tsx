import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosResponseType, userState } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setLoginData, setUserData } from "../../Redux/user";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = useSelector((state: { user: userState }) => ({
    email: state.user.email,
    password: state.user.password,
  }));

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    dispatch(setLoginData({ [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res: AxiosResponse<axiosResponseType> = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token ? res.data.token : "");
        toast.success(res.data.message || "success");
        dispatch(
          setUserData({
            firstName: res.data.user?.firstName,
            lastName: res.data.user?.lastName,
            email: res.data.user?.email,
            phone: res.data.user?.phone,
            age: res.data.user?.age,
            admin: res.data.user?.admin,
          })
        );
        Cookies.set("token", res.data.token ? res.data.token : "", {
          expires: 7,
        });

        navigate("/admin/home");
      } else {
        console.log("Login failed:", res.data.message);
        toast.error(res.data.message || "failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="shadow-sm ">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => handleChange(e)}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  mb-6 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => handleChange(e)}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  mb-6 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700  focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
