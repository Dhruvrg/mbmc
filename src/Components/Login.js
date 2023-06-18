import { useContext, useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import userContext from "../context/userContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(userContext);
  const { setUserEmail } = context;

  const [showPassword, setShowPassword] = useState(false);
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
      setUserEmail(email.trim());
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
    <div className="bg-richblack-900 h-[100vh] pt-[25vh] px-[10vw] mx-auto flex flex-col-reverse justify-between gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">
      <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Welcome Back
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">
            Build skills for today, tomorrow, and beyond
          </span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-100">
            Education to future-proof your career
          </span>
        </p>{" "}
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label className="w-full" htmlFor="phoneNo">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="email"
              name="email"
              onChange={onChange}
              value={credentials.email}
              aria-describedby="emailHelp"
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="password" className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
              aria-describedby="emailHelp"
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link>
          </label>
          <button
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img
          src="https://cdn.dribbble.com/users/1897588/screenshots/3820679/login.gif"
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
