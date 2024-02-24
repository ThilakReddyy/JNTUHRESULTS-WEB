"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaGooglePlay, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: ReadonlyArray<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const Pwa = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log(e);
      setDeferredPrompt(e);
    };

    window.matchMedia("(display-mode: standalone)").addListener((evt) => {
      setIsInstalled(evt.matches);
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  });

  const handleInstallClick = () => {
    if (deferredPrompt instanceof Event) {
      const promptEvent = deferredPrompt as BeforeInstallPromptEvent;
      promptEvent.prompt();

      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      <div
        className={`lg:hidden bg-opacity-50 backdrop-filter  backdrop-blur-sm fixed h-full   my-5  w-full  justify-center ${deferredPrompt === null ? "hidden" : ""}`}
      >
        <div className="flex justify-center items-center h-full">
          <div
            className={`md:w-[50%]  flex justify-center dark:bg-[#1B1C1E] items-center shadow-xl bg-white p-2 rounded-md border m-2 `}
          >
            <div className="p-2">
              <div className="flex justify-center font-bold text-lg mb-2">
                JNTUH RESULTS
              </div>
              <div className="flex text-center text-xs mb-1">
                Ensure uninterrupted access to your results, syllabus, and
                notifications anytime, anywhere by staying connected through the
                JNTUH Results app
              </div>
              <div className="flex text-center justify-center text-[10px] text-gray-500 mb-2">
                Click Button Below for secure Installation of app .
              </div>
              <div className="flex text-center items-center justify-center text-[10px] dark:text-gray-100 text-gray-900 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield-check text-gray-900"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                &nbsp;Safe and Secure Installation on&nbsp;
                <span className=" bg-gray-300 flex items-center px-1 text-gray-900 py-[1px] rounded text-[8px]">
                  <FaGooglePlay />
                  &nbsp; Google Play
                </span>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="destructive"
                  className={`lg:hidden w-[110px] mr-2`}
                  onClick={() => {
                    setDeferredPrompt(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className={`lg:hidden w-[110px] ml-2 `}
                  onClick={handleInstallClick}
                >
                  Install
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pwa;
