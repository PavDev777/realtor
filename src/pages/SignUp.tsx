import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, FieldValue, serverTimestamp, setDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OAuth } from "../components/OAuth";
import { db } from "../firebase";

import s from "./signin.module.scss";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{
    email: string;
    password?: string;
    name: string;
    timeStamp?: FieldValue;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password!
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
      }
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <section>
      <h1 className="capitalize text-3xl text-center mt-6 font-bold">
        sign up
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
              type="text"
              id="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Full Name"
            />
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
                have a account?
                <Link
                  className="text-red-600 hover:text-red-800 ml-1"
                  to="/sign-in"
                >
                  Sign In
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
              sign up
            </button>
            <div className={s.or}>or</div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};
