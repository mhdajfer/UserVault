import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../../Types/Types";
import Navbar from "../../Components/Navbar";
import { setProfilePic, setUserData } from "../../Redux/user";
import axios from "axios";
import toast from "react-hot-toast";
import profileImg from "../../assets/profile.jpg";
import { ImgDb } from "../../Firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";

const UserProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: { user: userState }) => state.user);

  const { firstName, lastName, age, phone, email, image } = user;
  const [profileData, setProfileData] = useState<userState>(user);
  const [profilePicture, setProfilePicture] = useState<File>();

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    console.log(file);
    // Perform any necessary validation or processing
    // For now, just set the profile picture state

    setProfilePicture(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setProfileData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const uploadImage = async (profilePicture: File) => {
    const ImgRef = ref(ImgDb, `userVault/${profilePicture.name}`);
    const data = await uploadBytes(ImgRef, profilePicture);
    const url = await getDownloadURL(data.ref);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/uploadImage`,
      { url },
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(setProfilePic({ url }));
      return toast.success(res.data.message);
    } else return toast.error(res.data.message);
  };

  const handleUpdate = async () => {
    if (_.isEqual(profileData, user)) return toast.error("no change in data");
    dispatch(setUserData(profileData));

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/edit`,
      profileData,
      {
        withCredentials: true,
      }
    );
    console.log(res);

    if (res.data.success) {
      toast.success(res.data.message);
    } else toast.error(res.data.message);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="flex items-center justify-center mb-4">
          <label htmlFor="profilePicture" className="relative cursor-pointer">
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : image
                  ? image
                  : profileImg
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </label>
          <div>
            {" "}
            <button
              type="button"
              className={`${
                profilePicture ? "opacity-100" : "opacity-40"
              } ms-8 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2`}
              onClick={() => profilePicture && uploadImage(profilePicture)}
            >
              save image
            </button>
          </div>
        </div>
        <div className=" flex  space-y-12 flex-col p-2">
          <div className="flex justify-between items-center">
            <div className="flex">
              <label htmlFor="firstName" className=" w-24 font-semibold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                defaultValue={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <label htmlFor="lastName" className="w-24 font-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                defaultValue={lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <label htmlFor="age" className="w-24 font-semibold">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                defaultValue={age}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <label htmlFor="email" className="w-24 font-semibold">
                Email ID
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                defaultValue={email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <label htmlFor="phone" className="w-24 font-semibold">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                defaultValue={phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
