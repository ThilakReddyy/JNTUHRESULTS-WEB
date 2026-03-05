import Link from "next/link";
import React, { useEffect } from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { Share2, ExternalLink } from "lucide-react";

const NotificationResults = ({
  results,
  incrementPage,
}: notificationResultsProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight + 300 >= scrollHeight) {
        incrementPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buildQuery = (result: Result) =>
    "link=" +
    encodeURIComponent(result.link) +
    "&title=" +
    result.title +
    "&date=" +
    result.date +
    "&formatted_date=" +
    result.releaseDate;

  const onOpen = (query: string) => {
    window.open("notifications/examcode?" + query, "_blank");
  };

  if (results.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-10">
        No notifications for this search query
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {results.map((result: Result, index: number) => {
        const query = buildQuery(result);
        return (
          <div
            key={index}
            className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5
                       hover:border-[#0b3954] dark:hover:border-sky-500
                       hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => onOpen(query)}
          >
            <div className="flex items-start gap-3 px-4 py-3">
              {/* Dot indicator */}
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-sky-400" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-[#0b3954] dark:group-hover:text-sky-400 transition-colors">
                  {result.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {result.date}
                </p>
              </div>

              {/* Actions */}
              <div
                className="flex-shrink-0 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`https://api.whatsapp.com/send?text=*Check out the Results!* \n\n ${result.title} \n\n${result.link}\n`}
                  target="_blank"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                  title="Share on WhatsApp"
                >
                  <RiWhatsappLine size={16} />
                </Link>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: result.title, url: result.link });
                    }
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  title="Share"
                >
                  <Share2 size={14} />
                </button>
                <ExternalLink size={14} className="text-gray-300 dark:text-gray-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationResults;
