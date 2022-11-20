import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEFK0P-29qq5UOKIaqbsPAFsd1xp_xk6c",
  authDomain: "realtor-react-2a1ea.firebaseapp.com",
  projectId: "realtor-react-2a1ea",
  storageBucket: "realtor-react-2a1ea.appspot.com",
  messagingSenderId: "542905463587",
  appId: "1:542905463587:web:3503cde1ead689b7e1d296",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
