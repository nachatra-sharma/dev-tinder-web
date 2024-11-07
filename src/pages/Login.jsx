import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../context/UserContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const naviagte = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { handleIsLoggedInUser, handleLoggedInUser } = useContext(userContext);

  async function loginUser() {
    if (!email || !password) {
      toast.error("Fill all the fields.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    const result = await response.json();

    if (!result.success) {
      toast.error(result.error);
    }
    if (result.success) {
      handleLoggedInUser(result?.data?.responseUser);
      handleIsLoggedInUser(true);
      naviagte("/");
    }
  }

  return (
    <div className="w-full h-[85vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-6 bg-[#eccc68] w-[30%] p-10 rounded-md">
          <h1 className="font-semibold text-4xl text-center text-slate-800">
            Login Dev Tinder
          </h1>
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-lg text-slate-800">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-between items-center relative">
            <label htmlFor="password" className="text-lg text-slate-800">
              Password:
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your password"
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
            onClick={loginUser}
          >
            Login to Dev Tinder
          </button>
          <Link
            to={"/signup"}
            className="text-slate-800 font-semibold text-center"
          >
            Create an account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
