import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { OAuth } from "../components/OAuth";

import s from "./signin.module.scss";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1 className="capitalize text-3xl text-center mt-6 font-bold">
        sign in
      </h1>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 items-center mt-6 max-w-6xl mx-auto p-3 gap-14">
        <div className="">
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1575908539614-ff89490f4a78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGtleXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="key"
          />
        </div>
        <div>
          <form className="flex flex-col gap-y-5" onSubmit={submitHandler}>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded"
              type="email"
              id="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Email Address"
            />
            <div className="relative">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 cursor-pointer text-2xl"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 cursor-pointer text-2xl"
                />
              )}
            </div>
            <div className="flex items-center justify-between text-sm sm:text-lg">
              <p className="">
                don't have a account?
                <Link
                  className="text-red-600 hover:text-red-800 ml-1"
                  to="/sign-up"
                >
                  register
                </Link>{" "}
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800"
                  to="/forgot-password"
                >
                  forgot password?
                </Link>
              </p>
            </div>
            <button
              className="uppercase bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white px-7 py-3 text-sm font-medium rounded shadow-md tracking-wider"
              type="submit"
            >
              sign in
            </button>
            <div className={s.or}>or</div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};
