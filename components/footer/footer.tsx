import React from "react";

const Footer = () => {
  return (
    <div className="mt-2">
      <div className="font-serif mt-1 block text-left text-[#808080] ml-[17%] text-[55%] md:text-[80%]">
        It does consider the RCRV Results
      </div>
      <div className="font-serif mt-1 block text-left text-[#808080] ml-[17%] mb-4 text-[55%] md:text-[80%]">
        It only works above R18 Regulation
      </div>
      <center>
        <hr className="w-[64%] mt-4 mb-1 " />
      </center>
      <center>
        <hr className="w-[64%]  text-[#808080]" />
      </center>
      <p className="mt-4 block text-center mx-[18%] mb-4 text-[75%] sm:text-[100%]">
        Made with ❤ by &nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ThilakReddyy/"
          className=" underline	underline-offset-1"
        >
          Thilak Reddy
        </a>
      </p>
    </div>
  );
};

export default Footer;
