import { useEffect, useState } from "react";
import { userState } from "../Types/Types";
import { axiosResponseType } from "../Types/Types";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminTableComponent = () => {
  const userData = useSelector((state: { user: userState }) => state.user);
  const navigate = useNavigate();
  const [userList, setUserList] = useState<userState[]>();
  const [visibleOptions, setVisibleOptions] = useState<boolean[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const res: AxiosResponse<axiosResponseType> = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/getAllUsers`,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      setUserList(res.data.userList);
      setVisibleOptions(new Array(res.data.userList?.length).fill(false));
    } else {
      console.log(res.data.message);
    }
  }
  async function searchByEmail() {
    const res: AxiosResponse<axiosResponseType> = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/getAllUsers`,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      setUserList(
        res.data.userList?.filter((user) => user.email?.startsWith(email))
      );
      setVisibleOptions(new Array(res.data.userList?.length).fill(false));
    } else {
      console.log(res.data.message);
    }
  }

  const handleToggleOptions = (index: number) => {
    setVisibleOptions((prev) =>
      prev.map((visible, i) => (i === index ? !visible : false))
    );
  };

  const handleDeleteUser = async (user: userState) => {
    const res: AxiosResponse<axiosResponseType> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/deleteuser`,
      { userObj: user },
      { withCredentials: true }
    );

    if (res.data.success) {
      toast.success(res.data.message || "success");
      getAllUsers();
    } else toast.error(res.data.message || "error");
  };

  console.log("normal", userList);

  return (
    <>
      <div className="mt-12 px-12 pe-28">
        <h2 className=" mx-10 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome, {userData.firstName + " " + userData.lastName}
        </h2>
        <div></div>
      </div>
      <div className="mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between items-center mt-12 px-12 pe-28">
            <h2 className="text-2xl font-semibold ms-16 underline hover:no-underline hover:cursor-pointer">
              User Table
            </h2>

            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative w-80 flex items-center justify-center">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search email..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 "
                  onClick={(e) => {
                    setEmail(e.currentTarget.value);
                    searchByEmail();
                  }}
                >
                  Search
                </button>
              </div>
            </form>

            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              onClick={() => navigate("/admin/user/new")}
            >
              Add New User
            </button>
          </div>
          <div className="px-4 sm:px-8 py-4">
            <div className=" shadow-md rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User / Admin
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contact no.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Admin/user
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.map((user, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-100 bg-white cursor-pointer"
                    >
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={user.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 ">
                              {user.firstName + " " + user.lastName}
                            </p>
                            <p className="text-gray-600 ">{user._id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <p className="text-gray-900">{user.email}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900">+91 {" " + user.phone}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <span className="relative px-3 py-1 font-semibold ">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">
                            {user.admin ? "Admin" : "User"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                          onClick={() => handleToggleOptions(i)}
                        >
                          <svg
                            className="inline-block h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                          </svg>
                        </button>
                        {visibleOptions[i] && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
