import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/Constant";

const Request = () => {
  const [userList, setUserList] = useState([]);

  async function getConnectionsList() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/user/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (!result.success) {
        toast.error("No Request Found.");
      }
      setUserList(result?.data?.requestList || []);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    getConnectionsList();
  }, []);

  async function handleAccepted(requestId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/review/accepted/" + requestId,
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
        toast.success("Accepted the request.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleRejected(requestId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/review/rejected/" + requestId,
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
        toast.success("Rejected the request.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <>
      <div className="w-full h-[85vh]">
        <h2 className="text-3xl font-semibold tracking-widest text-center mt-10">
          Connection Requests
        </h2>
        {userList.length === 0 ? (
          <p className="text-center font-semibold text-xl mt-10">
            Request List is loading please wait...
          </p>
        ) : (
          userList.map((user, index) => {
            return (
              <div
                className="flex justify-center items-center mt-10"
                key={index}
              >
                <div className="flex justify-between w-1/2 bg-[#60a3bc] px-10 py-4 rounded-md items-center">
                  <div>
                    <img
                      src={user.fromUserId.photoURL}
                      alt=""
                      className="w-[200px] h-[200px] rounded-none shadow-md object-contain bg-black"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>
                      Name:
                      <span>
                        {user.fromUserId.firstName +
                          " " +
                          user.fromUserId.lastName}
                      </span>
                    </p>
                    <p>
                      Age: <span>{user.fromUserId.age}</span>
                    </p>
                    <p>
                      Gender:{" "}
                      <span>
                        {user.fromUserId.gender.charAt(0).toUpperCase() +
                          user.fromUserId.gender.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button
                      className="bg-[#eb4d4b] py-2 px-6 text-slate-800 font-semibold tracking-wide"
                      onClick={() => {
                        handleRejected(user._id);
                      }}
                    >
                      Rejected
                    </button>
                    <button
                      className="bg-[#6ab04c] py-2 px-6 text-slate-800 font-semibold tracking-wide"
                      onClick={() => {
                        handleAccepted(user._id);
                      }}
                    >
                      Accepted
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Request;
