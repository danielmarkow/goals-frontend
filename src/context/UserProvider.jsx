import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userdata, setUserdata] = useState({});

  const userdataMutation = useMutation({
    mutationFn: (token) => {
      return axios.get("http://localhost:5001/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  });

  useEffect(() => {
    if (userdataMutation.isSuccess) {
      const { id, name, email } = userdataMutation.data.data;
      setUserdata({
        id,
        name,
        email,
      });
    }
  }, [userdataMutation.data]);

  const getUserdata = (token) => {
    userdataMutation.mutate(token);
  };

  const value = {
    userdata,
    getUserdata,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
