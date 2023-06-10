import React, { useEffect, useState } from "react";
import data from './colleges';
import Footer from "../Footer/Footer";
import branches from './branches';
import Banner from "../Footer/Banner";
const ClassReportForm = ({ warning, submit, form, setForm }) => {
    const [fontSize, setFontSize] = useState(10);

    const handleSetCollegeOption = (event) => {

        setForm(prevForm => ({
            ...prevForm,
            collegeOption: event.target.value
        }));
    }

    const handleSemesterChange = (event) => {
        setForm(prevForm => ({
            ...prevForm,
            semesterOption: event.target.value
        }));
    };

    const handleRegulationChange = (event) => {
        setForm(prevForm => ({
            ...prevForm,
            regulationOption: event.target.value
        }));
    };

    const handleDegreeOptionChange = (event) => {
        setForm(prevForm => ({
            ...prevForm,
            degreeOption: event.target.value
        }));
    }

    const handleBranchOptionChange = (event) => {
        setForm(prevForm => ({
            ...prevForm,
            branchOption: event.target.value
        }));
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


    const [banner, setBanner] = useState(true);
    return (
        <div className={`${banner ? 'ms:h-auto' : 'ms:h-screen'} ms:h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 md:py-[150px] pt-[75px]`}>
            <div className="w-[75%] mx-[12.5%] md:w-[66%] md:mx-[17%]">
                <div className="mx-[0.25%] border-black shadow-2xl border-[3px] rounded-md">
                    <center className="py-[35px]">

                        <h2 className="leading-normal font-semibold mx-1 text-[1xl] sm:text-2xl">
                            Class Performance
                        </h2>
                        <br />
                        <div className="px-[10%] md:px-[30%] text-xs ">
                            {/* College Name */}
                            <select
                                defaultValue={form['collegeOption']}
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

                            {/* Degree Name */}
                            <select
                                defaultValue={form['degreeOption']}
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
                                value={form['regulationOption']}
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
                                defaultValue={form['branchOption']}
                                onChange={handleBranchOptionChange}
                                className="w-[100%] py-[4px] border border-[#CCCCCC] mt-[5px] rounded-sm h-[35px] text-center"
                                style={{ fontSize: `${fontSize}px`, color: '#808080' }}
                            >
                                <option value="" disabled selected>
                                    Enter the Branch Name...
                                </option>
                                {branches.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <select
                                defaultValue={form['semesterOption']}
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

                    </center>
                </div>
            </div >
            <Footer />
            <div className={`${banner ? 'block' : 'hidden'}`}>
                <Banner setBanner={setBanner} />
            </div>

        </div>
    );
};

export default ClassReportForm;
