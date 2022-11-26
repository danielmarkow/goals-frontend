import { useContext } from "react";

import { UserContext } from "../context/UserContext";

function userHook() {
  return useContext(UserContext);
}

export default userHook;
