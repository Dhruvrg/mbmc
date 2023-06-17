import React, { useContext } from "react";
import userContext from "../context/userContext";

const UploadItem = ({ user }) => {
  const context = useContext(userContext);
  const { fileList } = context;
  let userFile = fileList.find((item) => item[1].userid === user[0]);
  userFile = userFile !== undefined ? userFile[1].file : "Empty";
  // const blob = new Blob([binaryData], { type: "application/pdf" });
  var blob = new Blob([userFile], { type: "text/plain" });
  var file = new File([blob], "document.txt", { type: "text/plain" });

  return (
    <div className="border-black md:w-[40vw] border-2 h-[7.5vh] rounded-md font-bold flex p-3 space-x-6 bg-[#5B9A18] hover:bg-[#71B81D] hover:p-4">
      <div className="flex-1">{user[1].name}</div>
      <a href={URL.createObjectURL(file)} target="_blank">
        <i className="fa-solid fa-eye"></i>
      </a>
      <a href={URL.createObjectURL(file)} download target="_blank">
        <i className="fa-solid fa-download"></i>
      </a>
      <div className="flex">
        <div>Status : </div>
        <div
          style={{
            backgroundColor: `${userFile === "Empty" ? "#FF0000" : "#32CD32"}`,
          }}
          className="rounded-full border-[0.5px] border-black w-[2.5vh] h-[2.5vh] mt-1"
        ></div>
      </div>
    </div>
  );
};

export default UploadItem;
