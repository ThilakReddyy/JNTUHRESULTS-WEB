import { useState } from 'react';
import AcademicReportForm from './AcademicReportForm';
import AcademicReportResult from './AcademicReportResult';
import axios from 'axios';
import Loading from '../Loading/Loading';

const AcademicReportPage = ({ backlog }) => {

    // State variables
    const [result, setResult] = useState({ "Details": {}, "Results": {} });
    const [reportForm, setReportForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [htno, setHtno] = useState("");
    const [warning, setWarning] = useState("");

    function mapValueToRange() {
        const alternativeurls = ["https://jntuhresultsbackend.vercel.app", "https://jntuhresults-web-two.vercel.app", "https://jntuhresults-web-three.vercel.app"]
        const currentDate = new Date();
        const inputValue = currentDate.getDate();
        if (inputValue >= 1 && inputValue <= 5) {
            return alternativeurls[0];
        } else if (inputValue >= 6 && inputValue <= 10) {
            return alternativeurls[1];
        } else if (inputValue >= 11 && inputValue <= 15) {
            return alternativeurls[2];
        } else if (inputValue >= 16 && inputValue <= 20) {
            return alternativeurls[1];
        } else if (inputValue >= 21 && inputValue <= 25) {
            return alternativeurls[0];
        } else if (inputValue >= 26 && inputValue <= 31) {
            return alternativeurls[2];
        } else {
            return "Invalid input";
        }
    }

    // Function to fetch academic result
    async function fetchAcademicResult(htno) {

        const response = await axios.get("/api/redisdata?htno=" + htno);
        if (response.data != "Internal error") {
            setLoading(false);
            setResult(response.data);
            setReportForm(false);
            const expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + 30); // Set expiry date to 30 seconds from now

            const dataToStore = {
                value: response.data,
                expiry: expiryDate.getTime(), // Store expiry timestamp
            };
            localStorage.setItem(htno, JSON.stringify(dataToStore));
            return;
        }
        //const url = "/api/academicresult?htno=" + htno;
        const url = "https://jntuhresults.up.railway.app/api/academicresult?htno=" + htno;
        try {
            //const response = await axios.get(url);
            const response = await axios.get(url, { mode: 'cors', timeout: 5000, });
            if (response.status === 200) {
                console.log(response.data);
                if (response.data === htno + " - 500 Internal Server Error") {
                    setLoading(false);
                    alert("500 - Internal Server Error");
                    setLoading(false);
                    setReportForm(true);
                    return;
                }
                setLoading(false);
                setResult(response.data);
                setReportForm(false);

                const expiryDate = new Date();
                expiryDate.setSeconds(expiryDate.getSeconds() + 30); // Set expiry date to 30 seconds from now

                const dataToStore = {
                    value: response.data,
                    expiry: expiryDate.getTime(), // Store expiry timestamp
                };
                localStorage.setItem(htno, JSON.stringify(dataToStore));

            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {

                const alternativeUrl = mapValueToRange() + "/api/academicresult?htno=" + htno;
                try {
                    //const response = await axios.get(url);
                    const response = await axios.get(alternativeUrl);
                    if (response.status === 200) {
                        console.log(response.data);
                        if (response.data === htno + " - 500 Internal Server Error") {
                            setLoading(false);
                            alert("500 - Internal Server Error");
                            setLoading(false);
                            setReportForm(true);
                            return;
                        }
                        setLoading(false);
                        setResult(response.data);
                        setReportForm(false);

                        const expiryDate = new Date();
                        expiryDate.setSeconds(expiryDate.getSeconds() + 30); // Set expiry date to 30 seconds from now

                        const dataToStore = {
                            value: response.data,
                            expiry: expiryDate.getTime(), // Store expiry timestamp
                        };
                        localStorage.setItem(htno, JSON.stringify(dataToStore));

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
        if (htno.length !== 10) {
            setWarning("The Hall Ticket Should be 10 digits");
        } else {
            setWarning("");
            setLoading(true);
            setReportForm(false);

            try {
                const storedData = localStorage.getItem(htno);

                if (storedData === null) {
                    await fetchAcademicResult(htno);
                } else {
                    const parsedData = JSON.parse(storedData);
                    const currentTime = new Date().getTime();
                    if (parsedData.expiry < currentTime) {
                        localStorage.removeItem(htno);
                        setLoading(false);
                        setResult(parsedData.value);
                        setReportForm(false);

                        await fetchAcademicResult(htno);
                    } else {
                        setLoading(false);
                        setResult(parsedData.value);
                        setReportForm(false);
                    }

                }
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
            {/* Academic report form */}
            <div className={`${reportForm ? 'block' : 'hidden'}`}>
                <AcademicReportForm warning={warning} setHtno={setHtno} submit={submit} backlog={backlog} />
            </div>
            {/* Loading indicator */}
            <div className={`${loading ? 'block' : 'hidden'} `}>
                <Loading />
            </div>
            {/* Academic report result */}
            <div className={`${(!reportForm && !loading) ? 'block' : 'hidden'} pt-[50px]`}>
                <AcademicReportResult query={result} backlog={backlog} />
            </div>
        </div>
    );
};

export default AcademicReportPage;
