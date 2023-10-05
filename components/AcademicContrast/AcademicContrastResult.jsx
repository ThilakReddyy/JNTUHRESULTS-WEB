import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import { HiArrowSmDown } from "react-icons/hi";

// Define your functional component
const AcademicReportResult = ({ query }) => {

    //students
    const [student1, student2] = query;
    const student1Keys = Object.keys(student1["Results"])
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
    const personalDetailsData = [
        { label: 'Name', field: 'NAME' },
        { label: 'Roll No', field: 'Roll_No' },
        { label: 'College Code', field: 'COLLEGE_CODE' },
        { label: "Father's Name", field: 'FATHER_NAME' },
    ];

    return (
        <div ref={reportTemplateRef}>

            <div class="m-2  text-[40%] sm:text-[30%] md:text-[60%] lg:text-[100%]">


                <table>
                    <tbody>
                        <tr>


                            <th className=' bg-gray-200 text-[120%] md:bg-gray-300 text-center w-[100%]'>
                                Personal Details
                            </th>
                        </tr>
                    </tbody>

                </table>
                <table class="w-[100%] my-[0.5px]">
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

                <table class="w-[100%] my-[0.5px]">

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
                {/* <table className='mt-[5px]'>
                    <tbody>
                        <tr>
                            <th className=' bg-gray-200 text-[120%] md:bg-gray-300 text-center w-[100%] mt-[2px]'>
                                Performance Analysis
                            </th>
                        </tr>
                    </tbody>

                </table>
                <table class="w-[100%] my-[0.5px]">

                    <tbody>

                        <tr>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>

                                Student Attribute
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 1
                            </th>
                            <th className='w-max bg-gray-200 md:bg-gray-300'>
                                Student 2
                            </th>
                        </tr>

                    </tbody>
                </table> */}
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

export default AcademicReportResult;