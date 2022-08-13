import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { API_URL } from "../utils/urls";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [jwt, setJwt] = useState("");

  // on Page load this effect check if there is token on the localStorage
  // if true it save it to the UserContext State
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setJwt(token);
  }, []);

  // this effect execute me() query when the jwt state is changed and set Auth status to True
  // jwt state can be changed in 2 cases :
  // By signin function || from localStorage in case of refresh page
  useEffect(() => {
    jwt && me() && setIsAuth(true);
  }, [jwt]);

  const me = async () => {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setUser(data);
  };

  // This effect act as a Sign out function : if the Auth status is false it set user to null
  useEffect(() => {
    if (!isAuth) {
      setUser(null);
    }
  }, [isAuth]);

  // Refetch auery each 500 ms
  /* useEffect(() => {
    const interval = setInterval(() => {
      jwt && me();
    }, 1000);

    return () => clearInterval(interval);
  }, [jwt]); */

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, jwt, setJwt, me }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
