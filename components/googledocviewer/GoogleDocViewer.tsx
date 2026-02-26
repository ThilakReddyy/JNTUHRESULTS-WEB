import React, { useEffect, useState } from "react";
import Loading from "../loading/loading";

interface GoogleDocViewerProps {
  url: string;
  splNote: string;
  width?: string;
  height?: string;
}

const GoogleDocViewer: React.FC<GoogleDocViewerProps> = ({
  url,
  splNote,
  width = "100%",
  height = "87vh",
}) => {
  const src = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const iframe = document.getElementById("doc-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.onload = () => {
        setIsLoading(false);
      };
    }
  }, []);
  return (
    <div>
      {isLoading && <Loading splNote={splNote} />}
      <iframe
        id="doc-iframe"
        src={src}
        style={{ width, height, display: isLoading ? "none" : "block" }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default GoogleDocViewer;
