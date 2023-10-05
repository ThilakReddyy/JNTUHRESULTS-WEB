// Import necessary modules and components
import React, { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { HiArrowSmDown } from "react-icons/hi";

// Defining the functional component
const AcademicContrastResult = ({ query }) => {

    // Destructure the 'query' prop into two student objects
    const [student1, student2] = query;

    // State to hold performance analysis data
    const [performanceAnalysis, setPerformanceAnalysis] = useState([{}, {}]);

    // Extract keys from both students' results
    const student1Keys = Object.keys(student1["Results"])

    // Determine the semester keys based on which student has more
    const student2Keys = Object.keys(student2["Results"])
    const semesterkeys = student1Keys.length > student2Keys.length ? student1Keys : student2Keys

    // Reference for the PDF content
    const reportTemplateRef = useRef(null);

    // Function to export PDF
    const exportPdf = async () => {

        //Warning : Do Not copy this code!!!

        const content = reportTemplateRef.current;
        console.log('Content dimensions:', content.offsetWidth, content.offsetHeight);


        // Create a new PDF document
        const doc = new jsPDF({

            format: [content.offsetWidth, content.offsetHeight + 20], // or other page sizes like 'letter'
            orientation: 'potrait', // or 'landscape'
            unit: 'px',
            marginLeft: 10, // Adjust margins as needed
            marginTop: 10,
            marginRight: 10,
            marginBottom: 10,
        });

        // Generate the PDF from HTML content
        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                await doc.save(student1["Details"]["Roll_No"] + student2["Details"]["Roll_No"]);
            },

        });

    }

    // Data for personal details table
    const personalDetailsData = [
        { label: 'Name', field: 'NAME' },
        { label: 'Roll No', field: 'Roll_No' },
        { label: 'College Code', field: 'COLLEGE_CODE' },
        { label: "Father's Name", field: 'FATHER_NAME' },
    ];

    // Keys for performance analysis table
    const performanceAnalysisKeys = ["Total CGPA", "Percentage", "Credits Obtained", "Backlogs"]

    // Calculate performance analysis data when 'query' changes
    useEffect(() => {
        setPerformanceAnalysis(query.map((student) => {
            //Total
            const total = student["Results"]["Total"] || "-";

            //Calculate total credits
            const credits = Object.values(student["Results"]).reduce((total, semester) => {
                return total + Object.values(semester).reduce((semesterTotal, subject) => {
                    const credit = subject["subject_credits"];
                    return semesterTotal + (credit !== undefined ? Number(credit) : 0);
                }, 0);
            }, 0);

            //Calculate total backlogs
            const backlogs = Object.values(student["Results"]).reduce(
                (totalBacklogs, semester) =>
                    totalBacklogs +
                    Object.values(semester).filter(
                        (subject) => ["F", "Ab", "-"].includes(subject["subject_grade"])
                    ).length, 0
            );

            //Calculate percentage
            const percentage = (total != "-") ? ((total - 0.5) * 10).toFixed(2) : "-";

            return { "Total CGPA": total, Percentage: percentage, "Credits Obtained": credits, Backlogs: backlogs };
        }))

    }, [query]); // Watch for changes in the 'query' variable


    return (
        <div ref={reportTemplateRef}>

            <div className="m-2  text-[40%] sm:text-[30%] md:text-[60%] lg:text-[100%]">


                <table>
                    <tbody>
                        <tr>


                            <th className=' bg-gray-200 text-[120%] md:bg-gray-300 text-center w-[100%]'>
                                Personal Details
                            </th>
                        </tr>
                    </tbody>

                </table>
                <table className="w-[100%] my-[0.5px]">
                    <tbody>

                        <tr>
                            <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>
                                Student Attribute
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 1
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 2
                            </th>
                        </tr>
                        {
                            personalDetailsData.map((data) => (
                                <tr key={data.field}>
                                    <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>
                                        {data.label}
                                    </th>
                                    {query.map((student, index) => (
                                        <td key={index} className="w-max text-center text-black">
                                            <div>{student['Details'][data.field]}</div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
                <table className='mt-[5px]'>
                    <tbody>
                        <tr>
                            <th className=' bg-gray-200 text-[120%] md:bg-gray-300 text-center w-[100%] mt-[2px]'>
                                Academic Results
                            </th>
                        </tr>
                    </tbody>

                </table>

                <table className="w-[100%] my-[0.5px]">

                    <tbody>

                        <tr>
                            <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>

                                Student Attribute
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 1
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 2
                            </th>
                        </tr>
                        {
                            semesterkeys.map((data) => (
                                <tr key={data}>
                                    <th className='w-max bg-gray-200 md:bg-gray-300'>
                                        {data} CGPA | CREDITS
                                    </th>
                                    {data !== "Total" &&
                                        query.map((student, index) => {
                                            const results = student["Results"][data];
                                            if (results && results["credits"] !== undefined) {
                                                return (
                                                    <td key={index} className="w-max text-center text-black">
                                                        <div>{results["CGPA"]} | {results["credits"]}</div>
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td key={index} className="w-max text-center text-black">
                                                        <div>-</div>
                                                    </td>
                                                );
                                            }
                                        })}
                                    {data === "Total" &&
                                        query.map((student, index) => (
                                            <td key={index} className="w-max text-center text-black">
                                                <div>{student["Results"][data]}</div>
                                            </td>
                                        ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <table className='mt-[15px]'>
                    <tbody>
                        <tr>
                            <th className=' bg-gray-200 text-[120%] md:bg-gray-300 text-center w-[100%] mt-[2px]'>
                                Performance Analysis
                            </th>
                        </tr>
                    </tbody>

                </table>
                <table className="w-[100%] my-[0.5px]">
                    <tbody>
                        <tr>
                            <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>

                                Student Attribute
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 1
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 2
                            </th>
                        </tr>
                        {
                            performanceAnalysisKeys.map((Key) => (
                                <tr key={Key}>
                                    <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>
                                        {Key}
                                    </th>
                                    {
                                        performanceAnalysis.map((student, index) => (
                                            <td key={index} className="w-max text-center text-black">
                                                <div>{student[Key]}</div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                            // Object.keys(performanceAnalysis).map((dataKeys) => (
                            //     <tr key={data.field}>
                            //         <th className='w-max bg-gray-200 md:bg-gray-300 w-[33%]'>
                            //             {dataKeys}
                            //         </th>
                            //         {query.map((student, index) => (
                            //             <td key={index} className="w-max text-center text-black">
                            //                 <div>{student['Details'][data.field]}</div>
                            //             </td>
                            //         ))}
                            //     </tr>
                            // ))
                        }


                    </tbody>
                </table>
            </div >
            <div className="fixed bottom-4 right-4">
                {/* Adjust the bottom and right values as needed for positioning */}
                <button
                    className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600"
                    onClick={exportPdf}
                >
                    <HiArrowSmDown size={20} />
                </button>
            </div>

        </div>
    )
}

export default AcademicContrastResult;