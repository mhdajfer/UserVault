import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../Types/Types";
import Navbar from "../../Components/Navbar";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState<File>();
  const { firstName, lastName, age, phone, email } = useSelector(
    (state: { user: userState }) => state.user
  );

  // Function to handle profile picture upload
  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    // Perform any necessary validation or processing
    // For now, just set the profile picture state

    setProfilePicture(file);
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
                  : "placeholder.jpg"
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
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
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
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                value={firstName}
              />
            </div>
            <div className="flex">
              <label htmlFor="lastName" className="w-24 font-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                value={lastName}
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
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                value={age}
              />
            </div>
            <div className="flex">
              <label htmlFor="email" className="w-24 font-semibold">
                Email ID
              </label>
              <input
                type="text"
                id="email"
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                value={email}
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
                className=" border border-gray-300 rounded px-3 mx-4 py-1 w-72"
                value={phone}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
