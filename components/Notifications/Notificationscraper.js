
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import notificationdata from '../../public/Notification.json'

const NotificationScraper = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(false);
                var sortedData = notificationdata.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                setResults(sortedData)
                const response = await axios.get('https://jntuhresults.up.railway.app/api/notifications', { mode: 'cors' });
                const data = await response.data;
                sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                setResults(sortedData);
            } catch (error) {
                console.error(error);
                alert("500 - Internal Server Error")
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div >
            {isLoading ? (

                <div>
                    <Loading />
                </div>
            ) : (
                <center>
                    <div className='bg-gradient-to-br from-indigo-50 via-white to-cyan-100 pt-[75px]'>
                        <h1 className="text-3xl font-semibold text-center mb-8">Notifications</h1>
                        <div class="home-links flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full ">
                            {results.map((result, index) => (
                                <a key={index} href={result.Link} target='_blank' >

                                    <div className="border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                                        <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                                            <div className="flex flex-row items-center justify-start">
                                                <span className="p-1">{result.Result_title}</span>

                                            </div>
                                        </h3>
                                        <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl"> {result.Date}</p>
                                    </div>
                                </a>
                            ))}

                        </div>
                    </div>

                </center>
            )}
        </div>
    );
};

export default NotificationScraper;
