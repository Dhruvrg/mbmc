import React, { useContext, useEffect, useState } from "react";
import UploadItem from "./UploadItem";
import userContext from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../config/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

const Upload = () => {
  const context = useContext(userContext);
  const { allUsers, allFiles, list, users, userEmail, count } = context;
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    allUsers();
    allFiles();
    // eslint-disable-next-line
  }, []);

  const deleteAllFile = async () => {
    try {
      await list.map(async (item) => {
        await deleteObject(ref(storage, `${item.url}`));
      });
      toast("All Files Deleted Successfully", "success");
    } catch (error) {
      toast("Some error occur", "danger");
      console.log(error);
    }
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (e) => {
    const file = await list.filter(
      (item) => item.name === userEmail.slice(0, -10)
    );
    e.preventDefault();
    if (selectedFile == null) {
      toast("Select a file", "danger");
      return;
    }
    if (file.length !== 0) {
      toast("File Already Uploaded", "danger");
      return;
    }

    try {
      const imageRef = ref(
        storage,
        `${userEmail.slice(0, -10)}.${selectedFile.name.split(".")[1]}`
      );
      await uploadBytes(imageRef, selectedFile);
      toast("File Added Successfully", "success");
    } catch (error) {
      console.log(error);
      toast("some error occur", "danger");
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] pb-[0.5vh] md:pb-[2.5vh] pt-[8vh] bg-[#86B049]">
      {!localStorage.getItem("cred") ? (
        <div className="flex h-[90vh] justify-center items-center flex-col">
          <ToastContainer />

          <input type="file" name="file" onChange={changeHandler} />
          <button
            className="bg-green-700 px-5 rounded-md mt-5"
            onClick={handleSubmission}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div className="font-extrabold text-4xl flex justify-center gap-16 md:gap-24 my-12">
            <div className="text-[#1d7922] mt-5">{list.length}</div>
            <div className="bg-green-400 border-4 border-black w-[12.5vh] h-[12.5vh] md:w-[7.5vw] md:h-[7.5vw] rounded-full flex justify-center items-center">
              {Number.parseInt((list.length * 50) / (users.length - count))}%
            </div>
            <div className="text-[#FF0000] mt-5">
              {users.length - list.length - count}
            </div>
          </div>
          <div className="text-center text-6xl">
            <button onClick={() => deleteAllFile()}>
              <a onClick={() => deleteAllFile()}>
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </button>
          </div>
          <div className="space-y-0.5 px-1 pt-5 md:flex gap-x-16 gap-y-5 flex-wrap justify-center">
            {users.map((item) => {
              return item.slice(-13, -10) !== "108" ? (
                <UploadItem key={item} user={item} />
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
