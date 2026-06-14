import Link from "next/link";
import { ChevronRight } from "lucide-react";

const telegramChannels = [
  {
    href: "https://t.me/s/jntuhvercel",
    name: "JNTUH Connect",
    description:
      "Get instant alerts when JNTUH exam results are published — never miss an update.",
    tag: "Results",
  },
];

const whatsappChannel = {
  href: "https://chat.whatsapp.com/EBIhYt8Jt9rJFNrgUsbmiR",
  name: "JNTUH Connect",
  description:
    "Join the WhatsApp channel for quick result alerts and important university updates.",
};

const creatorInstagram = {
  href: "https://www.instagram.com/__thilak_reddy__/",
  name: "@__thilak_reddy__",
  description:
    "Follow the creator on Instagram for behind-the-scenes updates and tech content.",
};

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ChannelsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-2xl lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          Channels
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 tracking-widest uppercase">
          Stay connected &amp; never miss an update
        </p>
      </div>

      {/* Telegram Section */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-sky-500">
            <TelegramIcon />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Telegram
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {telegramChannels.map((channel) => (
            <Link
              key={channel.href}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="group rounded-2xl border border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-900/10 px-5 py-4
                              hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 text-sky-500">
                    <TelegramIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-bold text-base text-gray-800 dark:text-gray-100">
                        {channel.name}
                      </h2>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                        {channel.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="mt-1 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="mb-10 mt-5">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-green-500">
            <WhatsAppIcon />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            WhatsApp
          </span>
        </div>
        <Link
          href={whatsappChannel.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="group rounded-2xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/10 px-5 py-4
                          hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0 text-green-500">
                <WhatsAppIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-1">
                  {whatsappChannel.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {whatsappChannel.description}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="mt-1 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-[#09090b] px-3 text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            Creator
          </span>
        </div>
      </div>

      {/* Creator Instagram */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-pink-500">
            <InstagramIcon />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Instagram
          </span>
        </div>
        <Link
          href={creatorInstagram.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="group rounded-2xl border border-pink-200 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-900/10 px-5 py-4
                          hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0 text-pink-500">
                <InstagramIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-1">
                  {creatorInstagram.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {creatorInstagram.description}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="mt-1 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
