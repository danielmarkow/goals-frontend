// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userdata, setUserdata] = useState({});
  const [token, setToken] = useState(null);

  const setUserdataState = (userdata) => {
    setUserdata({
      id: userdata.id,
      name: userdata.name,
      email: userdata.email,
    });
  };

  const setTokenState = (token) => {
    setToken(token);
  };

  const removeUserState = () => {
    setUserdata({});
  };

  const removeTokenState = () => {
    setTokenState(null);
  };

  const value = {
    token,
    userdata,
    setTokenState,
    removeTokenState,
    setUserdataState,
    removeUserState,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
