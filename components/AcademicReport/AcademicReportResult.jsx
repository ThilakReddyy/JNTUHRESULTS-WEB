const AcademicReportResult = ({ query }) => {
    const Results = query['Results'];
    const Details = query['Details'];

    return (
        <>

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] ">
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
                                <div className="block sm:hidden">
                                    <table>
                                        <tbody>
                                            <tr className="w-max bg-gray-200 md:bg-gray-300">
                                                <th>SUBJECT_CODE</th>
                                                <th>SUBJECT_NAME</th>
                                                <th>GRADE</th>
                                                <th>CREDITS</th>
                                            </tr>
                                            {Object.keys(Results[val]).map(function (item, index) {
                                                if (item != 'CGPA' & item != 'total' & item != 'credits') {
                                                    return <><tr>
                                                        <th>{Results[val][item]['subject_code']}</th>
                                                        <th>{Results[val][item]['subject_name']}</th>

                                                        <th>{Results[val][item]['subject_grade']}</th>
                                                        <th>{Results[val][item]['subject_credits']}</th>
                                                    </tr>
                                                    </>
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="hidden sm:block">
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
                                <table>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '75%' }}>CGPA</th>
                                            <th>{Results[val]['CGPA']}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                            </div>
                        </>
                    }
                })}
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
            </div>

        </>
    )
}

export default AcademicReportResult;