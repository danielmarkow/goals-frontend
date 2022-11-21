import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "./common/Card";

const loginSchema = yup.object({
  emailInp: yup.string().email().required(),
  pwInp: yup.string().min(8).required(),
});

function Login() {
  const [location, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:5001/api/users/login", {
        email: data.emailInp,
        password: data.pwInp,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      {mutation.isLoading && <p>logging in...</p>}
      {mutation.isIdle && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="input-group" htmlFor="emailInp">
              <span>Email: </span>
            </label>
            <input
              className="input input-bordered"
              id="emailInp"
              type="input"
              placeholder="name@domain.com"
              {...register("emailInp")}
            />
            {errors.emailInp?.message}
            <br />
            <label className="input-group" htmlFor="pwInp">
              <span>Password: </span>
            </label>
            <input
              className="input input-bordered"
              id="pwInp"
              type="password"
              placeholder="Password"
              {...register("pwInp")}
            />
            {errors.pwInp?.message}
            <br />
            <button className="btn btn-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {mutation.isSuccess && (
        <>
          {localStorage.setItem("goals-token", mutation.data.data.token)}
          <p>logged in successfully</p>
          <br />
          <button className="btn btn-outline" onClick={() => setLocation("/")}>
            Return Home
          </button>
        </>
      )}
    </Card>
  );
}

export default Login;
