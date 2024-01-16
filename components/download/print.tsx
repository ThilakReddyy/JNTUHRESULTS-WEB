import React from "react";
import { useReactToPrint } from "react-to-print";

const Print = ({ componentRef }: { componentRef: any }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="flex justify-center mb-2">
      <button
        onClick={handlePrint}
        className="text-sm md:text-lg
            px-5 py-1 pb-[1.5px]
            rounded
            bg-black dark:bg-gray-300
            dark:text-black text-white      
            "
      >
        Download Result
      </button>
    </div>
  );
};

export default Print;
