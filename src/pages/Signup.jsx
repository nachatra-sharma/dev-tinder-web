import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  async function createNewUser() {
    try {
      if (!email || !password || !firstName || !age || !gender) {
        toast.error("Fill all the required fields");
        return;
      }

      if (age < 18 || age > 60) {
        toast.error("Age must be between 18 to 60");
        return;
      }

      const response = await fetch(BASE_URL + "/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
          photoURL,
        }),
      });
      const result = await response.json();

      if (result.success) {
        navigate("/");
      } else {
        toast.error(result.error);
        return;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="w-full h-[85vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-6 bg-[#eccc68] w-[30%] p-10 rounded-md">
          <h1 className="font-semibold text-4xl text-center text-slate-800">
            Signup to Dev Tinder
          </h1>
          <div className="flex justify-between items-center">
            <label htmlFor="firstName" className="text-lg text-slate-800">
              First Name:*
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="lastName" className="text-lg text-slate-800">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-lg text-slate-800">
              Email:*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-between items-center relative">
            <label htmlFor="password" className="text-lg text-slate-800">
              Password:*
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
          <div className="flex justify-between items-center">
            <label htmlFor="age" className="text-lg text-slate-800">
              Age:*
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your age"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="gender" className="text-lg text-slate-800">
              Gender*
            </label>
            <div className="flex items-center justify-between w-[70%]">
              <input
                type="radio"
                name="gender"
                id="male"
                value={"male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="male" className="text-lg text-slate-800">
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value={"female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="female" className="text-lg text-slate-800">
                Female
              </label>
              <input
                required
                type="radio"
                name="gender"
                id="others"
                onChange={(e) => setGender(e.target.value)}
                value={"others"}
              />
              <label htmlFor="others" className="text-lg text-slate-800">
                Others
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="photoURL" className="text-lg text-slate-800">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="bg-transparent border-2 border-slate-800 px-2 py-1 text-slate-800 outline-none"
              placeholder="Enter your profile url"
            />
          </div>
          <button onClick={createNewUser} className="bg-[#2f3542] py-2 text-lg">
            Signup to Dev Tinder
          </button>
          <Link
            to={"/login"}
            className="text-slate-800 font-semibold text-center"
          >
            Already have an account ?
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
