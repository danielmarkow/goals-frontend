import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useLocation } from "wouter";

function Home() {
  // const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const enableQuery = localStorage.getItem("goals-token") ? true : false;

  const goals = useQuery({
    queryKey: ["goals"],
    queryFn: () => {
      const token = localStorage.getItem("goals-token");
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
      const token = localStorage.getItem("goals-token");
      axios.delete(`http://localhost:5001/api/goals/${goalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: queryClient.invalidateQueries(["goals"]),
  });

  const onClickDel = (event) => {
    event.preventDefault;
    removeGoal.mutate(event.target.id);
  };

  return (
    <>
      {goals.isLoading && enableQuery && <p>loading...</p>}
      {goals.isError && enableQuery && <p>an error occured...</p>}
      {goals.isSuccess && enableQuery && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
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
          </div>
        </div>
      )}
      {!enableQuery && <p>please log in</p>}
    </>
  );
}

export default Home;
