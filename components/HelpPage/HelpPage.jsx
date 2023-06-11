import Link from 'next/link';
const HelpPage = () => {
    return (
        <>
            <div className='__variable_0ec1f4'>
                <div className="md:block h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
                    <div className="  md:flex justify-center  p-8 pt-[100px] ">
                        <center className='md:flex font-montser text-[28px] md:text-[50px] lg:text-[70px] '>
                            Help Center
                        </center>
                        <br />

                    </div>
                    <center>

                        <div className="">
                            <div className="home-links flex flex-wrap items-center justify-around max-w-4xl md:mt-6  sm:w-full">
                                <a href="https://forms.gle/DBntbaVFyznfbpmd9" target="_blank">

                                    <div className="border  hover:drop-shadow-sm group text-black border-slate-800 md:border-gray-100 shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                                        <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                                            <div className="flex flex-row items-center justify-start">
                                                <span className="p-1 text-black">Suggestion/ Feedback</span>
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </h3>
                                        <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl"> Share us the feedback or suggestion to help us in Enhancing Your Experience!.</p>
                                    </div>
                                </a>


                                <Link href="/faq">

                                    <div className="border  hover:drop-shadow-sm group text-black border-slate-800 md:border-gray-100 shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                                        <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                                            <div className="flex flex-row items-center justify-start">
                                                <span className="p-1 text-black">FAQ</span>
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </h3>
                                        <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl"> The most Frequently asked questions are here.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </>
    )
}


export default HelpPage