import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Connection = () => {
  const [userList, setUserList] = useState([]);

  async function getConnectionsList() {
    const response = await fetch(
      "http://localhost:8000/api/v1/user/connections",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    if (result.data.connectionList.length === 0) {
      toast.error("No Connection Found.");
    }
    setUserList(result?.data?.connectionList);
  }

  useEffect(() => {
    getConnectionsList();
  }, []);

  return (
    <>
      <div className="w-full h-[85vh]">
        <h2 className="text-3xl font-semibold tracking-widest text-center mt-10">
          Your Connections
        </h2>
        {userList.length === 0 ? (
          <p className="text-center font-semibold text-xl mt-10">
            Connection List is loading please wait...
          </p>
        ) : (
          userList.map((user, index) => {
            return (
              <div
                className="flex justify-center items-center mt-10 gap-6"
                key={index}
              >
                <div className="flex justify-between w-1/3 bg-[#60a3bc] px-10 py-4 rounded-md items-center">
                  <div>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-[200px] h-[200px] rounded-none shadow-md object-contain bg-black"
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-start">
                    <p>
                      Name: <span>{user.firstName + " " + user.lastName}</span>
                    </p>
                    <p>
                      Age: <span>{user.age}</span>
                    </p>
                    <p>
                      Gender:{" "}
                      <span>
                        {user.gender.charAt(0).toUpperCase() +
                          user.gender.slice(1)}
                      </span>
                    </p>
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

export default Connection;
