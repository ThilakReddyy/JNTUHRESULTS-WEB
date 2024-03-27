import Link from "next/link";
import React from "react";
import { FaTelegram } from "react-icons/fa";

const NoticeText = () => {
  return (
    <div className=" max-h-[480px] p-2 overflow-auto">
      <div className="font-medium text-start text-sm p-2 ">
        <p>Hello everyone,</p>
        <br />
        <p className="text-sm font-normal text-justify">
          &nbsp;&nbsp;&nbsp;I&apos;m Thilak, the one behind the JNTUH Results
          Vercel application. From a mere idea born out of curiosity when
          preparing for my placement, it has now become an indispensable tool
          for the entire JNTUH community.
        </p>
        <br />
        <p className="text-sm font-normal text-justify">
          Our platform has beeen serviceable tool for students accessing
          results. It has been working swiftly and efficiently through
          continuous refinement till now. This application has been an important
          step of my life being my first project.
        </p>
        <br />
        <p className="text-sm font-normal text-justify">
          For those interested in developing a similar solution to JNTUH Results
          on Vercel, I&apos;m sharing the complete{" "}
          <Link
            href="https://raw.githubusercontent.com/ThilakReddyy/JNTUHRESULTS-SERVICE/main/jntuhresults/Executables/jntuhresultscraper.py"
            target="_blank"
            className="text-blue-500"
          >
            core code
          </Link>
          . If any college wishes to create a similar application using local
          Excel sheets directly provided by JNTUH University, contact me on{" "}
          <Link
            href="https://www.instagram.com/__thilak_reddy__/"
            target="_blank"
            className="text-blue-500"
          >
            Instagram
          </Link>{" "}
          or via{" "}
          <Link
            target="_blank"
            href="mailto:thilakreddypothuganti@gmail.com"
            className="text-blue-500"
          >
            mail
          </Link>
          . If you are using the core code for developing the project, please
          ensure proper credits or attribution is given to acknowledge the hard
          work and commitment involved. 🙌{" "}
        </p>
        <br />
        <p className="text-sm font-normal text-justify">
          Additionally, we&apos;re creating an application called intuit for job
          and internship opportunities. If anyone out there has experience
          handling sizable databases exceeding half a million entries or anyone
          who is intersted in joining the project, feel free to reach out to me
          on &nbsp;
          <Link
            href="https://www.instagram.com/__thilak_reddy__/"
            target="_blank"
            className="text-blue-500"
          >
            Instagram
          </Link>
          , Twitter, or whichever plaform you prefer. 🚀
        </p>
        <br />
        <p className="text-sm font-normal text-justify">
          Thank you for your unwavering support. 🙏 Let&apos;s keep innovating
          together! 🌱
        </p>
        <Link
          href="https://t.me/jntuhvercel"
          target="_blank"
          className="flex dark:bg-white p-2 bg-black text-white dark:text-black justify-center items-center mt-4"
        >
          Join us on Telegram{"  "}
          <FaTelegram size={18} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default NoticeText;
