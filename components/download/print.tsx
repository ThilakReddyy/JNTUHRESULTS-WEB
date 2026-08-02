import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";

import { Download } from "lucide-react";

interface PrintProps {
  componentRef: React.RefObject<HTMLElement>;
  onDownload?: () => void | Promise<void>;
}

const Print = ({ componentRef, onDownload }: PrintProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = async () => {
    if (!onDownload) {
      handlePrint();
      return;
    }

    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={isDownloading ? "Downloading result" : "Download result"}
      disabled={isDownloading}
      onClick={handleDownload}
      className="fixed bottom-0 right-0 m-5 cursor-pointer rounded-full border bg-black p-2 text-white z-[401] disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-black"
    >
      <Download
        className={isDownloading ? "animate-pulse" : undefined}
        size={15}
      />
    </button>
  );
};

export default Print;
