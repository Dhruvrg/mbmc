import { useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)

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
    <div>
    <ToastContainer />
    <form
    onSubmit={handleSubmit}
    className="mt-6 flex w-full flex-col gap-y-4"
  >
    <label className="w-full">
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        Email Address <sup className="text-pink-200">*</sup>
      </p>
      <input
        required
        type="text"
        name="email"
        value={credentials.email}
        onChange={onChange}
        placeholder="Enter email address"
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
      />
    </label>
    <label className="relative">
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        Password <sup className="text-pink-200">*</sup>
      </p>
      <input
        required
        type={showPassword ? "text" : "password"}
        name="password"
        value={credentials.password}
        onChange={onChange}
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
      type="submit"
      className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
    >
      Sign In
    </button>
  </form>
  </div>
  );
};

export default Login;
