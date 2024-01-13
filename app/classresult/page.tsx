"use client";
import { useState } from "react";
import Loading from "@/components/loading/loading";
import { collegedata } from "@/constants/colleges";
import { regulationDetails } from "@/constants/regulationdetails";
import { degreeDetails } from "@/constants/degree";
import { branchDetails } from "@/constants/branchdetails";
import toast from "react-hot-toast";
import {
  fetchClassResult,
  getLocalStoragedata,
  setLocalStoragedata,
} from "@/components/api/fetchClassResult";
import { useRouter } from "next/navigation";
const ClassResult = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState({
    collegeName: "",
    semesterName: "",
    regulationName: "",
    degreeName: "",
    branchName: "",
  });

  const onSubmit = async () => {
    const date = Date.now();
    if (currentHours > 7) {
      return;
    }

    const validator = Object.values(form).some((value) => value === "");

    if (validator) {
      toast.error("Kindly fill all the required fields!!");
      return;
    }

    setLoading(true);
    router.push("https://jntuhresultsnew.vercel.app/classresult");
    return;
    const prefixRolls = [
      `${form["regulationName"]}${form["collegeName"]}1${form["degreeName"]}${form["branchName"]}`,
      `${parseInt(form["regulationName"]) + 1}${form["collegeName"]}5${
        form["degreeName"]
      }${form["branchName"]}`,
    ];

    const rollPrefixes = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let redirect = false;
    for (const prefixRoll of prefixRolls) {
      for (const rollPrefix of rollPrefixes) {
        let roll_numbers = "";
        for (let i = 0; i < 10; i++) {
          roll_numbers += prefixRoll + rollPrefix + i + ",";
        }
        roll_numbers = roll_numbers.substring(0, roll_numbers.length - 1);
        const localStorage = getLocalStoragedata(
          roll_numbers + form["semesterName"],
        );
        if (localStorage !== null && localStorage.expiry < date) {
          setLocalStoragedata(
            prefixRolls[0] + form["semesterName"],
            localStorage.value,
          );
          if (redirect === false) {
            router.push(
              "/classresult/result?prefix_htnos=" +
                prefixRolls[0] +
                "," +
                prefixRolls[1] +
                "&semester=" +
                form["semesterName"],
            );
            redirect = true;
          }
          continue;
        }
        const response = await fetchClassResult(
          roll_numbers,
          form["semesterName"],
        );
        if (response === null || response.length === 0) {
          if (redirect === false) {
            setLoading(false);
            toast.error("Internal Server Error!!!");
          }
          break;
        }
        if (redirect === false) {
          setLocalStoragedata(
            prefixRolls[0] + form["semesterName"],
            localStorage.value,
          );
          router.push(
            "/classresult/result?prefix_htnos=" +
              prefixRolls[0] +
              "," +
              prefixRolls[1] +
              "&semester=" +
              form["semesterName"],
          );
          redirect = true;
        }
      }
    }
  };

  const handleEventChange = (event: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  var currentHours = new Date().getHours();
  console.log(currentHours);
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
                name="collegeName"
                defaultValue={""}
                onChange={handleEventChange}
                className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled>
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
                name="degreeName"
                onChange={handleEventChange}
                className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled>
                  Select Degree...
                </option>
                {Object.keys(degreeDetails).map((key) => (
                  <option
                    value={key}
                    key={key}
                    style={{ width: "10px" }} // Adjust the width as needed
                  >
                    {degreeDetails[key].toUpperCase().substring(0, 65)}
                  </option>
                ))}
              </select>
              <select
                defaultValue={""}
                name="regulationName"
                onChange={handleEventChange}
                className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled>
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
              <select
                defaultValue={""}
                onChange={handleEventChange}
                name="branchName"
                className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled>
                  Select Branch...
                </option>
                {Object.keys(branchDetails)
                  .sort((a, b) =>
                    branchDetails[a]
                      .toUpperCase()
                      .localeCompare(branchDetails[b].toUpperCase()),
                  )

                  .map((key) => (
                    <option
                      value={key}
                      key={key}
                      style={{ width: "10px" }} // Adjust the width as needed
                    >
                      {branchDetails[key].toUpperCase().substring(0, 65)}
                    </option>
                  ))}
              </select>
              <select
                defaultValue={""}
                name="semesterName"
                onChange={handleEventChange}
                className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
              >
                <option value="" disabled>
                  Select Semester...
                </option>
                <option value="1-1">I Year I Semester</option>
                <option value="1-2">I Year II Semester</option>
                <option value="2-1">II Year I Semester</option>
                <option value="2-2">II Year II Semester</option>
                <option value="3-1">III Year I Semester</option>
                <option value="3-2">III Year II Semester</option>
                <option value="4-1">IV Year I Semester</option>
                <option value="4-2">IV Year II Semester</option>
              </select>
              {currentHours > 7 && (
                <div className="text-center pt-4 text-red-600">
                  Results will only appear from 12 AM to 7 AM
                </div>
              )}
              <div className="flex justify-center mt-[30px]">
                <button
                  type="submit"
                  className="
            text-sm md:text-lg
            px-3 py-1
            rounded
            bg-black dark:bg-gray-300
            dark:text-black text-white
            w-[100px]
            "
                  onClick={onSubmit}
                >
                  Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassResult;
