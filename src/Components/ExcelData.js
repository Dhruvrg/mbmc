import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";

const ExcelData = () => {
  const context = useContext(userContext);
  const { twoDArray, allUsers, allFiles, excelData } = context;

  useEffect(() => {
    allUsers();
    allFiles();
    twoDArray();
    // eslint-disable-next-line
  }, []);

  const exportToCsv = async () => {
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
      <div className="flex justify-center font-extrabold text-2xl mb-[10vh]">
        <button className="" onClick={() => exportToCsv()}>
          Download
        </button>
      </div>
      <table className="mx-[25vw]">
        <tr className="bg-[#192841]">
          <th className="border-2 border-blue-100 py-[2vw]">Name</th>
          <th className="border-2 border-blue-100 py-[2vw]">Status</th>
        </tr>
        {excelData?.map((user) => (
          <tr key={user[0]}>
            <td className="border-2 border-blue-100 px-[1vw] text-center">
              {user[0].slice(0, -10)}
            </td>
            {user[1] === "Not Uploaded" ? (
              <td className="border-2 border-blue-100 px-[1vw] text-center bg-[#FF160C] text-black">
                Not Uploaded
              </td>
            ) : (
              <td className="border-2 border-blue-100 px-[1vw] text-center bg-[#00FF00] text-black">
                <a href={user[1]} target="_blank">
                  Uploaded
                </a>
              </td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ExcelData;
