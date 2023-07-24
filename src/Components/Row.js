import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../config/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import userContext from "../context/userContext";

const Row = ({ user }) => {
  const context = useContext(userContext);
  const { list, setList } = context;

  const [selectedFile, setSelectedFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    if (selectedFile == null) {
      toast("Select a file", "danger");
      return;
    }
    try {
      const imageRef = ref(storage, `${username}.${selectedFile.name.trim()}`);
      await uploadBytes(imageRef, selectedFile);
      toast("File Added Successfully", "success");
      setShowUpload(false);
      user[2] += 1;
      if (user[1] === "Not Uploaded") {
        user[1] = "Uploaded";
        user[1] = [{ url: "#", name: `${username}.${selectedFile.name}` }];
      } else
        user[1].push({ url: "#", name: `${username}.${selectedFile.name}` });
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
      toast("some error occur", "danger");
    }
  };

  const deleteAFile = async (fileName) => {
    try {
      await deleteObject(ref(storage, fileName));
      toast("File Deleted Successfully", "success");
      user[2] -= 1;
      if (user[2] === 0) {
        user[1] = "Not Uploaded";
      } else {
        user[1].splice(user[1].indexOf({ mame: fileName }), 1);
      }
      const newList = list.filter((item) => item?.name !== fileName);
      setList(newList);
    } catch (error) {
      toast("Some error occur", "danger");
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      {showUpload &&
      user[2] !== 0 &&
      (user[0][1] === localStorage.getItem("username") ||
        "admin123" === localStorage.getItem("username")) ? (
        <div className="absolute w-1/5 left-[5vw] p-2 rounded-2xl bg-caribbeangreen-300">
          {user[1]?.map((item) => (
            <div key={item.url} className="flex">
              <a href={item?.url} target="_blank" className="flex-1 w-4/5">
                <div
                  className="text-center  "
                  style={{
                    color: `${
                      item?.name.split(".")[2] !== "pdf" ? "#FF0000" : "white"
                    }`,
                  }}
                >
                  {item?.name?.split(".")[1]}
                </div>
              </a>
              <div onClick={() => deleteAFile(item.name)} className="mr-[1vw]">
                <i className="fa-solid fa-trash-can hover:cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div
        onClick={() => setShowUpload(!showUpload)}
        className={`text-black border-2 border-black py-[1vh] text-center w-[65vw] md:w-[22.5vw] ${
          user[0][1] === localStorage.getItem("username") ||
          "admin123" === localStorage.getItem("username")
            ? "hover:scale-110 delay-150 transition-all hover:cursor-pointer"
            : ""
        }`}
      >
        {user[0][0]}
      </div>
      <div>
        {user[1] === "Not Uploaded" ? (
          <div className="border-2 border-black py-[1vh] text-center w-[65vw] md:w-[22.5vw] bg-[#FF160C] text-black">
            Not Uploaded
          </div>
        ) : (
          <div className="border-2 border-black py-[1vh] text-center w-[65vw] md:w-[22.5vw] bg-[#00FF00] text-black">
            Uploaded
          </div>
        )}
      </div>
      <div className="border-2  text-black border-black py-[1vh] text-center w-[65vw] md:w-[22.5vw]">
        {user[2]}
      </div>
      <div className="w-[5vw] mt-[1vh] flex justify-center">
        {showUpload && user[0][1] === localStorage.getItem("username") ? (
          <div className="flex justify-center items-center">
            {selectedFile ? (
              <button
                className="bg-caribbeangreen-300 p-2 rounded-xl hover:scale-110 transition-all delay-200"
                onClick={handleSubmission}
              >
                Submit
              </button>
            ) : (
              <input
                type="file"
                name="file"
                onChange={changeHandler}
                className="absolute right-44 bg-caribbeangreen-300 rounded-xl text-center "
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Row;
