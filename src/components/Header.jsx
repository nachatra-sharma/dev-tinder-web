import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../context/UserContext";
import { menuContext } from "../context/MenuProvider";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const {
    getLoggedInUser,
    handleLoggedInUser,
    getIsLoggedInUser,
    handleIsLoggedInUser,
  } = useContext(userContext);

  const { isMenuOpen, handleMenu } = useContext(menuContext);

  useEffect(() => {
    function checkForCookies() {
      try {
        const cookie = Cookies.get("token");
        if (!cookie) {
          localStorage.setItem("loggedInUser", JSON.stringify({}));
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    function checkForLogIn() {
      if (!isLoggedIn || !loggedInUser) {
        navigate("/login");
      }
    }

    checkForCookies();
    checkForLogIn();
    handleMenu(false);
  }, [navigate]);

  const isLoggedIn = getIsLoggedInUser();
  const loggedInUser = getLoggedInUser();

  const toggleMenu = () => {
    handleMenu(!isMenuOpen);
  };

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Types": "application/json",
        },
      });
      const result = await response.json();

      if (result.success) {
        handleMenu(false);
        handleLoggedInUser({});
        handleIsLoggedInUser(false);
        Cookies.remove("token");
        navigate("/login");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out.");
    }
  }

  return (
    <div className="bg-[#2f3542] py-2">
      <div className="w-[96%] mx-auto flex justify-between">
        <button
          className="py-2 text-slate-800 text-2xl font-bold bg-[#eccc68] px-8 rounded-md"
          onClick={() => {
            if (!isLoggedIn) {
              toast.error("Please logged in.");
            } else {
              navigate("/");
            }
          }}
        >
          Dev Tinder 👨‍💻
        </button>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <p className="text-yellow-400 font-bold tracking-wider font-lg">
              Welcome - {loggedInUser.firstName}
            </p>
            <img
              onClick={toggleMenu}
              className="w-14 h-14 rounded-full object-contain border-2"
              src={loggedInUser.photoURL}
              alt=""
            />
            {isMenuOpen && (
              <ul className="z-10 menu absolute right-0 top-[9%] mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>

                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/password">
                    Change Password
                    <span className="badge">
                      <i className="fa-solid fa-gear"></i>
                    </span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
