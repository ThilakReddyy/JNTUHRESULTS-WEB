"use client";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface searchBarProps {
  handleSearch: (event: any) => void;
}

const SearchBar = ({ handleSearch }: searchBarProps) => {
  const [placeHolder, setPlaceHolder] = useState("");
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const searchQueries = [
      "III Year II Semester",
      "I Year I Semester",
      "IV year II Semester",
      "II Year I Semester",
    ];
    const typeWriter = async () => {
      // Wait for 2 seconds before starting the typewriter effect
      await sleep(200);
      while (true) {
        for (let ind = 0; ind < searchQueries.length; ind++) {
          for (let i = 0; i < searchQueries[ind].length; i++) {
            setPlaceHolder(searchQueries[ind].substring(0, i + 1));
            await sleep(100);
          }
          await sleep(600);
          for (let i = 0; i < searchQueries[ind].length; i++) {
            setPlaceHolder(
              searchQueries[ind].substring(
                0,
                searchQueries[ind].length - i - 1,
              ),
            );

            await sleep(100);
          }
        }
      }
    };

    typeWriter();
  }, []);
  return (
    <div className="inline-block w-[100%]">
      <IoMdSearch className="md:m-[8px] absolute hidden md:block" />
      <input
        id="searchKey"
        className="w-[100%]  h-[35px] text-[16px] outline-none pr-[108px] pl-[10px] md:pl-[31px] border-[1px] border-solid border-t-zinc-200"
        placeholder={placeHolder}
        onChange={handleSearch}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
