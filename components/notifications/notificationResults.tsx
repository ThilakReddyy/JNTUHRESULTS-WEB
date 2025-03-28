import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";

const NotificationResults = ({
  results,
  incrementPage,
}: notificationResultsProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrolledToBottom = scrollTop + clientHeight + 300 >= scrollHeight;
      if (isScrolledToBottom) {
        incrementPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onLinkClick = (query: string) => {
    const modifiedquery = "notifications/examcode?" + query;
    window.open(modifiedquery, "_blank");
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="home-links flex flex-wrap items-center max-w-4xl mt-6 sm:w-full text-center  justify-around mx-auto">
          {results.length === 0 && "No Notifications for this search query"}
          {results &&
            results.map((result: Result, index: number) => {
              const query =
                "link=" +
                encodeURIComponent(result.link) +
                "&" +
                "title=" +
                result.title +
                "&date=" +
                result.date +
                "&formatted_date=" +
                result.releaseDate;

              return (
                <div
                  key={index}
                  onClick={() => {
                    onLinkClick(query);
                  }}
                  className="cursor-pointer"
                >
                  <div className="border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
                    <h3 className="group-hover:text-black text-lg sm:text-xl font-bold">
                      <div className="flex flex-row items-center justify-start dark:text-white">
                        <span className="p-1">{result.title}</span>
                      </div>
                    </h3>
                    <p className="group-hover:text-black dark:text-slate-100 text-slate-500 mt-4 text-base sm:text-xl">
                      {" "}
                      {result.date}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className=" md:hidden pt-5">
        {results.map((result: Result, index) => {
          const query =
            "link=" +
            encodeURIComponent(result.link) +
            "&" +
            "title=" +
            result.title +
            "&date=" +
            result.date +
            "&formatted_date=" +
            result.releaseDate;

          return (
            <div
              key={index}
              className="bg-gray-200  dark:bg-gray-800 text-left p-[20px] mb-[3px] pb-[5px] md:hidden"
            >
              <h3 key={index} className="group-hover:text-black  font-bold ">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onLinkClick(query);
                  }}
                >
                  <div className=" justify-start font-interer  text-base">
                    JNTUH {result.title}
                  </div>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-200 font-semibold flex  py-2 font-interer">
                  <span>{result?.date} </span>

                  <div className="ml-auto flex ">
                    <Link
                      className="px-[5px]"
                      target="_blank"
                      href={`https://api.whatsapp.com/send?text=*Check out the Results!* \n\n ${result.title} \n\n${result.link}\n`}
                    >
                      <RiWhatsappLine size={17} />
                    </Link>

                    <span className="px-5">
                      <AiOutlineShareAlt size={18} />
                    </span>
                  </div>
                </div>
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationResults;
