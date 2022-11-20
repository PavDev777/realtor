import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";

import s from "./oauth.module.scss";

export const OAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not auth with Google");
      console.log(error);
    }
  };
  return (
    <button type="button" className={s.oauthBtn} onClick={onGoogleClick}>
      {" "}
      <FcGoogle className={s.oauthBtn__icon} /> continue with google
    </button>
  );
};
