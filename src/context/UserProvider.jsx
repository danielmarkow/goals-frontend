import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userdata, setUserdata] = useState({});

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:5001/api/users/login", {
        email: data.emailInp,
        password: data.pwInp,
      });
    },
  });

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { id, name, email, token } = loginMutation.data.data;
      localStorage.setItem("goals-token", token);
      setUserdata({
        id,
        name,
        email,
      });
    }
  }, [loginMutation.data]);

  const handleLogin = (data) => {
    loginMutation.mutate(data);
    return loginMutation;
  };

  const handleLogout = () => {
    localStorage.removeItem("goals-token");
    setUserdata({});
  };

  const value = {
    userdata,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
