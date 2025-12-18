"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaGooglePlay, FaTelegram } from "react-icons/fa";
import { jobDetails } from "@/constants/jobsdetails";
const NoticePopup = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  const path = "/" + pathname.split("/")[1];

  return (
    <div
      className={` z-[8]  md:hidden backdrop-filter  backdrop-blur-sm fixed h-full w-full   my-5    justify-center ${path !== "/" || hidden ? "hidden" : "hidden"}`}
    >
      <div className="flex justify-center items-start w-full md:mt-16 h-full">
        <div
          className={`md:w-[60%] border-black dark:border-white font-bold text-center flex md:items-center justify-center dark:bg-[#1B1C1E] w-full  items-center shadow-xl bg-white p-2 rounded-md border m-2 `}
        >
          <div className="text-center w-full">
            <div className="py-2 flex  justify-around  border-b">
              <div className="w-full"></div>
              <div className="p-2 w-full">Announcement!!!</div>
              <div className="flex items-center justify-end w-full">
                <Button
                  onClick={() => {
                    setHidden(true);
                  }}
                  className="h-[2px] rounded w-[2px] px-[10px] text-[10px]"
                >
                  X
                </Button>
              </div>
            </div>
            <div className=" max-h-[480px] p-2 overflow-auto">
              <div className="font-medium text-start text-sm p-2 ">
                <p>Hello everyone,</p>
                <br />

                <p className="text-sm font-normal text-left">
                  We are excited to announce the launch of{" "}
                  <strong>JNTUHConnect App</strong>, a centralized platform
                  built to help JNTUH students stay informed with timely and
                  reliable academic updates.
                </p>

                <p className="mt-8 underline italic">Key Features</p>
                <ul className="list-disc ml-5 mt-2 font-normal">
                  <li>Instant access to examination results</li>
                  <li>
                    Official university notifications and circulars{" "}
                    <em>(coming soon)</em>
                  </li>
                  <li>
                    Exam schedules and academic calendar <em>(coming soon)</em>
                  </li>
                  <li>Clean, fast, and lightweight user experience</li>
                </ul>
                <div className="flex justify-center">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 
             text-white text-sm font-medium hover:bg-green-700 transition"
                  >
                    <FaGooglePlay className="text-lg" />
                    Download Now
                  </a>
                </div>
                {/* <p className="text-sm font-normal text-justify"> */}
                {/*   &nbsp;&nbsp;&nbsp;I&apos;m Thilak, the one behind the JNTUH */}
                {/*   Results Vercel application. From a mere idea born out of */}
                {/*   curiosity when preparing for my placement, it has now become */}
                {/*   an indispensable tool for the entire JNTUH community. */}
                {/* </p> */}
                {/*   <br /> */}
                {/*   <p className="text-sm font-normal text-justify"> */}
                {/*     Our platform has beeen serviceable tool for students accessing */}
                {/*     results. It has been working swiftly and efficiently through */}
                {/*     continuous refinement till now. This application has been an */}
                {/*     important step of my life being my first project. */}
                {/*   </p> */}
                {/*   <br /> */}
                {/*   <p className="text-sm font-normal text-justify"> */}
                {/*     For those interested in developing a similar solution to JNTUH */}
                {/*     Results on Vercel, I&apos;m sharing the complete{" "} */}
                {/*     <Link */}
                {/*       href="https://raw.githubusercontent.com/ThilakReddyy/JNTUHRESULTS-SERVICE/main/jntuhresults/Executables/jntuhresultscraper.py" */}
                {/*       target="_blank" */}
                {/*       className="text-blue-500" */}
                {/*     > */}
                {/*       core code */}
                {/*     </Link> */}
                {/*     . If any college wishes to create a similar application using */}
                {/*     local Excel sheets directly provided by JNTUH University, */}
                {/*     contact me on{" "} */}
                {/*     <Link */}
                {/*       href="https://www.instagram.com/__thilak_reddy__/" */}
                {/*       target="_blank" */}
                {/*       className="text-blue-500" */}
                {/*     > */}
                {/*       Instagram */}
                {/*     </Link>{" "} */}
                {/*     or via{" "} */}
                {/*     <Link */}
                {/*       target="_blank" */}
                {/*       href="mailto:thilakreddypothuganti@gmail.com" */}
                {/*       className="text-blue-500" */}
                {/*     > */}
                {/*       mail */}
                {/*     </Link> */}
                {/*     . If you are using the core code for developing the project, */}
                {/*     please ensure proper credits or attribution is given to */}
                {/*     acknowledge the hard work and commitment involved. 🙌{" "} */}
                {/*   </p> */}
                {/*   <br /> */}
                {/*   <p className="text-sm font-normal text-justify"> */}
                {/*     Additionally, we&apos;re creating an application called carrer */}
                {/*     nexus for job and internship opportunities. If anyone out */}
                {/*     there has experience handling sizable databases exceeding half */}
                {/*     a million entries or anyone who is intersted in joining the */}
                {/*     project, feel free to reach out to me on &nbsp; */}
                {/*     <Link */}
                {/*       href="https://www.instagram.com/__thilak_reddy__/" */}
                {/*       target="_blank" */}
                {/*       className="text-blue-500" */}
                {/*     > */}
                {/*       Instagram */}
                {/*     </Link> */}
                {/*     , Twitter, or whichever plaform you prefer. 🚀 */}
                {/*   </p> */}
                {/*   <br /> */}
                {/*   <p className="text-sm font-normal text-justify"> */}
                {/*     Thank you for your unwavering support. 🙏 Let&apos;s keep */}
                {/*     innovating together! 🌱 */}
                {/*   </p> */}
                {/*   <Link */}
                {/*     href="https://t.me/jntuhvercel" */}
                {/*     target="_blank" */}
                {/*     className="flex dark:bg-white p-2 bg-black text-white dark:text-black justify-center items-center mt-4" */}
                {/*   > */}
                {/*     Join us on Telegram{"  "} */}
                {/*     <FaTelegram size={18} className="ml-1" /> */}
                {/*   </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticePopup;
