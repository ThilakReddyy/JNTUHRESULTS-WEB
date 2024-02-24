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
      <div className="w-full flex justify-center">
        <Button
          className={`lg:hidden w-[250px] ${deferredPrompt === null ? "hidden" : ""}`}
          onClick={handleInstallClick}
        >
          Download APP
        </Button>
      </div>
    </>
  );
};

export default Pwa;
