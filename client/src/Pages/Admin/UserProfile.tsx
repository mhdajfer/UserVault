import React, { useState } from "react";

const UserProfile = () => {
  // State variables for user details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState<File>();

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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-1 font-semibold">
            Age
          </label>
          <input
            type="text"
            id="age"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
