import Link from "next/link";
import { ChevronRight, MessageSquare, HelpCircle } from "lucide-react";

const cards = [
  {
    href: "/faq",
    icon: HelpCircle,
    title: "Frequent Questions",
    description: "Browse the most commonly asked questions about JNTUH results, CGPA, and how the site works.",
    color: "text-sky-500",
    border: "border-sky-200 dark:border-sky-900/40",
    bg: "bg-sky-50 dark:bg-sky-900/10",
  },
  {
    href: "https://docs.google.com/forms/d/e/1FAIpQLScFdsBs-QvzuZLxc1ZmvsUo4R2Ez1NPe0UmG7E1tgzXzKrimg/viewform",
    icon: MessageSquare,
    title: "Suggestion / Feedback",
    description: "Share feedback or ideas to help us improve your experience — every suggestion counts.",
    color: "text-violet-500",
    border: "border-violet-200 dark:border-violet-900/40",
    bg: "bg-violet-50 dark:bg-violet-900/10",
  },
];

const HelpCenter = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-2xl lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          Help Center
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 tracking-widest uppercase">
          How can we help you?
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined}>
              <div className={`group rounded-2xl border ${card.border} ${card.bg} px-5 py-5
                              hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}>
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 flex-shrink-0 ${card.color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-1">
                      {card.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <ChevronRight size={16} className="mt-1 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HelpCenter;
