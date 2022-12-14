import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, set } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import HeadName from "../../components/HeadName";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Inputs {
  email: string;
  password: string;
}
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (isLoggedIn) {
      setIsLoading(true);
      await signIn(email, password);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await signUp(email, password);
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <HeadName name="Netflix - Login" />

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="Login__BG__Image"
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="Login__Netflix__Logo"
        width={150}
        height={150}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="Login__Form">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="Login__Form__Validation">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="Login__Form__Validation">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <Button
          type="submit"
          className="Login__Form__Button__SignIn"
          onClick={() => setIsLoggedIn(true)}
        >
          {isLoading ? <LoadingSpinner size={25} color="inherit" /> : "Sign In"}
        </Button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <Button
            type="submit"
            className="Login__Form__Button__SignUp"
            onClick={() => setIsLoggedIn(false)}
          >
            Sign Up Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
