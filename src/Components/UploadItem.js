import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadItem = ({ user }) => {
  const context = useContext(userContext);
  const { list, allUsers, allFiles } = context;

  useEffect(() => {
    allUsers();
    allFiles();
  }, []);

  const file = list.filter(
    (item) => item.name.split(".")[0] === user.slice(0, -10)
  );

  const deleteAFile = async () => {
    try {
      await deleteObject(ref(storage, `${file[0]?.name}`));
      toast("File Deleted Successfully", "success");
    } catch (error) {
      toast("Some error occur", "danger");
      console.log(error);
    }
  };

  return (
    <div className="border-black md:w-[40vw] border-2 h-[7.5vh] rounded-md font-bold flex p-3 space-x-10 bg-[#192841] hover:bg-[#203354] hover:p-4">
      <div className="flex-1">{user.slice(0, -10)}</div>
      <a href={file[0]?.url} target="_blank">
        <i className="fa-solid fa-eye"></i>
      </a>
      <a href={file[0]?.url} download>
        <i className="fa-solid fa-download"></i>
      </a>
      <a onClick={() => deleteAFile()} href={file[0]?.url} download>
        <i className="fa-solid fa-trash-can"></i>
      </a>
      <div className="flex">
        <div>Status : </div>
        <div
          style={{
            backgroundColor: `${file.length === 0 ? "#FF0000" : "#32CD32"}`,
          }}
          className="rounded-full border-[0.5px] border-black w-[2.5vh] h-[2.5vh] mt-1"
        ></div>
      </div>
    </div>
  );
};

export default UploadItem;
