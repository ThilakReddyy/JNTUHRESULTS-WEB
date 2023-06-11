import { useState } from "react";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

const Faq = () => {
    const faqs = [
        {
            'question': 'How does this website work?',
            'answer': 'When a user enters their roll number, the website asynchronously sends requests to the JNTUH server, retrieving the results for all regular and supplementary exams across all semesters associated with the given roll number. Using BeautifulSoup, the backend parses the HTML content of the responses to extract the relevant result information. An algorithm then combines the results and calculates the Cumulative Grade Point Average (CGPA) for the student. This entire process is optimized to be completed in less than 2 seconds, allowing the JNTUHRESULTS-vercel website to swiftly provide comprehensive results to the user.'
        },
        {
            'question': 'How do I access my grades for all semesters?',
            'answer': 'To access your grades for all semesters, enter your roll number in the provided inbox in the academic result page and click on the "Results" button. The results of all your semesters will be displayed.'
        },
        {
            'question': 'What is the purpose of the backend in this project?',
            'answer': 'The backend serves as the backbone of the JNTUHRESULTS-vercel project. It is responsible for fetching and parsing the results of both individual students and multiple classmates. By making requests to the JNTUH website and utilizing BeautifulSoup, the backend extracts the required data and provides it to the frontend.'
        },
        {
            'question': 'How does the backend fetch the results from the JNTUH website?',
            'answer': 'Since the JNTUH website does not provide an API or authentication for result requests, the backend sends requests to the website and captures the responses. It then uses BeautifulSoup, a Python library for parsing HTML, to extract the relevant result information from the HTML response.'
        },
        {
            'question': 'What technologies are used to develop the website?',
            'answer': 'The website is built using Next.js. Next.js enables the creation of React-based web applications with server-side rendering and the generation of static websites. The website is hosted on Vercel, which provides fast deployments served from the edge.'
        },
        {
            'question': 'How can I report a bug or ask for help?',
            'answer': 'If you encounter any issues or have questions regarding the website, you can contact the developer via email thilakreddypothuganti@gmail.com or fill the issue in the Google Forms. Additionally, if you find a bug, you can submit an issue on the project\'s GitHub repository. You\'re also welcome to contribute by submitting pull requests with bug fixes or changes to the develop branch.'
        },
        {
            'question': 'What are the available API endpoints for fetching results?',
            'answer': 'There are two API endpoints provided by the backend:\n\n/api/academicresult?htno=Roll_no: Fetches results for a single student using their roll number.\n\n/api/classresult?htnos=multiple_htnos_seperate_by_commas&semester=semester_code: Fetches results for multiple students within a given range of roll numbers and semester code.'
        },
        {
            'question': 'Can I suggest ideas for new website tools or features?',
            'answer': 'Yes, you can message me with your ideas for small website tools that you can\'t find online or any other features you\'d like to see.'
        },
        {
            'question': 'How can I report a bug or ask for help related to the backend?',
            'answer': 'If you encounter any issues or have questions regarding the backend setup, deployment, or any special feature implementation, you can contact the developer via email. In case you find a bug, you can submit an issue on the project\'s GitHub repository. Additionally, you are welcome to contribute by submitting pull requests with bug fixes or changes to the dev branch.'
        }
    ];


    const [answerVisibility, setAnswerVisibility] = useState(Array(faqs.length).fill(false));


    return (
        <>
            <section className="pt-[75px] ">
                <h3 className='text-center text-xl font-bold hidden md:block font-intercursive'>Frequently Asked Question&apos;s</h3>
                <h3 className='text-center text-xl font-bold block md:hidden font-intercursive'>FAQ&apos;s</h3>
                <center>
                    <div className='max-w-[1024px] font-interer px-[15px]'>

                        <div className='max-w-[540px] w-[100%] '>
                            {faqs.map((value, index) => {
                                return (
                                    <section key={index} className='my-[16px] rounded-[4px] border-[1px] border-solid   '>
                                        <div className='overflow-hidden flex grid-rows-2 p-[13px] bg-[#fff] rounded-[4px]'>


                                            <button className='text-[14px] text-black   w-full text-left '
                                                onClick={() => {
                                                    const newVisibility = [...answerVisibility];
                                                    newVisibility[index] = !newVisibility[index];
                                                    setAnswerVisibility(newVisibility);
                                                }}
                                            >
                                                {value.question}
                                            </button>
                                            <AiOutlineDownCircle className={`text-2xl text-right ${answerVisibility[index] ? 'hidden' : 'block'}`} />
                                            <AiOutlineUpCircle className={`text-2xl text-right  ${answerVisibility[index] ? 'block' : 'hidden'}`} />
                                        </div>
                                        <div className={`text-justify px-[13px] bg-[#f2f2f2] overflow-hidden transition-max-height duration-200 ease-out text-[14px] text-[#1a1a1a] py-[17px] ${answerVisibility[index] ? '' : 'hidden'}`}>
                                            <p>
                                                {value.answer}
                                            </p>
                                        </div>
                                    </section>
                                )
                            })}

                        </div>
                    </div>
                </center>
            </section>
            <div className='bottom-0 md:hidden w-full font-interer pt-[10px]'>
                <hr />
                <center >
                    <div className="flex justify-center mt-4 text-sm text-gray-600">
                        <a href="https://github.com/thilakreddyy" className="mx-2 hover:text-gray-900">
                            <FaGithub />
                        </a>
                        <a href="https://twitter.com/thilakreddyonly" className="mx-2 hover:text-gray-900">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/__thilak_reddy__/" className="mx-2 hover:text-gray-900">
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="flex justify-center m-2 text-xs	 text-gray-600">
                        <p>&copy; 2023 jntuhresults.vercel.app</p>
                    </div>

                </center>
            </div>
        </>
    );
};

export default Faq;
