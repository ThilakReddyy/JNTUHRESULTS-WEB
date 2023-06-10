import React from 'react';

const Faq = () => {
    return (
        <>

            <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 pt-[75px]">
                <div className="max-w-7xl mx-auto text-justify	">

                    <div className="lg:text-center">
                        <center>
                            <h2 className="text-2xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                                Frequently Asked Questions
                            </h2>
                        </center>
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-1  gap-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    1.How does this website work?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    The JNTUHRESULTS project functions as when a user enters their roll number, the website asynchronously sends requests to the JNTUH server, retrieving the results for all regular and supplementary exams across all semesters associated with the given roll number. Using BeautifulSoup, the backend parses the HTML content of the responses to extract the relevant result information. An algorithm then combines the results and calculates the Cumulative Grade Point Average (CGPA) for the student. This entire process is optimized to be completed in less than 2 seconds, allowing the JNTUHRESULTS-vercel website to swiftly provide comprehensive results to the user.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    2.How do I access my grades for all semesters?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    To access your grades for all semesters, enter your roll number in the provided inbox in the academic result page and click on the &quot;Results&quot; button. The results of all your semesters will be displayed.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    3.What is the purpose of the backend in the JNTUHRESULTS-vercel project?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    The backend serves as the backbone of the JNTUHRESULTS-vercel project. It is responsible for fetching and parsing the results of both individual students and multiple classmates. By making requests to the JNTUH website and utilizing BeautifulSoup, the backend extracts the required data and provides it to the frontend.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    4.How does the backend fetch the results from the JNTUH website?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    Since the JNTUH website does not provide an API or authentication for result requests, the backend sends requests to the website and captures the responses. It then uses BeautifulSoup, a Python library for parsing HTML, to extract the relevant result information from the HTML response.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    5.What technologies are used to develop the website?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    The website is built using Next.js. Next.js enables the creation of React-based web applications with server-side rendering and the generation of static websites. The website is hosted on Vercel, which provides fast deployments served from the edge.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    6.How can I report a bug or ask for help?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    If you encounter any issues or have questions regarding the website, you can contact the developer via <a className="text-#0000FF" href="mailto:thilakreddypothuganti@gmail.com">email</a> or fill the issue in the <a className="text-#0000FF" target='_blank' href="https://forms.gle/cftCZ193nSWzjXTp7"></a>Google Forms. Additionally, if you find a bug, you can submit an issue on the project&apos;s GitHub repository. You&apos;re also welcome to contribute by submitting pull requests with bug fixes or changes to the develop branch.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    7.What are the available API endpoints for fetching results?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    8.There are two API endpoints provided by the backend:
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-base leading-6 text-gray-500">
                                    <li>
                                        <a href="https://jntuhresults.up.railway.app/api/academicresult?htno=18E51A0479" target='_blank' className="font-medium">/api/academicresult?htno=Roll_no</a>: Fetches results for a single student using their roll number.
                                    </li>
                                    <li>
                                        <span className="font-medium">/api/classresult?htnos=multiple_htnos_seperate_by_ commas&semester=semester_code</span>: Fetches results for multiple students within a given range of roll numbers and semester code.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    9.Can I suggest ideas for new website tools or features?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    Yes, you can message me with your ideas for small website tools that you can&apos;t find online or any other features you&apos;d like to see.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    10.How can I report a bug or ask for help related to the backend?
                                </h3>
                                <p className="mt-2 text-base leading-6 text-gray-500">
                                    If you encounter any issues or have questions regarding the backend setup, deployment, or any special feature implementation, you can contact the developer via email. In case you find a bug, you can submit an issue on the project&apos;s GitHub repository. Additionally, you are welcome to contribute by submitting pull requests with bug fixes or changes to the dev branch.
                                </p>
                            </div>
                            <center>
                                <h3 className="text-sm leading-6 font-medium text-gray-900 text-justify	">
                                    If you do have any additional questions or suggestions or any ideas related to projects feel free to ping me on thilakreddypothuganti@gmail.com or contact me on <a href="https://www.instagram.com/__thilak_reddy__/" target="_blank">instagram</a>
                                </h3>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;
