"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const title = "JNTUH RESULTS!!!";
  const [blind, setblind] = useState(false);
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const typeWriter = async () => {
      // Wait for 2 seconds before starting the typewriter effect
      await sleep(200);
      while (true) {
        for (let i = 0; i < title.length; i++) {
          setTitleIndex(i);
          await sleep(50);
        }
        for (let i = 0; i < 5; i++) {
          setblind(true);
          await sleep(400);
          setblind(false);
          await sleep(400);
        }
        for (let i = 0; i < title.length; i++) {
          setTitleIndex(title.length - i - 1);
          await sleep(50);
        }
      }
    };

    typeWriter();
  }, []);

  return (
    <>
      <div className="z-[20] grid grid-row-2 md:grid-cols-2   items-center pt-10 font-normal text-2xl md:text-6xl">
        <div className="flex justify-center md:justify-end">
          Welcome to&nbsp;
        </div>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex justify-center md:justify-start hover:underline"
        >
          {title.substring(0, titleIndex)}
          <span className={`font-extralight ${blind && "opacity-0"}`}>|</span>
        </Link>
      </div>
    </>
  );
}
