import React from "react";
import { useReactToPrint } from "react-to-print";

import { Download } from "lucide-react";

const Print = ({ componentRef }: { componentRef: any }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div
        className={`fixed bottom-0   right-0 m-5 cursor-pointer rounded-full bg-black dark:bg-white dark:text-black   text-white border p-2 z-[401] `}
      >
        <Download
          onClick={() => {
            handlePrint();
          }}
          size={15}
        />
      </div>
    </>
  );
};

export default Print;
