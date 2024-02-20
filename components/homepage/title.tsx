"use client";

import { useEffect, useState } from "react";

const Title = () => {
  const title = "JNTUH RESULTS!!!";
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  const [blind, setblind] = useState(false);
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
  const [titleIndex, setTitleIndex] = useState(0);
  return (
    <>
      {title.substring(0, titleIndex)}
      <span className={`font-extralight ${blind && "opacity-0"}`}>|</span>
    </>
  );
};

export default Title;
