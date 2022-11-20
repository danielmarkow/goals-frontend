import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

function Home() {
  const [location, setLocation] = useLocation();
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

  return (
    <>
      {goals.isLoading && enableQuery && <p>loading...</p>}
      {goals.isError && enableQuery && <p>an error occured...</p>}
      {goals.isSuccess && enableQuery && (
        <ul>
          {goals.data.data.map((goal, i) => (
            <li key={i}>{goal.goaltext}</li>
          ))}
        </ul>
      )}
      {!enableQuery && <p>please log in</p>}
      {/* {!localStorage.getItem("goals-token") && (
        <button
          className="btn btn-outline"
          onClick={() => {
            setLocation("/login");
          }}
        >
          Login
        </button>
      )} */}
    </>
  );
}

export default Home;
