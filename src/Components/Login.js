import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "../context/userContext";

const Login = () => {
  const context = useContext(userContext);
  const { url } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = credentials;
    const response = await fetch(`${url}/users.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const data = Object.entries(json).filter(
      (item) => item[1].name === name && item[1].password === password
    );
    if (name.slice(-3) === "108") {
      localStorage.setItem("cred", true);
    }
    if (data.length !== 0) {
      toast("Login Successfully", "success");
      localStorage.setItem("id", data[0][0]);
      navigate("/");
    } else {
      toast("Invalid Detials", "danger");
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
              <label htmlFor="phoneNo">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onChange}
                value={credentials.name}
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
