import { useEffect, useState } from "react";
import { userState } from "../Types/Types";
import { axiosResponseType } from "../Types/Types";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";

export const AdminTableComponent = () => {
  const userData = useSelector((state: { user: userState }) => state.user);
  const [userList, setUserList] = useState<userState[]>();

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
    } else {
      console.log(res.data.message);
    }
  }
  return (
    <>
      <h1>Hi {userData.firstName}</h1>
      <div className="mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold ">Invoices</h2>
          </div>
          <div className="px-4 sm:px-8 py-4">
            <div className=" shadow-md rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client / Invoice
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Issued / Due
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.map((user, i) => (
                    <tr key={i}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900">{user.email}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900">+91 {" " + user.phone}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="inline-block h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                          </svg>
                        </button>
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
