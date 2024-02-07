"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const title = "JNTUH RESULTS!!!";
  const [blind, setblind] = useState(false);
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const typeWriter = async () => {
      // Wait for 2 seconds before starting the typewriter effect
      await sleep(200);

      for (let i = 0; i < title.length; i++) {
        setTitleIndex(i);
        await sleep(50);
      }
      while (true) {
        for (let i = 0; i < 5; i++) {
          setblind(true);
          await sleep(400);
          setblind(false);
          await sleep(400);
        }
      }
    };

    typeWriter();
  }, []);

  return (
    <>
      <div className="z-[20] grid grid-row-2 lg:grid-cols-2 lg:hidden  items-center pt-10 font-normal text-2xl lg:text-6xl mb-5">
        <div className="flex justify-center lg:justify-end">
          Welcome to&nbsp;
        </div>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex justify-center lg:justify-start hover:underline"
        >
          {title.substring(0, titleIndex)}
          <span className={`font-extralight ${blind && "opacity-0"}`}>|</span>
        </Link>
      </div>
      <div className="z-[20] hidden lg:flex justify-center items-center pt-10 font-normal text-2xl lg:text-6xl mb-5">
        Welcome to&nbsp;
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600  hover:underline"
        >
          {title.substring(0, titleIndex)}
          <span className={`font-extralight ${blind && "opacity-0"}`}>|</span>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-[100%] lg:max-w-[60%] 2xl:max-w-[40%] text-sm lg:text-lg text-center bg-black text-white py-3 lg:py-2 m-4 rounded dark:text-black dark:bg-gray-200">
          Jawaharlal Nehru Technological University, Hyderabad
        </div>
      </div>
      <div className="text-center flex justify-center">
        <div className="home-links flex flex-wrap items-center justify-around max-w-5xl md:mt-6  sm:w-full">
          <Link href="/academicresult">
            <div className="border  hover:drop-shadow-sm group text-black  dark:text-white border-slate-800  shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1 text-black dark:text-white">
                    Academic Results
                  </span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Access your overall academic performance with just an hall
                ticket.
              </p>
            </div>
          </Link>
          <Link href="/creditchecker">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black  dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Credit Checker</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Check your credits to find out how many you need to move on to
                the next year or to graduate.
              </p>
            </div>
          </Link>
          <Link href="/carrers">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:max-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1 ">Jobs and Careers</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Explore career paths!!!.
                <br />
                Find internships, jobs, and kickstart your professional journey.
              </p>
            </div>
          </Link>

          <Link href="/backlogreport">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black  dark:text-white shadow-3xl  md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Backlog Report</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Access your overall backlogs report with an hallticket.
              </p>
            </div>
          </Link>

          <Link href="/resultcontrast">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px]  max-w-xs  p-6 mt-6 text-left rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Results Contrast</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Compare your academic performance across all semesters with your
                classmate.
              </p>
            </div>
          </Link>

          <Link href="/classresult">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1 ">Class Results</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                View the results of your classmates and compare your performance
                with theirs.
              </p>
            </div>
          </Link>

          <Link href="/notifications" className="md:hidden">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Notifications</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Get all the latest Notifications from JNTUH
              </p>
            </div>
          </Link>
          <Link href="/helpcenter" className="md:hidden">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Help Center</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Discover a Bug? Report it and Help us in Enhancing Your
                Experience!
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="bottom-0 xl:absolute w-full xl:pr-64 font-interer pt-[10px]">
        <hr />
        <center>
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <a
              href="https://github.com/thilakreddyy"
              className="mx-2 hover:text-gray-900"
              aria-label="github link"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/thilakreddyonly"
              className="mx-2 hover:text-gray-900"
              aria-label="twitter link"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/__thilak_reddy__/"
              className="mx-2 hover:text-gray-900"
              aria-label="instagram link"
            >
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
}
