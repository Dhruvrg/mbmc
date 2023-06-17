import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";

const Home = () => {
  const context = useContext(userContext);
  const { allUsers, allFiles } = context;

  useEffect(() => {
    allUsers();
    allFiles();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] pt-[7.5vh] md:pb-0 pb-[20vh] bg-[#86B049] flex justify-center items-center font-extrabold text-6xl">
      Home 
    </div>
  );
};

export default Home;
