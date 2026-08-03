import AdComponent from "@/components/ads/adcomponent";
import Title from "@/components/homepage/title";
import { homeLinks } from "@/constants/homeLinks";
import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <h1 className="z-[20] grid grid-row-2 items-center pt-10 font-normal text-2xl lg:flex lg:justify-center lg:text-xl xl:text-4xl 2xl:text-6xl mb-5">
        <span className="flex justify-center lg:justify-end">
          Welcome to&nbsp;
        </span>
        <Link
          href="/"
          className="flex justify-center text-primary underline-offset-4 hover:underline lg:justify-start"
        >
          <Title />
        </Link>
      </h1>
      <div className="flex justify-center">
        <div className="m-4 w-full border border-border bg-secondary py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-secondary-foreground shadow-[3px_3px_0_hsl(var(--border)/0.16)] transition-colors lg:w-fit lg:whitespace-nowrap lg:px-8 lg:py-2 lg:text-base">
          Jawaharlal Nehru Technological University, Hyderabad
        </div>
      </div>
      <div className="flex justify-center lg:hidden">
        {/* <AdComponent /> */}
      </div>
      <div className="text-center flex justify-center min-h-[calc(100vh-460px)]">
        <div className="home-links flex flex-wrap items-center justify-around h-fit max-w-5xl md:mt-6  sm:w-full">
          {homeLinks.map((homelink: any, index: number) => {
            return (
              <Link href={homelink.link} key={index}>
                <div className="border  hover:drop-shadow-sm group text-black  dark:text-white border-slate-800  shadow-2xl md:min-h-[250px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
                  <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                    <div className="flex flex-row items-center justify-start">
                      <span className="p-1 text-black dark:text-white">
                        {homelink.title}
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
                    {homelink.description}
                  </p>
                </div>
              </Link>
            );
          })}
          <Link href="/academicallresult" className="md:hidden">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Academic All Result</span>
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
                      clipRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Check the results of all the exams you&apos;ve taken.
              </p>
            </div>
          </Link>
          <Link href="/calendars" className="md:hidden">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Academic Calendars</span>
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
                      clipRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    ></path>
                  </svg>
                </div>
              </h3>
              <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">
                Get all the Academic Calendars with proper segregation at one
                place
              </p>
            </div>
          </Link>

          <Link href="/resultcontrast" className="md:hidden">
            <div className="border border-slate-800   hover:drop-shadow-sm group text-black dark:text-white shadow-2xl md:min-h-[220px] max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1">Result Contrast</span>
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
                      clipRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
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
                      clipRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
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
      <footer className="mt-auto w-full pb-4 pt-5 font-interer lg:w-[calc(100vw-16rem)]">
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
              href="https://x.com/thilakreddyonly"
              className="mx-2 hover:text-gray-900"
              aria-label="X profile"
            >
              <FaXTwitter />
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
            <p>&copy; 2026 jntuhconnect.dhethi.com</p>
          </div>
        </center>
      </footer>
    </div>
  );
}
