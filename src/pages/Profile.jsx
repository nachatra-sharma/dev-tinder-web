import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  async function getUserData() {
    const response = await fetch("http://localhost:8000/api/v1/profile/view", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    setUserData(result?.data?.user);
  }

  async function handleEditUserProfile() {
    const response = await fetch("http://localhost:8000/api/v1/profile/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        age: String(age),
        photoURL,
      }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success("Profile Updated Successfully");
    } else {
      toast.error(result.error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setAge(userData.age);
      setPhotoURL(userData.photoURL);
    }
  }, [userData]);

  return (
    <>
      <div className="w-full h-[85vh]">
        <div className="flex justify-center items-center w-full h-full">
          {userData === null ? (
            <p className="text-yellow-400">Loading User Profile Data....</p>
          ) : (
            <div className="flex w-[90%] justify-between">
              <div className="flex items-start flex-col justify-evenly  w-1/2 bg-[#fbc531] py-10 px-10 rounded-md gap-6">
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="firstName" className="text-lg text-slate-800">
                    First Name:
                  </label>
                  <input
                    className="bg-transparent border-2 border-slate-800 px-2 py-1 text-black outline-none"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="lastName" className="text-lg text-slate-800">
                    Last Name:
                  </label>
                  <input
                    className="bg-transparent border-2 border-slate-800 px-2 py-1 text-black outline-none"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="age" className="text-lg text-slate-800">
                    Age:
                  </label>
                  <input
                    className="bg-transparent border-2 border-slate-800 px-2 py-1 text-black outline-none"
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="photoURL" className="text-lg text-slate-800">
                    Photo URL
                  </label>
                  <input
                    className="bg-transparent border-2 border-slate-800 px-2 py-1 text-black outline-none"
                    type="url"
                    name="photoURL"
                    id="photoURL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="Enter your profile URL"
                  />
                </div>
                <button
                  onClick={handleEditUserProfile}
                  className="bg-[#2f3542] py-2 px-5 text-lg rounded-md"
                >
                  Save Changes
                </button>
              </div>
              <div className="flex justify-end">
                <img
                  src={userData.photoURL}
                  className="w-[400px] h-[400px] rounded-md shadow-md object-contain bg-black"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
