import React, { useEffect, useState } from "react";
import data from './colleges';
import Footer from "../Footer/Footer";

const ClassReportForm = ({ setSchoolCode, warning, submit }) => {

    const [collegeOption, setCollegeOption] = useState(null);
    const [semesterOption, setSemesterOption] = useState(null);
    const [regulationOption, setRegulationOption] = useState(null);
    const [fontSize, setFontSize] = useState(10);

    const handleSetCollegeOption = (event) => {
        setCollegeOption(event.target.value);

    }

    const handleSemesterChange = (event) => {
        setSemesterOption(event.target.value);
    };

    const handleRegulationChange = (event) => {
        setRegulationOption(event.target.value)
        console.log(collegeOption, semesterOption, regulationOption)
    }
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newFontSize = width >= 768 ? 12 : 10;
            setFontSize(newFontSize);
        };

        handleResize(); // Set initial font size based on current width

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <>
            <div className="w-[66%] mx-[17%]">
                <div className="mx-[0.25%] border-black shadow-2xl border-[3px] rounded-md">
                    <center className="py-[35px]">
                        <br />
                        <h2 className="leading-normal font-semibold mx-1 text-[1xl] sm:text-2xl">
                            Class Performance
                        </h2>
                        <br />
                        <br />
                        <div className="px-[10%] md:px-[30%] text-xs ">
                            <select
                                value={collegeOption}
                                onChange={handleSetCollegeOption}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center "
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the College Name...
                                </option>
                                {
                                    Object.keys(data)
                                        .sort((a, b) => data[a].toUpperCase().localeCompare(data[b].toUpperCase()))
                                        .map((key) => {
                                            return (
                                                <option
                                                    value={key} key={key}
                                                    style={{ width: '10px' }} // Adjust the width as needed
                                                >
                                                    {data[key].toUpperCase()}
                                                </option>
                                            );
                                        })
                                }

                            </select>

                            <select
                                value={semesterOption}
                                onChange={handleSemesterChange}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center"
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the Semester...
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
                            <select
                                value={regulationOption}
                                onChange={handleRegulationChange}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center"
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the Year...
                                </option>
                                <option value="18">2018-2022</option>
                                <option value="19">2019-2023</option>
                                <option value="20">2020-2024</option>
                                <option value="21">2021-2025</option>
                                <option value="22">2022-2026</option>
                                <option value="23">2023-2027</option>
                            </select>
                        </div>
                        <br />
                        <p className="text-[60%] text-red-600 ">{warning}</p>
                        <br />

                        <button
                            type="submit"
                            onClick={submit}
                            className="w-[100px] text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded text-sm hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-400 py-1.5 px-3 sm:w-auto sm:text-base"
                            style={{
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                letterSpacing: "0.025em",
                                transition: "background 0.3s ease",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Results
                        </button>

                        <br />
                        <br />
                    </center>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default ClassReportForm;
