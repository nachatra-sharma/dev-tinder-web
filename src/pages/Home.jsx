import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/Constant";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  async function getUser() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/user/feed", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        setData(result?.data?.userList);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleIgnored(userId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/send/ignored/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Profile Ignored");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleInterested(userId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/send/interested/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Sended Connection Request.");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  function handleNextUser() {
    setCurrentUser((prev) => prev + 1);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-[85vh]">
      <div className="flex justify-center items-center h-full relative">
        {currentUser >= data.length ? (
          <p className="text-yellow-400">No More User Found.</p>
        ) : (
          <div
            className="bg-slate-300 rounded-md flex flex-col gap-6 absolute"
            key={data[currentUser]._id}
          >
            <img
              src={data[currentUser].photoURL}
              alt=""
              className="w-80 h-80 rounded-t-md object-cover"
            />
            <div className="flex gap-3 flex-col px-2 pb-3">
              <h2 className="text-md font-semibold text-slate-800">
                Name:{" "}
                {data[currentUser].firstName + " " + data[currentUser].lastName}
              </h2>
              <p className="text-md font-semibold text-slate-800">
                Age: {data[currentUser].age}
              </p>
              <p className="text-md font-semibold text-slate-800">
                Gender: {data[currentUser].gender}
              </p>
            </div>
            <div className="flex justify-between px-4 pb-3">
              <button
                className="bg-[#eb4d4b] py-1 px-6 text-sm"
                onClick={() => {
                  handleIgnored(data[currentUser]._id);
                  handleNextUser();
                }}
              >
                Ignored
              </button>
              <button
                className="bg-[#6ab04c] py-1 px-6"
                onClick={() => {
                  handleInterested(data[currentUser]._id);
                  handleNextUser();
                }}
              >
                Interested
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
export default Home;
