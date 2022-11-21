import cls from "classnames";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";

import s from "./profile.module.scss";

export const Profile = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: auth.currentUser?.displayName || "name",
    email: auth.currentUser?.email || "email",
  });
  const [changeDetail, setChangeDetail] = useState(false);
  const navigate = useNavigate();

  const inputChange = cls([s.profile__input], {
    [s.inputChange]: changeDetail,
  });

  const onLogOutHandler = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmitHandler = async () => {
    try {
      if (auth.currentUser && auth.currentUser?.displayName !== formData.name) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: formData.name,
        });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Could not update the profile detail");
    }
  };

  return (
    <>
      <section className={s.profile}>
        <h1 className={s.profile__header}>my profile</h1>
        <div className={s.profile__wrapper}>
          <form className={s.profile__form}>
            <input
              className={inputChange}
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              disabled={!changeDetail}
            />
            <input
              className={inputChange}
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              disabled={!changeDetail}
            />
            <div className={s.profile__operations}>
              <p className={s.profile__changeName}>
                do you want to change your name?{" "}
                <span
                  className={s.profile__edit}
                  onClick={() => {
                    changeDetail && onSubmitHandler();
                    setChangeDetail(!changeDetail);
                  }}
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>{" "}
              </p>
              <p className={s.profile__signOut} onClick={onLogOutHandler}>
                sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-800"
          >
            <Link
              className="flex items-center gap-x-2 justify-center"
              to="/create-listing"
            >
              <FcHome className="text-xl rounded-full bg-white" /> sell or rent
              your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};
