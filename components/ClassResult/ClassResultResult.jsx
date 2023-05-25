const ClassResultResult = ({ query }) => {
    return (<>
        <div className="m-2 text-[55%] sm:text-[80%] md:text-[80%] lg:text-[100%]">
            {query.map((res, index) => {
                var details = res["Details"]
                var results = res["Results"]
                return (
                    <>
                        <table className="w-[100%] mt-4">
                            <tbody>
                                <tr className='w-max bg-gray-200 text-[130%] sm:text-[100%]'>
                                    <th className="w-[28%]">Roll Number</th>
                                    <th>Student Name</th>

                                </tr>
                                <tr>
                                    <th>{details["Roll Number"]}</th>
                                    <th>{details["Student Name"]}</th>
                                </tr>

                            </tbody>

                        </table>
                        <table className="w-[100%] ">
                            <tbody>
                                <tr className='w-max bg-gray-200 sm:text-[100%]'>
                                    <th>Subject Name</th>
                                    <th>Grade FA</th>
                                    <th>Grade SA</th>
                                    <th>Subject Grade</th>
                                    <th>Subject Grade point</th>

                                </tr>

                                {results.map((val, index) => {
                                    console.log(index == 6, val)
                                    return (
                                        <>
                                            {index == 6 ? <><div className="my-[1px]"></div></> : <></>}
                                            <tr className='w-max sm:text-[100%]'>
                                                <th>{val["Subject Name"]}</th>
                                                <th>{val["Grade FA"]}</th>
                                                <th>{val["Grade SA"]}</th>
                                                <th>{val["Subject Grade"]}</th>
                                                <th>{val["Subject Grade point"]}</th>

                                            </tr>
                                        </>
                                    )
                                })}

                            </tbody>

                        </table>
                        <table className="w-[100%] ">
                            <tbody>
                                <tr >
                                    <th className="w-max text-[130%] sm:text-[100%] w-[49.1%]">CGPA</th>
                                    <th>{res["CGPA"]}</th>

                                </tr>
                                <tr>
                            
                                    <th className="w-max text-[130%] sm:text-[100%] w-[49.1%]">Result</th>
                                    <th className={res["Result"] === 'PASSED' ? 'text-green-600' : 'text-red-400'}>
                                        {res["Result"]}
                                    </th>
                                </tr>

                            </tbody>

                        </table>
                    </>
                )

            })}
        </div>
    </>)
}

export default ClassResultResult;