import { createContext, useState } from "react";
export const userContext = createContext();

const UserContext = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoggedInUser(loggedInUser) {
    setLoggedInUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }

  function handleIsLoggedInUser(isLoggedIn) {
    setIsLoggedIn(isLoggedIn);
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }

  function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser", loggedInUser));
  }

  function getIsLoggedInUser() {
    return JSON.parse(localStorage.getItem("isLoggedIn"));
  }

  const userAuth = {
    loggedInUser,
    isLoggedIn,
    handleLoggedInUser,
    handleIsLoggedInUser,
    getIsLoggedInUser,
    getLoggedInUser,
  };
  return (
    <userContext.Provider value={userAuth}>{children}</userContext.Provider>
  );
};

export default UserContext;
