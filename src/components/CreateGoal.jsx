import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "./common/Card";
import userHook from "../hooks/userHook";

const goalSchema = yup.object({
  goalInp: yup.string().required(),
});

function CreateGoal() {
  const { token } = userHook();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(goalSchema),
  });

  const postGoal = useMutation({
    mutationFn: (goaltext) => {
      const json = JSON.stringify({ text: goaltext });
      console.log("triggered postGoal mutation");
      return axios.post("http://localhost:5001/api/goals", json, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["goals"]),
  });

  const onSubmit = (data) => {
    postGoal.mutate(data.goalInp);
  };

  useEffect(() => {
    reset({
      goalInp: "",
    });
  }, [postGoal.isSuccess]);

  return (
    <Card>
      {/* <Toaster /> */}
      <h1>Create Goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="input-group" htmlFor="goalInp">
            <span>Goal: </span>
          </label>
          <input
            className="input input-bordered"
            id="goalInp"
            type="input"
            placeholder="my goal is..."
            {...register("goalInp")}
          />
          {errors.goalInp?.message}
          <br />
          <button className="btn btn-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
}

export default CreateGoal;
