import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "./common/Card";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  return (
    <Card>
      <h1>Sign up for the goals app</h1>
      <form>
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
    </Card>
  );
}

export default Signup;
