import { useState } from "react";
import UserContext from "./userContext";
import { storage } from "../config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const UserState = (props) => {
  const key = "108";
  const [list, setList] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const users = [
    ["उद्यान विभाग", "user1"],
    ["घनकचरा व्यवस्थापन विभाग", "user2"],
    ["वैद्यकीय आरोग्य विभाग", "user3"],
    ["माहिती व तंत्रज्ञान विभाग", "user4"],
    ["पर्यावरण विभाग", "user5"],
    ["बांधकाम व विद्यत विभाग", "user6"],
    ["पाणी पुरवठा व मलनिःसारण विभाग", "user7"],
    ["वाहन / परवन विभाग", "user8"],
  ];

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

  const twoDArray = () => {
    let result = [];
    users.forEach((user) => {
      const file = list.filter((item) => item.name.split(".")[0] === user[1]);
      result.push([
        user,
        file.length === 0 ? "Not Uploaded" : file,
        file.length,
      ]);
    });
    setExcelData(result);
  };

  return (
    <UserContext.Provider
      value={{
        list,
        setList,
        key,
        users,
        allFiles,
        twoDArray,
        excelData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
