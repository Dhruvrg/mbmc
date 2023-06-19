import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("cred");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-[#192841] flex gap-[2vw] md:gap-[1vw] text-white font-semibold md:text-lg px-[2.5vw] h-[8.5vh] md:h-[7.5vh] z-10 items-center fixed w-[100vw]">
      <div className="flex">
        <div className="hover:text-[#86B049] hover:animate-bounce">M</div>
        <div className="hover:text-[#86B049] hover:animate-bounce">B</div>
        <div className="hover:text-[#86B049] hover:animate-bounce">M</div>
        <div className="hover:text-[#86B049] hover:animate-bounce">C</div>
      </div>
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/"
      >
        Home
      </Link>
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/upload"
      >
        Upload
      </Link>
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/contact"
      >
        Contact Us
      </Link>
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/exceldata"
      >
        Excel
      </Link>
      <div className="absolute right-[2.5vw]">
        {auth?.currentUser?.email === undefined ? (
          <form className="flex gap-[2.5vw]">
            <Link
              className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
              to="/login"
              role="button"
            >
              Login
            </Link>
            <Link
              className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
              to="/signup"
              role="button"
            >
              Signup
            </Link>
          </form>
        ) : (
          <button
            className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
