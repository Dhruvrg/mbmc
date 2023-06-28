import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
// import { hash, compare, genSalt } from "bcryptjs";

const Home = () => {
  const context = useContext(userContext);
  const { allFiles } = context;

  const pas = async () => {
    // const password = "dhruv";
    // const salt = await genSalt(10);
    // const secPass = await hash(password, salt);
    // const passwordCompare = await compare(
    //   password,
    //   "$2a$10$rulqYlbEgxebvLsNyyQ/EO8ycTGXlYuHGnWKLhThjU5ZdnfM4sDaS"
    // );
  };

  useEffect(() => {
    allFiles();
    pas();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] pt-[7.5vh] md:pb-0 pb-[20vh] bg-richblack-900 text-white flex justify-center items-center font-extrabold text-6xl">
      Home
    </div>
  );
};

export default Home;
