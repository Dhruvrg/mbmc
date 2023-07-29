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
    <div className=" w-[100vw] h-[100vh] pt-[10vh] md:pb-0 pb-[20vh] flex flex-col text-center justify-start items-center font-bold text-6xl">
      <img
        src="https://mbmcgardencity.com/wp-content/uploads/2022/02/MBMC-Logo.png"
        alt="header"
      />
      <div>
        {" "}
        <p className=" text-center">माझी वसुंधरा अभियान 4.0</p>
      </div>
      <div>
        <p className="text-[#3FA710] underline p-4">MIS</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl">विभागानुसार कागदपत्र / कार्यदेश</p>
        <p className="text-2xl">अपलोड करने</p>
      </div>
    </div>
  );
};

export default Home;
