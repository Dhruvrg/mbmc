import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import userContext from "../context/userContext";

const Signup = () => {
  const context = useContext(userContext);
  const { setUserEmail } = context;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    const { email, password, cpassword } = credentials;
    if (password !== cpassword) {
      toast("Both the Password must be same", "danger");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      if (email.slice(0, -10).slice(-3) === "108") {
        localStorage.setItem("cred", true);
      }
      await updateDoc(
        doc(db, "users", "8GkRn61xaMk4S6thbi87"),
        "allusers",
        arrayUnion(email.trim())
      );
      toast("Account created Successfully", "success");
      setUserEmail(email.trim());
      navigate("/");
    } catch (error) {
      toast("Invalid Detials", "danger");
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center bg-[#86B049] text-white">
      <div className="bg-[#011B10] p-[7.5vw] md:p-[2.5vw] rounded-2xl md:w-[20vw] md:justify-center flex items-center h-[50vh]">
        <ToastContainer />
        <form onSubmit={signUp}>
          <div className="flex flex-col mb-5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              className="bg-[#011B10] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
              value={credentials.password}
              id="password"
              className="bg-[#011B10] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="cpassword">Comfirm Password</label>
            <input
              type="password"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
              value={credentials.cpassword}
              id="cpassword"
              className="bg-[#011B10] border-b-2 border-white"
            />
          </div>
          <div className="text-center mt-[5vh]">
            <button className=" text-white font-bold" type="submit">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
