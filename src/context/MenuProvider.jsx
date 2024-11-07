import { createContext, useState } from "react";

export const menuContext = createContext();

const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenu(status) {
    setIsMenuOpen(status);
  }

  const menu = {
    handleMenu,
    isMenuOpen,
  };

  return <menuContext.Provider value={menu}>{children}</menuContext.Provider>;
};

export default MenuProvider;
