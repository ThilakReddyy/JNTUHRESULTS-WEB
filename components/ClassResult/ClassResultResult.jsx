const ClassResultResult = ({ query, semester }) => {
    return (
        <>
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" >

                <table className="w-[100%]">
                    <tbody>
                        <tr className="bg-gray-400 md:bg-white">
                            <th>{semester} Results</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            {query.map((value, index) => {
                const Details = value['Details'];
                const Results = value['Results'];

                return (
                    <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" key={index}>

                        <table className="w-[100%] mt-2">
                            <tbody>
                                <tr className='w-max bg-gray-200 md:bg-gray-300'>
                                    {Object.keys(Details).map((value, index) => (
                                        <th key={index}>{value}</th>
                                    ))}
                                </tr>
                                <tr>
                                    {Object.keys(Details).map((value, index) => (
                                        <th key={index}>{Details[value]}</th>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        {Object.keys(Results).map((val) => {
                            if (val !== 'Total') {
                                return (
                                    <div key={val} id='1'>


                                        <table>
                                            <tbody>
                                                <tr className="w-max bg-gray-200 md:bg-gray-300">
                                                    <th>SUBJECT_CODE</th>
                                                    <th>SUBJECT_NAME</th>
                                                    <th>GRADE</th>
                                                    <th>CREDITS</th>
                                                </tr>
                                                {Object.keys(Results[val]).map((item, index) => {
                                                    if (item !== 'CGPA' && item !== 'total' && item !== 'credits') {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{Results[val][item]['subject_code']}</th>
                                                                <th>{Results[val][item]['subject_name']}</th>
                                                                <th>{Results[val][item]['subject_grade']}</th>
                                                                <th>{Results[val][item]['subject_credits']}</th>
                                                            </tr>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </tbody>
                                        </table>
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
                                );
                            }
                            return null;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default ClassResultResult;
