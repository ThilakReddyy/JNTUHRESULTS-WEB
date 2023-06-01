
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
// import jsonData from '../api/Notification.json';

const NotificationScraper = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Notification.json');
                const data = await response.json();
                setIsLoading(false);
                setResults(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={` pt-[75px]`}>
            {isLoading ? (

                <div >
                    <Loading />
                </div>
            ) : (
                <center>
                    <div className="bg-gray-100 min-h-screen">
                        <div className="container mx-auto py-8 px-4">
                            <h1 className="text-3xl font-semibold text-center mb-8">Notifications</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {results.map((result, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-lg shadow-lg "
                                    >
                                        <h2 className="text-lg font-bold mb-4">{result.Result_title}</h2>
                                        <p className="text-gray-600 mb-4">Date: {result.Date}</p>
                                        <a
                                            href={result.Link}
                                            className="text-blue-500 hover:text-blue-700 underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Results
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </center>
            )}
        </div>
    );
};

export default NotificationScraper;
