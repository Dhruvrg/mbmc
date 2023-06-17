import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjqGyVJFqBvi-C2AojRyUhc-QjjlMrqt0",
  authDomain: "mbmc-9ea56.firebaseapp.com",
  projectId: "mbmc-9ea56",
  storageBucket: "mbmc-9ea56.appspot.com",
  messagingSenderId: "612282681068",
  appId: "1:612282681068:web:62f4cbebc753d1c44ac7c9",
  measurementId: "G-2MFKFBZTJQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
