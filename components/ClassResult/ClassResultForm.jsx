import React, { useEffect, useState } from "react";
import data from './colleges';
import Footer from "../Footer/Footer";

const ClassReportForm = ({ setSchoolCode, warning, submit }) => {

    const [collegeOption, setCollegeOption] = useState(null);
    const [semesterOption, setSemesterOption] = useState(null);
    const [regulationOption, setRegulationOption] = useState(null);
    const [degreeOption, setDegreeOption] = useState(null);
    const [branchOption, setBranchOption] = useState(null);
    const [fontSize, setFontSize] = useState(10);

    const handleSetCollegeOption = (event) => {
        setCollegeOption(event.target.value);

    }

    const handleSemesterChange = (event) => {
        setSemesterOption(event.target.value);
    };

    const handleRegulationChange = (event) => {
        setRegulationOption(event.target.value)
        console.log(collegeOption, degreeOption, semesterOption, regulationOption)
    };

    const handleDegreeOptionChange = (event) => {
        setDegreeOption(event.target.value)
    }

    const handleBranchOptionChange = (event) => {
        setBranchOption(event.target.value)
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
            <div className="w-[75%] mx-[12.5%] md:w-[66%] md:mx-[17%]">
                <div className="mx-[0.25%] border-black shadow-2xl border-[3px] rounded-md">
                    <center className="py-[35px]">

                        <h2 className="leading-normal font-semibold mx-1 text-[1xl] sm:text-2xl">
                            Class Performance
                        </h2>
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
                                value={degreeOption}
                                onChange={handleDegreeOptionChange}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center"
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the Degree...
                                </option>
                                <option value="A">B.Tech</option>
                                <option value="R">B.Pharmacy</option>
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
                            <select
                                value={branchOption}
                                onChange={handleBranchOptionChange}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center"
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the Branch Name...
                                </option>
                                <option value="21">Aeronautical Engineering</option>
                                <option value="11">BioMedical Engineering</option>
                                <option value="08">Chemical Engineering</option>
                                <option value="01">Civil Engineering</option>
                                <option value="56">Computer Engineering (Software Engineering) Technology</option>
                                <option value="05">Computer Science &amp; Engineering</option>
                                <option value="66">Computer Science and Engineering (Artificial Intelligence and Machine Learning)</option>
                                <option value="62">Computer Science and Engineering (Cyber Security) Technology</option>
                                <option value="67">Computer Science and Engineering (Datascience)</option>
                                <option value="69">Computer Science and Engineering (IoT)</option>
                                <option value="02">Electrical &amp; Electronics Engineering</option>
                                <option value="04">Electronics &amp; Communication Engineering</option>
                                <option value="19">Electronics &amp; Computer Engineering</option>
                                <option value="13">Electronics &amp; Control Engineering</option>
                                <option value="10">Electronics &amp; Instrumentation Engineering</option>
                                <option value="12">Information Technology</option>
                                <option value="22">Instrumentation &amp; Control Engineering</option>
                                <option value="03">Mechanical Engineering</option>
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
