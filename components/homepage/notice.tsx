"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaApple, FaGooglePlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  useMobilePlatform,
} from "@/customhooks/appdownloadhook";

const NoticePopup = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const platform = useMobilePlatform();
  const isIOS = platform === "ios";

  const path = "/" + pathname.split("/")[1];
  const isVisible = path === "/" && !hidden && platform !== null;
  const closehide = true;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm border border-border bg-card text-card-foreground shadow-[5px_5px_0_hsl(var(--border)/0.25)]"
          >
            <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-3 text-secondary-foreground">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">
                New Launch
              </span>
              <button
                onClick={() => setHidden(true)}
                hidden={closehide}
                className="border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Close"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-extrabold uppercase tracking-[0.06em] text-foreground">
                    Get JNTUH Connect
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Stay ahead with instant results & official updates right on
                    your phone.
                  </p>
                </motion.div>

                <motion.div
                  className="mt-6 space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 border border-border bg-background p-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-border bg-primary text-xs font-bold text-primary-foreground">
                      01
                    </div>
                    <p className="text-left text-xs font-medium text-foreground">
                      Instant Notifications for Results
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border border-border bg-background p-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-border bg-primary text-xs font-bold text-primary-foreground">
                      02
                    </div>
                    <p className="text-left text-xs font-medium text-foreground">
                      Access All Your Results in One Place
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={isIOS ? APP_STORE_URL : PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      isIOS
                        ? "Download JNTUH Connect on the App Store"
                        : "Download JNTUH Connect on Google Play"
                    }
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-primary bg-primary px-6 py-4 font-bold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                  >
                    {isIOS ? (
                      <FaApple className="text-xl" />
                    ) : (
                      <FaGooglePlay className="text-xl" />
                    )}
                    <span>
                      {isIOS ? "Download on the App Store" : "Download App Now"}
                    </span>
                  </a>
                </motion.div>

                <button
                  onClick={() => setHidden(true)}
                  hidden={closehide}
                  className="mt-4 text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticePopup;
