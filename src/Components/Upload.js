import React, { useContext, useEffect, useState } from "react";
import UploadItem from "./UploadItem";
import userContext from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const id = localStorage.getItem("id");
  const context = useContext(userContext);
  const { list, fileList, allUsers, allFiles, key, count, url } = context;
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    allUsers();
    allFiles();
    // eslint-disable-next-line
  }, []);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    let userFile = await fileList.find((item) => item[1].userid === id);
    console.log(userFile);
    if (userFile !== undefined) {
      toast("File is already uploaded", "danger");
    } else {
      let reader = new FileReader();
      let binaryData;
      reader.onload = function (event) {
        binaryData = event.target.result;
      };
      reader.readAsBinaryString(selectedFile);
      setTimeout(async () => {
        const response = await fetch(`${url}/files.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userid: id,
            file: binaryData,
          }),
        });
        const json = await response.json();
        if (json) {
          toast("File Added Successfully", "success");
        } else {
          toast("some error occur", "danger");
        }
      }, 1000);
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
            <div className="text-[#1d7922] mt-5">{fileList.length}</div>
            <div className="bg-green-400 border-4 border-black w-[12.5vh] h-[12.5vh] md:w-[7.5vw] md:h-[7.5vw] rounded-full flex justify-center items-center">
              {Number.parseInt((fileList.length * 100) / (list.length - count))}
              %
            </div>
            <div className="text-[#FF0000] mt-5">
              {list.length - fileList.length - count}
            </div>
          </div>
          <div className="space-y-0.5 px-1 pt-5 md:flex gap-x-16 gap-y-5 flex-wrap justify-center">
            {list && list.length > 0
              ? list.map((user) => {
                  return user[1].name.slice(-3) !== key ? (
                    <UploadItem key={user[0]} user={user} />
                  ) : null;
                })
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
