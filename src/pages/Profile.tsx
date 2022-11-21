import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import s from "./profile.module.scss";

export const Profile = () => {
  const [formData, setFormData] = useState<{
    name: string | null | undefined;
    email: string | null | undefined;
  }>({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });
  const navigate = useNavigate();

  const onLogOutHandler = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section className={s.profile}>
        <h1 className={s.profile__header}>my profile</h1>
        <div className={s.profile__wrapper}>
          <form className={s.profile__form}>
            <input
              className={s.profile__inputName}
              type="text"
              id="name"
              value={formData.name!}
              disabled
            />
            <input
              className={s.profile__inputEmail}
              type="email"
              id="email"
              value={formData.email!}
              disabled
            />
            <div className={s.profile__operations}>
              <p className={s.profile__changeName}>
                do you want to change your name?{" "}
                <span className={s.profile__edit}>edit</span>{" "}
              </p>
              <p className={s.profile__signOut} onClick={onLogOutHandler}>
                sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
