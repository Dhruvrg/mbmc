import React, { useContext, useEffect, useState } from "react";
import UploadItem from "./UploadItem";
import userContext from "../context/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../config/firebase";
import { deleteObject, ref } from "firebase/storage";

const Upload = () => {
  const context = useContext(userContext);
  const { allFiles, list, setList } = context;

  useEffect(() => {
    allFiles();
    // eslint-disable-next-line
  }, []);

  const deleteAllFile = async () => {
    try {
      await list.map(
        async (item) => await deleteObject(ref(storage, `${item.name}`))
      );
      setList([]);
      toast("All Files Deleted Successfully", "success");
    } catch (error) {
      toast("Some error occur", "danger");
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] pb-[0.5vh] md:pb-[2.5vh] pt-[8vh] bg-richblack-900 text-white flex flex-col items-center">
      <button
        className="text-center text-3xl hover:font-extrabold font-bold bg-[#192841] hover:bg-[#203354] p-2 hover:p-3 rounded-xl m-[5vh]"
        onClick={() => deleteAllFile()}
      >
        Remove All
      </button>
      <div className="space-y-0.5 px-1 pt-5 md:flex gap-x-16 gap-y-5 flex-wrap justify-center">
        {list.map((item) => (
          <UploadItem key={item.url} file={item} />
        ))}
      </div>
    </div>
  );
};

export default Upload;
