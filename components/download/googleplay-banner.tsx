import Link from "next/link";
import { FaGooglePlay } from "react-icons/fa";

const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect";

/**
 * A compact "Get it on Google Play" badge.
 * Rendered inline so it can be placed anywhere (navbar, homepage, footer…).
 */
export const GooglePlayBadge = ({ className = "" }: { className?: string }) => (
    <Link
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download JNTUH Connect on Google Play"
        className={`inline-flex items-center gap-1.5 rounded-full border border-green-500 bg-green-500/10 px-3 py-1 text-[11px] font-semibold text-green-400 transition-all hover:bg-green-500/20 hover:text-green-300 active:scale-95 ${className}`}
    >
        <FaGooglePlay className="shrink-0" size={11} />
        Get the App
    </Link>
);

/**
 * A full-width promotional section encouraging users to download the app.
 * Place this on the homepage above the footer.
 */
export const GooglePlayBanner = () => (
    <div className="mx-4 my-8 flex flex-col items-center gap-4 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-950/30 to-emerald-900/10 px-6 py-8 text-center dark:border-green-500/30 dark:from-green-950/50 dark:to-emerald-950/30 lg:mx-auto lg:max-w-2xl">
        {/* Icon row */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
            <FaGooglePlay size={28} />
        </div>

        <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                JNTUH Connect — Official App
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get instant results, notifications &amp; syllabus — right on your phone.
            </p>
        </div>

        <Link
            href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download JNTUH Connect on Google Play"
        >
            {/* Official-style Google Play badge */}
            <div className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 transition-transform hover:scale-105 active:scale-95">
                <FaGooglePlay className="text-white" size={22} />
                <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400">
                        Get it on
                    </span>
                    <span className="block text-base font-semibold text-white">
                        Google Play
                    </span>
                </div>
            </div>
        </Link>
    </div>
);

export default GooglePlayBanner;
