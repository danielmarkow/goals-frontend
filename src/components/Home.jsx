import axios from "axios";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "./common/Card";
import userHook from "../hooks/userHook";

function Home() {
  const { token, userdata, setTokenState, setUserdataState } = userHook();
  const queryClient = useQueryClient();
  const enableQuery = token ? true : false;

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
      setUserdataState({
        id,
        name,
        email,
      });
    }
  }, [userdataMutation.data]);

  useEffect(() => {
    const token = localStorage.getItem("goals-token");
    if (token) {
      setTokenState(token);
      userdataMutation.mutate(token);
    }
  }, []);

  const goals = useQuery({
    queryKey: ["goals"],
    queryFn: () => {
      const req = axios.get("http://localhost:5001/api/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("triggered");
      return req;
    },
    enabled: enableQuery,
  });

  const removeGoal = useMutation({
    mutationFn: (goalId) => {
      axios.delete(`http://localhost:5001/api/goals/${goalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("triggered mutation");
    },
    onSuccess: () => queryClient.invalidateQueries(["goals"]),
  });

  const onClickDel = (event) => {
    event.preventDefault;
    removeGoal.mutate(event.target.id);
  };

  return (
    <>
      {userdata && JSON.stringify(userdata)}
      {goals.isLoading && enableQuery && <p>loading...</p>}
      {goals.isError && enableQuery && <p>an error occured...</p>}
      {goals.isSuccess && enableQuery && (
        <Card>
          <ul>
            {goals.data.data.map((goal, i) => (
              <li key={i}>
                {i + 1} - {goal.goaltext} &nbsp;
                <button
                  id={goal.id}
                  className="btn btn-xs"
                  onClick={onClickDel}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {!enableQuery && <Card>please log in</Card>}
    </>
  );
}

export default Home;
