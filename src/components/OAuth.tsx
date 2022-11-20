import { FcGoogle } from "react-icons/fc";

import s from "./oauth.module.scss";

export const OAuth = () => {
  return (
    <button className={s.oauthBtn}>
      {" "}
      <FcGoogle className={s.oauthBtn__icon} /> continue with google
    </button>
  );
};
