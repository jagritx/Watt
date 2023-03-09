// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMWxOaJC_FrF_zO-s-IkXRiKvLpWSdFnQ",
  authDomain: "watt-c9d06.firebaseapp.com",
  projectId: "watt-c9d06",
  storageBucket: "watt-c9d06.appspot.com",
  messagingSenderId: "833534665501",
  appId: "1:833534665501:web:070db7ee32e199c47b77f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
