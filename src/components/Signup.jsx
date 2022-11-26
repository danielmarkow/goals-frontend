import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "./common/Card";
import userHook from "../hooks/userHook";

const signupSchema = yup.object({
  nameInp: yup.string().required(),
  emailInp: yup.string().email().required(),
  pwInp: yup.string().min(8).required(),
  pwInpRepeat: yup
    .string()
    .min(8)
    .required()
    .oneOf([yup.ref("pwInp")], "Passwords do not match"),
});

function Signup() {
  const { token, setTokenState, setUserdataState } = userHook();
  const [location, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: (data) => {
      const { nameInp, emailInp, pwInp } = data;
      return axios.post("http://localhost:5001/api/users", {
        name: nameInp,
        email: emailInp,
        password: pwInp,
      });
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  useEffect(() => {
    if (signupMutation.isSuccess) {
      setTokenState(signupMutation.data.data.token);
      setUserdataState(signupMutation.data.data);
    }
  }, [signupMutation.data]);

  return (
    <Card>
      {signupMutation.isLoading && <p>signing you up...</p>}
      {signupMutation.isError && <p>error signing you up...</p>}
      {signupMutation.isSuccess && (
        <>
          <p>successfully signed up</p>
          <br />
          <button className="btn btn-outline" onClick={() => setLocation("/")}>
            Return Home
          </button>
        </>
      )}
      {!token && (
        <>
          <h1>Sign up for the goals app</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="input-group" htmlFor="nameInp">
                <span>Name: </span>
              </label>
              <input
                className="input input-bordered"
                id="nameInp"
                type="input"
                placeholder="name"
                {...register("nameInp")}
              />
              {errors.nameInp?.message}
              <br />
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
              <label className="input-group" htmlFor="pwInpRepeat">
                <span>Repeat password: </span>
              </label>
              <input
                className="input input-bordered"
                id="pwInpRepeat"
                type="password"
                placeholder="Repeat password"
                {...register("pwInpRepeat")}
              />
              {errors.pwInpRepeat?.message}
              <br />
              <button className="btn btn-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
}

export default Signup;
