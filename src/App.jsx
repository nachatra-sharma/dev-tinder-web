import "./App.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import UserContext from "./context/UserContext";
import MenuProvider from "./context/MenuProvider";
import Password from "./pages/Password";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <UserContext>
        <MenuProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" Component={Login}></Route>
              <Route path="/signup" Component={Signup}></Route>
              <Route path="/" Component={Home}></Route>
              <Route path="/profile" Component={Profile}></Route>
              <Route path="/connections" Component={Connection}></Route>
              <Route path="/requests" Component={Request}></Route>
              <Route path="/password" Component={Password}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </MenuProvider>
      </UserContext>
    </>
  );
};

export default App;
