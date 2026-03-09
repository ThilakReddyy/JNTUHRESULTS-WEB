"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaGooglePlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NoticePopup = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  React.useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(ua));
  }, []);

  const path = "/" + pathname.split("/")[1];
  const isVisible = path === "/" && !hidden && isAndroid;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md md:hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm overflow-hidden bg-white/90 dark:bg-[#1B1C1E]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600" />

            <div className="p-6 pt-8">
              <button
                onClick={() => setHidden(true)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                    New Launch
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">JNTUHConnect</span>
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Stay ahead with instant results & official updates right on your phone.
                  </p>
                </motion.div>

                <motion.div
                  className="mt-6 space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100/50 dark:border-blue-800/30">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold text-xs">
                      01
                    </div>
                    <p className="text-xs font-medium text-left text-gray-700 dark:text-gray-300">
                      Instant Notifications for Results
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl border border-purple-100/50 dark:border-purple-800/30">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg text-white font-bold text-xs">
                      02
                    </div>
                    <p className="text-xs font-medium text-left text-gray-700 dark:text-gray-300">
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
                    href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex items-center justify-center gap-3 w-full py-4 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold shadow-lg overflow-hidden transition-all"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <FaGooglePlay className="text-xl" />
                    <span>Download App Now</span>

                    <motion.div
                      className="absolute right-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </a>
                </motion.div>

                <button
                  onClick={() => setHidden(true)}
                  className="mt-4 text-xs font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 underline underline-offset-4 transition-colors"
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
