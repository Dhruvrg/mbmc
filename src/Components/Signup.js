import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import userContext from "../context/userContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const context = useContext(userContext);
  const { setUserEmail } = context;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="bg-richblack-900 h-[100vh] pt-[25vh] px-[10vw] mx-auto flex flex-col-reverse justify-between gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">
      <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Join the millions learning to code with StudyNotion for free
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">
            Build skills for today, tomorrow, and beyond
          </span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-100">
            Education to future-proof your career
          </span>
        </p>
        <ToastContainer />
        <form onSubmit={signUp} className="flex w-full flex-col gap-y-4">
          <label className="w-full" htmlFor="email">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <div className="flex gap-x-4">
            <label htmlFor="password" className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={onChange}
                minLength={5}
                required
                value={credentials.password}
                id="password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
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
            </label>
            <label htmlFor="cpassword" className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="cpassword"
                onChange={onChange}
                minLength={5}
                required
                value={credentials.cpassword}
                id="cpassword"
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
          <button
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            type="submit"
          >
            SIGN UP
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

export default Signup;
