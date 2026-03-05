"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

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
      "IV Year II Semester",
      "II Year I Semester",
    ];
    const typeWriter = async () => {
      await sleep(200);
      while (true) {
        for (let ind = 0; ind < searchQueries.length; ind++) {
          for (let i = 0; i < searchQueries[ind].length; i++) {
            setPlaceHolder(searchQueries[ind].substring(0, i + 1));
            await sleep(80);
          }
          await sleep(700);
          for (let i = 0; i < searchQueries[ind].length; i++) {
            setPlaceHolder(
              searchQueries[ind].substring(0, searchQueries[ind].length - i - 1),
            );
            await sleep(50);
          }
        }
      }
    };
    typeWriter();
  }, []);

  return (
    <div className="relative w-full">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
      />
      <input
        id="searchKey"
        className="w-full h-10 text-sm bg-transparent outline-none pl-9 pr-4
                   border border-gray-200 dark:border-white/10 rounded-xl
                   placeholder:text-gray-400 dark:placeholder:text-gray-600
                   focus:border-[#0b3954] dark:focus:border-sky-500
                   text-gray-800 dark:text-gray-100 transition-colors"
        placeholder={placeHolder}
        onChange={handleSearch}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
