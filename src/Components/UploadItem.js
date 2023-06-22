import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadItem = ({ file }) => {
  const context = useContext(userContext);
  const { allFiles, users, list, setList } = context;

  useEffect(() => {
    allFiles();
    // eslint-disable-next-line
  }, []);

  const deleteAFile = async () => {
    try {
      await deleteObject(ref(storage, `${file?.name}`));
      toast("File Deleted Successfully", "success");
      const newList = list.filter((item) => item?.name !== file?.name);
      setList(newList);
    } catch (error) {
      toast("Some error occur", "danger");
      console.log(error);
    }
  };

  const name = users.find((item) => item[1] === file?.name.split(".")[0]);

  return (
    <div className="border-black md:w-[40vw] border-2 h-[7.5vh] rounded-md font-bold flex p-3 pr-6 space-x-5 bg-[#192841] hover:bg-[#203354] hover:p-4">
      <div className="flex-1">
        {name[0]} ({file?.name.split(".")[1]})
      </div>
      <a href={file?.url} target="_blank" download>
        <i className="fa-solid fa-download"></i>
      </a>
      <div onClick={() => deleteAFile()}>
        <i className="fa-solid fa-trash-can"></i>
      </div>
      <div
        style={{
          backgroundColor: `${
            file?.name.split(".")[2] !== "pdf" ? "#FF0000" : "#32CD32"
          }`,
        }}
        className="rounded-full border-[0.5px] border-black w-[2.5vh] h-[2.5vh] mt-1"
      ></div>
    </div>
  );
};

export default UploadItem;
