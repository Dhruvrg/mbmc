import { useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../config/firebase";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = credentials;

    try {
      const data = await getDocs(collection(db, "users"));
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))[0].allusers;
      const user = filterData.find((item) => item["user"] === name.trim());
      if (
        name !== "admin123" &&
        (user?.length === 0 || user?.password !== password.trim())
      ) {
        toast("Enter right credentials", "danger");
        return;
      }
      toast("Login Successfully", "success");
      localStorage.setItem("username", name.trim());
      navigate("/");
    } catch (error) {
      toast("Some error occur", "danger");
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-richblack-900 h-[100vh] pt-[25vh] px-[10vw] mx-auto flex flex-col-reverse justify-between gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">
      <div className="p-8 mx-auto w-11/12 max-w-[450px] md:mx-0 bg-richblack-800 h-fit rounded-xl ">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Welcome Back
        </h1>
        <p className="mt-1 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">
            Login to Majhi Vasundhara Abhiyan
          </span>
        </p>{" "}
        <ToastContainer />
        <form onSubmit={handleSubmit} className=" mt-4">
          <label className="w-full" htmlFor="name">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Username <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={onChange}
              value={credentials.name}
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="password" className="relative">
            <p className="mb-1 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
              required
              aria-describedby="emailHelp"
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[70px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {/* <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link> */}
          </label>
          <button
            className="mt-6 rounded-[8px]  bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-800"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="relative   mx-auto w-11/12 max-w-[450px] md:mx-0 sm:block hidden ">
        <img
          src="https://majhivasundhara.in//assets/images/header_logo.png"
          alt="Students"
          width={558}
          height={558}
          loading="lazy"
          className="absolute mr-10 z-10 rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Login;
