import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const [tab, setTab] = useState("");
  const [admTab, setAdmTab] = useState("");
  const [userTab, setUserTab] = useState("");

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
        userTab,
        setUserTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
