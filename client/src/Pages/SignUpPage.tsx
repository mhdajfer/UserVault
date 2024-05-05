import React, { useState } from "react";
import { signupStateType, axiosResponseType } from "../Types/Types";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState<signupStateType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("password mismatch");
    }
    const response = await axios.post<axiosResponseType>(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      formData,
      { withCredentials: true }
    );

    if (response.data.success) alert(response.data.message);
    else alert(response.data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
              />
            </div>

            <div>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                value={formData.phone}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
              />
            </div>
            <div>
              <input
                id="age"
                name="age"
                type="text"
                required
                value={formData.age}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Age"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" w-full flex justify-center py-2 px-4  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
