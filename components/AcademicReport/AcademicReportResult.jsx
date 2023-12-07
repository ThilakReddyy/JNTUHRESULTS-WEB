import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { HiArrowSmDown } from "react-icons/hi";

// Define your functional component
const AcademicReportResult = ({ query, backlog }) => {

    // Destructure the query object
    const [Results, setResults] = useState("");
    const [backlogCount, setBacklogCount] = useState(0);
    const Details = query['Details'];

    // Reference for the PDF content
    const reportTemplateRef = useRef(null);

    useEffect(() => {
        var result = {};
        var backlogs = 0;
        if (backlog) {
            Object.keys(query['Results']).map((semester) => {
                const semesterData = query['Results'][semester];

                if (semesterData['CGPA'] === undefined) {
                    result[semester] = {}

                    Object.keys(semesterData).map((subjectkey) => {
                        const subjectGrade = semesterData[subjectkey]['subject_grade'];
                        if (["F", "Ab", "-"].includes(subjectGrade)) {
                            result[semester][subjectkey] = semesterData[subjectkey];
                            backlogs += 1;
                        }
                    })
                }

            })
            setBacklogCount(backlogs);
            setResults(result);
        }
        else {
            setResults(query['Results']);
        }
    }, [backlog,query]);

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
                await doc.save(Details["Roll_No"]);
            },

        });

    }


    return (
        <>
            <div ref={reportTemplateRef} >
                <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]" >

                    <table className="w-[100%] my-2">
                        <tbody>
                            <tr className='w-max bg-gray-200 md:bg-gray-300'>
                                {Object.keys(Details).map((value, index) => { return <><th>{value}</th></> })}

                            </tr>
                            <tr>
                                {Object.keys(Details).map((value, index) => { return <><th>{Details[value]}</th></> })}
                            </tr>
                        </tbody>
                    </table>


                    {Object.keys(Results).map((val) => {
                        if (val != 'Total') {
                            return <>
                                <div id='1'>
                                    <table className="w-[100%]">
                                        <tbody>
                                            <tr className="bg-gray-400 md:bg-white">
                                                <th>{val} Results</th>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div>
                                        <table>
                                            <tbody>
                                                <tr className="w-max bg-gray-200 md:bg-gray-300">
                                                    <th>SUBJECT_CODE</th>
                                                    <th>SUBJECT_NAME</th>
                                                    <th>INTERNAL</th>
                                                    <th>EXTERNAL</th>
                                                    <th>TOTAL</th>
                                                    <th>GRADE</th>
                                                    <th>CREDITS</th>
                                                </tr>
                                                {Object.keys(Results[val]).map(function (item, index) {
                                                    if (item != 'CGPA' & item != 'total' & item != 'credits') {
                                                        return <><tr>
                                                            <th>{Results[val][item]['subject_code']}</th>
                                                            <th>{Results[val][item]['subject_name']}</th>
                                                            <th>{Results[val][item]['subject_internal']}</th>
                                                            <th>{Results[val][item]['subject_external']}</th>
                                                            <th>{Results[val][item]['subject_total']}</th>
                                                            <th>{Results[val][item]['subject_grade']}</th>
                                                            <th>{Results[val][item]['subject_credits']}</th>
                                                        </tr>
                                                        </>
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {backlog == false &&
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '75%' }}>CGPA</th>
                                                    <th>{Results[val]['CGPA']}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    <br />
                                </div>
                            </>
                        }
                    })}

                    {backlog == false &&
                        <div className='Total'>
                            <table>
                                <tbody >
                                    <tr>
                                        <th className="py-2" style={{ width: '75%' }}>Total CGPA</th>
                                        <th>{Results['Total']}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    }
                    {
                        (backlog == true && backlogCount == 0) &&
                        <table className='w-[100%] my-2'>
                            <tbody>
                                <tr className='w-max text-center md:bg-gray-300'>
                                    <th>

                                        NO BACKLOGS
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <div className="fixed bottom-4 right-4">
                {/* Adjust the bottom and right values as needed for positioning */}
                <button
                    className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600"
                    onClick={exportPdf}
                >
                    <HiArrowSmDown size={20} />
                </button>
            </div>

        </>
    )
}

export default AcademicReportResult;
