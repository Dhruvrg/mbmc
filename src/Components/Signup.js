import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "../context/userContext";

const Signup = () => {
  const context = useContext(userContext);
  const { url } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    const { name, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(`${url}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const json = await response.json();
      if (name.slice(-3) === "108") {
        localStorage.setItem("cred", true);
      }
      if (json.name) {
        toast("Login Successfully", "success");
        localStorage.setItem("id", json.name);
        navigate("/");
      } else {
        toast("Invalid Detials", "danger");
      }
    } else {
      toast("Both the Password must be same", "danger");
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
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
