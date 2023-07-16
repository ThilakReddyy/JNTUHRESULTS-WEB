import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassResultForm from './ClassResultForm';
import ClassResultResult from './ClassResultResult';
import Loading from '../Loading/Loading';

const AcademicReportPage = () => {
    // State variables
    const [form, setForm] = useState({
        collegeOption: "",
        semesterOption: "",
        regulationOption: "",
        degreeOption: "",
        branchOption: ""
    });

    const [result, setResult] = useState([]);
    const [reportForm, setReportForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const [len, setLen] = useState(false);
    const [updating, setUpdating] = useState(true);

    useEffect(() => {
        // Check if the result is empty and len is true
        if (result.length === 0 && len === true) {
            alert("500 - Internal Server Error");
            setLoading(false);
            setReportForm(true);
        }
    }, [result, len]);




    // Function to increase a string value by one
    const increaseStringValueByOne = (value) => {
        const incrementedValue = Number(value) + 1;
        const incrementedString = String(incrementedValue);
        return incrementedString;
    };

    //use Effect to work only between 12 am and 6 am
    useEffect(() => {
        //only works between 12 am and 6am
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        if (currentHour < 7) {

            setWarning("");
        }
        else {
            setWarning("Results are only available from 12 AM to 7 AM")
        }

    }, [])

    // Function to handle form submission
    const submit = async () => {

        //only works between 6 and 12
        var currentTime = new Date();
        var currentHour = currentTime.getHours();

        if (currentHour >= 7) {
            console.log("Result not available at this time")
            return "";
        }
        // Check if all form values are selected
        const values = Object.values(form);
        for (const value of values) {
            if (value === "") {
                setWarning("Select all the values!!!");
                return;
            }
        }

        // Reset warning and set loading state
        setWarning("");
        setLoading(true);
        setReportForm(false);

        try {
            // Generate the hallticket number
            const regularorLateral = ['1', '5'];
            const roll_last_2 = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];

            for (let reg = 0; reg < regularorLateral.length; reg++) {
                let regulation = form['regulationOption'];

                if (reg === 1) {
                    if (form['semesterOption'] === '1-1' || form['semesterOption'] === '1-2') {
                        break;
                    }
                    regulation = increaseStringValueByOne(form['regulationOption']);
                }

                const hallticket = regulation + form['collegeOption'] + regularorLateral[reg] + form['degreeOption'] + form['branchOption'];


                // Fetch data for different roll numbers
                const url = "https://jntuhresults.up.railway.app/api/classresult?semester=" + form['semesterOption'] + '&htnos=';
                for (let i = 0; i < roll_last_2.length; i++) {
                    const roll_number = hallticket + roll_last_2[i];
                    let roll_numbers = "";
                    for (let j = 0; j < 10; j++) {
                        roll_numbers += roll_number + j.toString() + ",";
                    }
                    roll_numbers = roll_numbers.slice(0, -1);
                    var storedData = localStorage.getItem(roll_number + form['semesterOption']);
                    if (storedData !== null) {
                        const parsedData = JSON.parse(storedData);
                        const currentTime = new Date().getTime();
                        if (parsedData.expiry < currentTime) {
                            console.log("dateexpired")
                            localStorage.removeItem(roll_number + form['semesterOption']);
                        } else {
                            setLoading(false);
                            setResult(prevResult => [...prevResult, ...parsedData.value]);
                            setReportForm(false);
                            console.log("takenfrom here")
                            continue;
                        }
                    }
                    var response;
                    try {
                        response = await axios.get(url + roll_numbers, { mode: 'cors' });
                    }
                    catch
                    {
                        response = await axios.get(url + roll_numbers, { mode: 'cors' });
                    }

                    if (response.status === 200) {
                        if (response.data.length === 0) {
                            setLen(true);
                            break;
                        }
                        setLoading(false);
                        setResult(prevResult => [...prevResult, ...response.data]);
                        const expiryDate = new Date();
                        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry date to 1 hour from now
                        const dataToStore = {
                            value: response.data,
                            expiry: expiryDate.getTime() // Store expiry timestamp
                        };
                        localStorage.setItem(roll_number + form['semesterOption'], JSON.stringify(dataToStore));
                    }
                }
            }
            setUpdating(false);
        } catch {
            alert("500 - Internal Server Error");
            setLoading(false);
            setReportForm(true);
        }
    };

    return (
        <div className=''>
            <br />
            {/* Render the form */}
            <div className={`${reportForm ? 'block' : 'hidden'}`}>

                <ClassResultForm
                    warning={warning}
                    submit={submit}
                    form={form}
                    setForm={setForm}
                />
            </div>

            {/* Render the loading component */}
            <div className={`${loading ? 'block' : 'hidden'}`}>
                <Loading />
            </div>

            {/* Render the result component */}
            <div className={`${!reportForm && !loading ? 'block' : 'hidden'} pt-[55px]`}>
                <ClassResultResult query={result} semester={form['semesterOption']} />
            </div>
        </div>
    );
}

export default AcademicReportPage;
