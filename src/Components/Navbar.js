import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-[#3FA710] flex gap-[2vw] md:gap-[1vw] text-white font-semibold md:text-lg px-[2.5vw] h-[8.5vh] md:h-[7.5vh] z-10 items-center fixed w-[100vw] rounded-md">
      <img
        src="https://majhivasundhara.in//assets/images/header_logo.png"
        width={60}
        alt="logo"
      />
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/"
      >
        Home
      </Link>
      {localStorage.getItem("username") === "admin123" ? (
        <Link
          className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
          to="/upload"
        >
          Upload
        </Link>
      ) : null}
      {localStorage.getItem("username") ? (
        <Link
          className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
          to="/exceldata"
        >
          Excel
        </Link>
      ) : null}
      <Link
        className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
        to="/contact"
      >
        Contact
      </Link>
      <div className="absolute right-[2.5vw]">
        {!localStorage.getItem("username") ? (
          <form className="flex gap-[2.5vw]">
            <Link
              className="hover:font-bold hover:text-[#86B049] focus:text-[#86B049] focus:scale-x-105"
              to="/login"
              role="button"
            >
              Login
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
