import React from "react";

const Print = () => {
  return (
    <div className="flex justify-center mb-2">
      <button
        onClick={() => {
          print();
        }}
        className="text-sm md:text-lg
            px-5 py-1 pb-[1.5px]
            rounded
            bg-black dark:bg-gray-300
            dark:text-black text-white
            
            "
      >
        print
      </button>
    </div>
  );
};

export default Print;
