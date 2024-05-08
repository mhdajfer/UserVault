import { axiosResponseType, userState } from "../../Types/Types";
import Navbar from "../../Components/Navbar";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

function AdminDashboard() {
  const [userData, setUserData] = useState<userState>({});
  const [userList, setUserList] = useState<userState[]>();

  useEffect(() => {
    getUserData();
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

  async function getUserData() {
    const res: AxiosResponse<axiosResponseType> = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/getUser`,
      {
        withCredentials: true,
      }
    );

    if (res.data.success && res.data.user) {
      setUserData(res.data.user);
    }
  }
  // const user = useSelector((state: userState) => state);
  console.log(userList);
  return (
    <>
      <Navbar />
      <h1>Hi {userData.lastName}</h1>
      <div>
        <div>
          {/* Button to add a new user */}
          <button>Add New User</button>

          {/* List of users */}
          <ul>
            {userList ? (
              userList.map((user, index) => (
                <li key={index}>
                  {/* User details */}
                  <div>
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </div>
                  <div>
                    <strong>Age:</strong> {user.age}
                  </div>
                  <div>
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>

                  {/* Buttons for actions */}
                  <div>
                    {/* Button for updating user */}
                    <button>Update</button>
                    {/* Button for deleting user */}
                    <button>Delete</button>
                  </div>
                </li>
              ))
            ) : (
              <h1>No users</h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
