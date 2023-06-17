import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const url = "https://doit-44638-default-rtdb.firebaseio.com";
  const key = "108";
  const [list, setList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [count, setCount] = useState(0);
  const allUsers = async () => {
    const response = await fetch(`${url}/users.json`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const json = await response.json();
    setList(Object.entries(json));
    const data = list.filter((user) => user[1].name.slice(-3) === key);
    setCount(data.length);
  };

  const allFiles = async () => {
    const response = await fetch(`${url}/files.json`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const json = await response.json();
    setFileList(Object.entries(json));
  };

  return (
    <UserContext.Provider
      value={{ list, allUsers, fileList, allFiles, count, url, key }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
