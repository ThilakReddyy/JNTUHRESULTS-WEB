import { useState } from 'react';
import ClassResultForm from './ClassResultForm';
import ClassResultResult from './ClassResultResult';
import axios from 'axios';
import Loading from '../Loading/Loading';
const AcademicReportPage = () => {
    const [result, setResult] = useState([]);
    const [reportForm, setReportForm] = useState(true)
    const [loading, SetLoading] = useState(false);
    const submit = async () => {
        if (schoolcode.length == 0) {
            setWarning("The Feature is under development!!!");
        }
        else {
            setWarning("The Feature is under development!!!")
            // SetLoading(true);
            // setReportForm(false);
            // try {
            //     const url = "https://ts-ssc-results.up.railway.app/getresultbycollegecode/?college_code=" + schoolcode.substr(2)
            //     const response = await axios.get(url, { mode: 'cors' });

            //     if (response.status == 500) {
            //         setResult("unkNOWN dATA")
            //     }
            //     else if (response.status == 400) {
            //         setResult("unkNOWN dATA")
            //     }
            //     else {

            //         SetLoading(false);
            //         setResult(response.data)
            //         setReportForm(false)

            //     }

            // }
            // catch
            // {
            //     setResult("unkNOWN dATA")
            // }

        }
    }
    const [schoolcode, setSchoolCode] = useState("");
    const [warning, setWarning] = useState("The Feature is under development!!!");
    return (<div className='pt-[75px]'>
        <br />
        <div className={`${reportForm ? 'block' : 'hidden'} md:my-[50px]`}>
            <ClassResultForm warning={warning} setSchoolCode={setSchoolCode} submit={submit} />
        </div>
        <div className={loading ? 'block' : 'hidden'}>
            <Loading />
        </div>

        <div className={`${(!reportForm && !loading) ? 'block' : 'hidden'}`}>
            <ClassResultResult query={result} />
        </div>

    </div>)
}

export default AcademicReportPage;
