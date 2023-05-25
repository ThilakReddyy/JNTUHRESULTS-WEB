import { Dispatch, SetStateAction, useState } from 'react';
import AcademicReportForm from './AcademicReportForm';
import AcademicReportResult from './AcademicReportResult';
import axios from 'axios';
import Loading from '../Loading/Loading';
const AcademicReportPage = () => {
    const [result, setResult] = useState({ "Details": {}, "Results": {} });
    const [reportForm, setReportForm] = useState(true)
    const [loading, SetLoading] = useState(false);
    const submit = async () => {
        if (htno.length != 10) {
            setWarning("The Hall Ticket Should be 10 digits");
        }
        else {
            setWarning("")
            SetLoading(true);
            setReportForm(false);
            const url = "https://jntuhresults.up.railway.app/api/single?htno=" + htno
            try {
                const response = await axios.get(url, { mode: 'cors' });
                if (response.status == 200) {
                    console.log(response.data)
                    if (response.data === htno + " - 500 Internal Server Error") {
                        SetLoading(false);
                        alert("500 - Internal Server Error")
                        SetLoading(false);
                        setReportForm(true);
                        return;
                    }
                    SetLoading(false);
                    setResult(response.data)
                    setReportForm(false)
                }
            }
            catch
            {
                alert("500 - Internal Server Error")
                SetLoading(false);
                setReportForm(true);
            }
        }
    }
    const [htno, setHtno] = useState("");
    const [warning, setWarning] = useState("");
    return (<div className='pt-[75px]'>
        <br />
        <div className={`${reportForm ? 'block' : 'hidden'} md:my-[50px]`}>
            <AcademicReportForm warning={warning} setHtno={setHtno} submit={submit} />
        </div>
        <div className={loading ? 'block' : 'hidden'}>
            <Loading />
        </div>
        <div className={`${(!reportForm && !loading) ? 'block' : 'hidden'}`}>
            <AcademicReportResult query={result} />
        </div>

    </div>)
}

export default AcademicReportPage;