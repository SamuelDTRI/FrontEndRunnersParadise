import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const [tab, setTab] = useState("");
  const [admTab, setAdmTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        tab,
        setTab,
        admTab,
        setAdmTab,
        isOpen,
        setIsOpen,
        editedProduct,
        setEditedProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
