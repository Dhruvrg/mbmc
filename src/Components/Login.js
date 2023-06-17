import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      toast("Login Successfully", "success");
      if (email.slice(0, -10).slice(-3) === "108") {
        localStorage.setItem("cred", true);
      }
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
      <div className="bg-[#011B10] p-[7.5vw] md:p-[2.5vw] rounded-2xl md:w-[20vw] py-[10vh]  md:justify-center md:h-[50vh] md:flex md:items-center">
        <div>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[5vh]">
              <label htmlFor="phoneNo">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={onChange}
                value={credentials.email}
                aria-describedby="emailHelp"
                className="bg-[#011B10] text-white border-b-2 border-white"
              />
            </div>
            <div className="flex flex-col mb-[5vh]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                aria-describedby="emailHelp"
                className="bg-[#011B10] text-white border-b-2 border-white"
              />
            </div>
            <div className="text-center mt-[5vh]">
              <button className="font-bold" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
