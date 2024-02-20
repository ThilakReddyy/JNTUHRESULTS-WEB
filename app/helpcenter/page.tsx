import Link from "next/link";

const HelpCenter = () => {
  return (
    <>
      <div className="flex justify-center  mt-[6%]  mx-[16%] px-10 rounded-md   ">
        <div className=" pt-[30px] pb-[50px]">
          <div className=" md:text-2xl underline  font-semibold   flex justify-center ">
            Help Center
          </div>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="home-links flex flex-wrap items-center justify-around max-w-4xl md:mt-6  sm:w-full">
          <Link href="/faq">
            <div className="border lg:min-h-[220px] hover:drop-shadow-sm group text-black  dark:text-white border-slate-800 md:border-gray-100 shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1 text-black dark:text-white">
                    Frequent questions
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
                The most Frequent asked questions are here!!!
              </p>
            </div>
          </Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScFdsBs-QvzuZLxc1ZmvsUo4R2Ez1NPe0UmG7E1tgzXzKrimg/viewform">
            <div className="border  hover:drop-shadow-sm group text-black  dark:text-white border-slate-800 md:border-gray-100 shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
              <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                <div className="flex flex-row items-center justify-start">
                  <span className="p-1 text-black dark:text-white">
                    Suggestion/ Feedback
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
                Share us the feedback or suggestion to help us in enhancing your
                experience
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default HelpCenter;
