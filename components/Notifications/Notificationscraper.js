import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import notificationdata from '../../public/Notification.json'
import { AiOutlineShareAlt } from "react-icons/ai"
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { RiWhatsappLine } from "react-icons/ri";

const NotificationScraper = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    function shareUrl(link, title) {
        if (!navigator.share) return;

        const sharedText = `*Check out the Results!* \n\n ${title}\n\n\n`;

        navigator.share({
            title: 'Check out this website!',
            text: sharedText,
            url: link,
        })
            .then(() => console.log('Successfully shared!'))
            .catch((error) => console.log('Error sharing:', error));
    }

    const monthMap = {
        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(false);
                var sortedData = notificationdata.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                setResults(sortedData)
                // const response = await axios.get('https://jntuhresults.up.railway.app/api/notifications', { mode: 'cors' });
                // const data = await response.data;
                // sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                // setResults(sortedData);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = debounce((event) => {
        setSearchQuery(event.target.value);
    }, 300);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const filteredResults = results.filter((result) => {
        const title = result.Result_title.toLowerCase();
        const yearMatch =
            selectedYear === '' || result.Date.includes(selectedYear);
        return title.includes(searchQuery.toLowerCase()) && yearMatch;
    });

    return (
        <div key="notification">
            {isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>

                    <div className=' bg-gradient-to-br from-indigo-50 via-white to-cyan-100 pt-[75px]    hidden md:block font-interer'>
                        <div className='max-w-[800px] justify-center mx-auto'>

                            <h1 className="text-3xl font-semibold text-center mb-8 ">Notifications</h1>
                            <div className='w-[75%] inline-block '>
                                <input id="searchkey" placeholder="I Year II semester"
                                    onChange={handleSearch} className='border-[2px] border-solid border-[#bfbcbc] pl-[30px] w-[100%] h-[35px] ml-[45px]' />
                            </div>
                            <div className='inline-block float-right mr-[50px]  z-5 '>
                                <select className='h-[35px] w-[108px] font-[16px] border-[2px] border-solid  border-[#bfbcbc]' onChange={handleYearChange}
                                    value={selectedYear}>
                                    <option value='' disabled selected>
                                        Exam year
                                    </option>
                                    <option >
                                        2023
                                    </option>
                                    <option >
                                        2022
                                    </option>
                                    <option >
                                        2021
                                    </option>
                                    <option >
                                        2020
                                    </option>
                                    <option >
                                        2019
                                    </option>
                                    <option >
                                        2018
                                    </option>
                                </select>
                            </div>


                            <div className="home-links flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full text-center  justify-center mx-auto">
                                {filteredResults.map((result, index) => (
                                    <a key={index} href={result.Link} target='_blank' >

                                        <div className="border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                                            <h3 className="group-hover:text-black text-lg sm:text-xl font-bold">
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
                    </div>
                    <h1 className="text-3xl font-semibold text-center pt-[75px] mb-8 font-interer md:hidden">Notifications</h1>
                    {results.map((result, index) => (
                        <div key={index} className='bg-[white] text-left p-[20px] mb-[3px] pb-[5px] md:hidden'>
                            <h3 KEY={index} className="group-hover:text-black  font-bold ">
                                <a href={result.Link} target="_blank">
                                    <div className=" justify-start font-interer  text-base">
                                        JNTUH {result.Result_title}
                                    </div>
                                </a>
                                <div className='text-xs text-gray-700 font-semibold flex  py-2 font-interer'>
                                    <span>
                                        {(() => {
                                            const [day, month, year] = result.Date.split('-');
                                            const monthAbbreviation = month.substring(0, 3).toUpperCase();
                                            const monthIndex = monthMap[monthAbbreviation];
                                            const formattedDate = new Date(year, monthIndex, day).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });

                                            return formattedDate;

                                        })()}
                                    </span>



                                    <div className='ml-auto flex '>

                                        <Link className='px-[5px]' target='_blank' href={`https://api.whatsapp.com/send?text=*Check out the Results!* \n\n ${result.Result_title} \n\n${result.Link}\n`} >
                                            <RiWhatsappLine size={17} />
                                        </Link>

                                        <span className="px-5" onClick={() => shareUrl(result.Link, result.Result_title)}>
                                            <AiOutlineShareAlt size={18} />
                                        </span>


                                    </div>
                                </div>
                            </h3>
                        </div>

                    ))}

                </div>
            )}
        </div>
    );
};

export default NotificationScraper;
