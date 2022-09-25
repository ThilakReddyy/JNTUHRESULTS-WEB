const MultiResults = ({ query }) => {


    return (
        <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
            {query.map((Result) =>
                <div key={Object.keys(Result['Results'])[0]}>
                    <table className="w-[100%]">
                        <tbody>
                            <tr>
                                <th>{Object.keys(Result['Results'])[0]} Results</th>
                            </tr>
                        </tbody>
                        <table className="w-[100%]">
                            <tbody>
                                <tr>
                                    {
                                        Object.keys(Result['DETAILS']).map((value, index) => { return <><th>{value}</th><th>{Result['DETAILS'][value]}</th></> })
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>SUBJECT_NAME</th>
                                    <th>SUBJECT_CODE</th>
                                    <th>GRADE</th>
                                    <th>CREDITS</th>
                                </tr>
                                {
                                    Object.keys(Result['Results']).map(function (exam_code) {
                                        return (
                                            Object.keys(Result['Results'][exam_code]).map(function (subject_code) {
                                                if (subject_code != 'CGPA') {
                                                    return <><tr>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_name']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_code']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_grade']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_credits']}</th>
                                                    </tr>
                                                    </>
                                                }
                                            })
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </table>
                    <br />
                </div>)
            }
        </div>)

}

export default MultiResults;