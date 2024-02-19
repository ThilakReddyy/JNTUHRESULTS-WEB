"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";
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
      {deferredPrompt === null ? (
        <div className="w-full  flex justify-end">
          <Link
            className="mr-4 border-2 rounded-md bg-black dark:bg-white text-white dark:text-black p-2 shadow-2xl"
            href="https://whatsapp.com/channel/0029VaPCHEyChq6L8UBGkv1c"
          >
            <FaWhatsapp size={24} />
          </Link>
        </div>
      ) : (
        <Button
          className={`lg:hidden w-[250px] ${deferredPrompt === null ? "hidden" : ""}`}
          onClick={handleInstallClick}
        >
          Download APP
        </Button>
      )}
    </>
  );
};

export default Pwa;
