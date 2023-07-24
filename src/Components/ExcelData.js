import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
import Row from "./Row";

const ExcelData = () => {
  const context = useContext(userContext);
  const { twoDArray, allFiles, excelData, list, users } = context;

  useEffect(() => {
    allFiles();
    twoDArray();
    // eslint-disable-next-line
  }, []);

  const exportToCsv = async () => {
    let result = [];
    users.forEach((user) => {
      const file = list.filter((item) => item.name.split(".")[0] === user);
      result.push([
        user[0],
        file[0]?.url === undefined ? "Not Uploaded" : "Uploaded",
      ]);
    });
    var CsvString = "User,url\r\n";
    excelData.forEach((rowItem) => {
      rowItem.forEach((colItem) => {
        CsvString += colItem + ",";
      });
      CsvString += "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "somedata.csv");
    document.body.appendChild(x);
    x.click();
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-richblack-900 text-white justify-center flex flex-col">
      <div className="flex justify-center font-extrabold text-2xl mb-[10vh] text-[#3FA710]">
        <button onClick={() => exportToCsv()}>Download</button>
      </div>
      <div className="md:ml-[10vw] mx-[2.5vw] z-50 flex flex-col md:items-center overflow-x-scroll md:overflow-x-hidden">
        <div className="w-[195vw] md:w-[68vw] flex items-center">
          <div className="border-2 border-black font-bold text-lg py-[2.5vh] text-center w-[65vw] md:w-[22.5vw] bg-[#192841]">
            UserName
          </div>
          <div className="border-2 border-black font-bold text-lg py-[2.5vh] text-center w-[65vw] md:w-[22.5vw] bg-[#192841]">
            Status
          </div>
          <div className="border-2 border-black font-bold text-lg py-[2.5vh] text-center w-[65vw] md:w-[22.5vw] bg-[#192841]">
            Files
          </div>
          <div className="w-[5vw]"></div>
        </div>
        {excelData?.map((user) => (
          <Row key={user[0]} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ExcelData;
