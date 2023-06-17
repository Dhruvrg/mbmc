import { useState } from "react";
import UserContext from "./userContext";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const UserState = (props) => {
  const key = "108";
  const [list, setList] = useState([]);
  const [users, setUser] = useState([]);
  const [count, setCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  const allUsers = async () => {
    try {
      const data = await getDocs(collection(db, "users"));
      setUser(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].allusers
      );
      const admins = users.filter((item) => item.slice(-13, -10) === "108");
      setCount(admins.length);
    } catch (error) {
      console.error(error);
    }
  };

  const allFiles = async () => {
    const data = await listAll(ref(storage));
    if (data.items.length <= list.length) {
      return;
    }
    const temp = [];
    data.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        temp.push({ url: url, name: item._location.path_ });
      });
    });
    setList(temp);
  };

  return (
    <UserContext.Provider
      value={{
        list,
        count,
        key,
        users,
        allUsers,
        allFiles,
        userEmail,
        setUserEmail,
        count,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
