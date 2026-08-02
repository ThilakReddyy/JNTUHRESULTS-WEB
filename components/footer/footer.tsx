"use client";
import React from "react";
import Link from "next/link";
import AdComponent from "../ads/adcomponent";
const Footer = () => {
  return (
    <>
      <div className="mx-auto mt-8 max-w-4xl border-t border-border px-4 py-5 text-muted-foreground">
        <div className="grid gap-px border border-border bg-border text-[10px] uppercase tracking-[0.08em] md:grid-cols-2 md:text-xs">
          <div className="bg-card px-4 py-2">Includes RCRV results</div>
          <div className="bg-card px-4 py-2">Available for R18 and newer regulations</div>
        </div>

        <span className="mt-4  text-center mx-[18%] mb-4 text-[75%] sm:text-[100%] hidden">
          Made with ❤ by &nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ThilakReddyy/"
            className=" underline	underline-offset-1"
          >
            Thilak Reddy
          </a>
          <br />
          <p
          // className={` ${path == "/academicresult" ? "block" : "hidden"}`}
          >
            In collaboration with{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hemanth-kotagiri/"
              className=" underline	underline-offset-1"
            >
              Hemanth kotagiri
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Syed-Ansar/"
              className=" underline	underline-offset-1"
            >
              Syed Ansar
            </a>
          </p>
        </span>
        <span className="mt-4 block text-center text-xs sm:text-sm">
          Join us on{" "}
          <Link
            href="https://t.me/s/jntuhvercel"
            className="underline underline-offset-1"
          >
            Telegram
          </Link>
          {/* Support this app by clicking{" "} */}
          {/* <Link */}
          {/*   className=" underline	underline-offset-1" */}
          {/*   href="upi://pay?pn=Thilak%20Reddy&pa=9381339131@ibl" */}
          {/* > */}
          {/*   here */}
          {/* </Link> */}, thanks!
        </span>
      </div>
      <AdComponent />
    </>
  );
};

export default Footer;
