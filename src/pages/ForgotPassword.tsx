import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { OAuth } from "../components/OAuth";
import { auth } from "../firebase";

import s from "./signin.module.scss";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not reset password");
    }
  };

  return (
    <section>
      <h1 className="capitalize text-3xl text-center mt-6 font-bold">
        forgot password
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
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
                  to="/sign-in"
                >
                  sign in instead
                </Link>
              </p>
            </div>
            <button
              className="uppercase bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white px-7 py-3 text-sm font-medium rounded shadow-md tracking-wider"
              type="submit"
            >
              send reset password
            </button>
            <div className={s.or}>or</div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};
