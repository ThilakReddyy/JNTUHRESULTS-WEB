import { useState } from 'react';
import AcademicContrastForm from './AcademicContrastForm';
import AcademicContrastResult from './AcademicContrastResult';
import axios from 'axios';
import Loading from '../Loading/Loading';

const AcademicContrastPage = () => {

    //Alternative Urls
    const alternativeUrls = [
        "https://jntuhresultsbackend.vercel.app",
        "https://jntuhresults-web-two.vercel.app",
        "https://jntuhresults-web-three.vercel.app"
    ];

    // State variables
    const [result, setResult] = useState([{ "Details": {}, "Results": {} }, { "Details": {}, "Results": {} }]);
    const [reportForm, setReportForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [htno, setHtno] = useState(["", ""]);
    const [warning, setWarning] = useState("");

    //MapValueToRange
    function mapValueToRange() {
        const currentDate = new Date();
        const inputValue = currentDate.getDate();
        if (inputValue >= 1 && inputValue <= 5) {
            return alternativeUrls[0];
        } else if (inputValue >= 6 && inputValue <= 10) {
            return alternativeUrls[1];
        } else if (inputValue >= 11 && inputValue <= 15) {
            return alternativeUrls[2];
        } else if (inputValue >= 16 && inputValue <= 20) {
            return alternativeUrls[1];
        } else if (inputValue >= 21 && inputValue <= 25) {
            return alternativeUrls[0];
        } else if (inputValue >= 26 && inputValue <= 31) {
            return alternativeUrls[2];
        } else {
            return "Invalid input";
        }
    }

    // Function to fetch academic result
    async function fetchAcademicResult(htno, index) {

        const storedData = localStorage.getItem(htno);
        const currentTime = new Date().getTime();
        if (storedData != null) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.expiry >= currentTime) {
                setLoading(false);
                setResult((prevResult) => {
                    const updatedResult = [...prevResult];
                    updatedResult[index] = parsedData.value;
                    return updatedResult;
                })
                return;
            }
            localStorage.removeItem(htno);
        }

        //urls
        const urls = ["/api/redisdata", "https://jntuhresults.up.railway.app/api/academicresult"];
        const alternativeUrl = mapValueToRange() + "/api/academicresult";

        //actual axios functions
        try {
            for (let i = 0; i <= 1; i++) {
                const response = await axios.get(urls[i] + "?htno=" + htno, { mode: 'cors', timeout: 5000 })
                if (response.data != "Internal error" && response.status === 200 && response.data != htno + " - 500 Internal Server Error") {
                    setResult(prevResult => {
                        const updatedResult = [...prevResult]; // Create a copy of the current state
                        updatedResult[index] = response.data; // Update the index element with the new value
                        return updatedResult; // Return the updated state
                    })
                    const expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + 60);
                    const dataToStore = {
                        value: response.data,
                        expiry: expiryDate.getTime(), // Store expiry timestamp
                    };
                    localStorage.setItem(htno, JSON.stringify(dataToStore));
                    return;
                }
            }
        }
        catch (error) {
            if (error.code === 'ECONNABORTED') {

                const response = await axios.get(alternativeUrl + "?htno=" + htno);
                try {
                    if (response.data != "Internal error" && response.status === 200 && response.data != htno + " - 500 Internal Server Error") {
                        setResult(prevResult => {
                            const updatedResult = [...prevResult]; // Create a copy of the current state
                            updatedResult[index] = response.data; // Update the index element with the new value
                            return updatedResult; // Return the updated state
                        })
                        const expiryDate = new Date();
                        expiryDate.setSeconds(expiryDate.getSeconds() + 60);
                        const dataToStore = {
                            value: response.data,
                            expiry: expiryDate.getTime(), // Store expiry timestamp
                        };
                        localStorage.setItem(htno, JSON.stringify(dataToStore));
                        return;
                    }
                    else {
                        setLoading(false);
                        alert("500 - Internal Server Error");
                        setLoading(false);
                        setReportForm(true);
                        return;
                    }
                }
                catch (error) {
                    console.log(error);
                    alert("500 - Internal Server Error");
                    setLoading(false);
                    setReportForm(true);
                }


            }
            else {
                console.log(error);
                alert("500 - Internal Server Error");
                setLoading(false);
                setReportForm(true);
            }

        }
    }

    // Function to handle form submission
    const submit = async () => {
        if (htno[0].length !== 10) {
            setWarning("The Hall Ticket Should be 10 digits");
        } else {
            setWarning("");
            setLoading(true);
            setReportForm(false);

            try {
                await Promise.all([
                    fetchAcademicResult(htno[0], 0),
                    fetchAcademicResult(htno[1], 1),
                ]);
                setLoading(false);
            } catch (error) {
                alert("500 - Internal Server Error");
                setLoading(false);
                setReportForm(true);
            }

        }
    };

    return (
        <div>
            <br />
            {/* Academic contrast form */}
            <div className={`${reportForm ? 'block' : 'hidden'}`}>
                <AcademicContrastForm warning={warning} setHtno={setHtno} submit={submit} />
            </div>
            {/* Loading indicator */}
            <div className={`${loading ? 'block' : 'hidden'} `}>
                <Loading />
            </div>
            {/* Academic contrast result */}
            <div className={`${(!reportForm && !loading) ? 'block' : 'hidden'} pt-[50px]`}>
                <AcademicContrastResult query={result} />
            </div>
        </div>
    );
};

export default AcademicContrastPage;
