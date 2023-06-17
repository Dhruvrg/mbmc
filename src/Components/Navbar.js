import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("cred");
    navigate("/login");
  };

  return (
    <nav className="bg-[#011B10] flex gap-[2vw] md:gap-[1vw] text-white font-semibold md:text-lg px-[2.5vw] h-[8.5vh] md:h-[7.5vh] z-10 items-center fixed w-[100vw]">
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
      <div className="absolute right-[2.5vw]">
        {!localStorage.getItem("id") ? (
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
