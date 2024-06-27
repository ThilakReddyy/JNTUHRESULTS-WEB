import React from "react";

interface GoogleDocViewerProps {
  url: string;
  width?: string;
  height?: string;
}

const GoogleDocViewer: React.FC<GoogleDocViewerProps> = ({
  url,
  width = "100%",
  height = "580px",
}) => {
  const src = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return <iframe src={src} style={{ width, height }} frameBorder="0"></iframe>;
};

export default GoogleDocViewer;
