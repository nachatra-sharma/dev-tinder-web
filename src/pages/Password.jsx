import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleUpdatePassword() {
    if (!currentPassword || !newPassword) {
      toast.error("Fill all the fields.");
      return;
    }

    const response = await fetch(
      "http://localhost:8000/api/v1/profile/password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
        credentials: "include",
      }
    );
    const result = await response.json();
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Password Updated Successfully");
    }
  }

  return (
    <div className="w-full h-[85vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-6 bg-[#eccc68] w-[40%] p-10 rounded-md">
          <h1 className="font-semibold text-4xl text-center text-slate-800">
            Update User Password
          </h1>
          <div className="flex justify-between items-center relative">
            <label htmlFor="oldPassword" className="text-lg text-slate-800">
              Current Password
            </label>
            <input
              type={currentPasswordVisible ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your current password"
            />
            {currentPasswordVisible ? (
              <i
                className="fa-solid fa-eye absolute text-slate-800 right-3"
                onClick={() => setCurrentPasswordVisible(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash absolute text-slate-800 right-3"
                onClick={() => setCurrentPasswordVisible(true)}
              ></i>
            )}
          </div>
          <div className="flex justify-between items-center relative">
            <label htmlFor="newPassword" className="text-lg text-slate-800">
              New Password:
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your new password"
            />
            {passwordVisible ? (
              <i
                className="fa-solid fa-eye absolute text-slate-800 right-3"
                onClick={() => setPasswordVisible(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash absolute text-slate-800 right-3"
                onClick={() => setPasswordVisible(true)}
              ></i>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#2f3542] py-2 text-lg"
            onClick={handleUpdatePassword}
          >
            Change Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Password;
