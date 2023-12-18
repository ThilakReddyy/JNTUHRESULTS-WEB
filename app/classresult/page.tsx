"use client";
import { useState } from "react";
import Loading from "@/components/loading/loading";
import { collegedata } from "@/constants/colleges";
import { regulationDetails } from "@/constants/degreedetails";
const ClassResult = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-[75%]  mt-[6%]  mx-[12.5%]   ">
      <div className="rounded-md border-black dark:border-white border-2  shadow-2xl">
        <div className=" pt-[30px] pb-[50px]">
          <div className=" md:text-2xl  font-semibold  ">
            <div className=" md:text-2xl   font-semibold   flex justify-center ">
              Class Results
            </div>
            <br />
            <div className="text-xs w-full px-[15%] md:px-[30%]">
              <select
                defaultValue={""}
                onChange={() => {}}
                className="w-full text-[8px] md:text-xs font-light  border border-black border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled selected>
                  Select the College Name...
                </option>
                {Object.keys(collegedata)
                  .sort((a, b) =>
                    collegedata[a]
                      .toUpperCase()
                      .localeCompare(collegedata[b].toUpperCase()),
                  )
                  .map((key) => (
                    <option
                      value={key}
                      key={key}
                      style={{ width: "10px" }} // Adjust the width as needed
                    >
                      {collegedata[key].toUpperCase().substring(0, 65)}
                    </option>
                  ))}
              </select>
              <select
                defaultValue={""}
                onChange={() => {}}
                className="w-full text-[8px] md:text-xs font-light  border border-black border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled selected>
                  Select Branch...
                </option>
                {Object.keys(regulationDetails).map((key) => (
                  <option
                    value={key}
                    key={key}
                    style={{ width: "10px" }} // Adjust the width as needed
                  >
                    {regulationDetails[key].toUpperCase().substring(0, 65)}
                  </option>
                ))}
              </select>
              <select
                defaultValue={""}
                onChange={() => {}}
                className="w-full text-[8px] md:text-xs font-light  border border-black border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled selected>
                  Select Regulation...
                </option>
                {Object.keys(regulationDetails).map((key) => (
                  <option
                    value={key}
                    key={key}
                    style={{ width: "10px" }} // Adjust the width as needed
                  >
                    {regulationDetails[key].toUpperCase().substring(0, 65)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassResult;
