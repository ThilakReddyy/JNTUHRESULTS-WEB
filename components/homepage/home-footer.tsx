import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  { label: "Help center", href: "/helpcenter" },
  { label: "FAQ", href: "/faq" },
  { label: "Channels", href: "/channels" },
  { label: "Privacy", href: "/privacy" },
];

const socials = [
  {
    href: "https://github.com/thilakreddyy",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://x.com/thilakreddyonly",
    label: "X profile",
    icon: FaXTwitter,
  },
  {
    href: "https://www.instagram.com/__thilak_reddy__/",
    label: "Instagram",
    icon: FaInstagram,
  },
];

const HomeFooter = () => {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="home-container flex flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          ))}
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} jntuhconnect.dhethi.com
          </span>
        </div>
      </div>

      <p className="home-container px-4 pb-6 text-[11px] leading-relaxed text-muted-foreground sm:px-6">
        JNTUH Connect is an independent student project. It is not affiliated
        with, endorsed by, or an official service of Jawaharlal Nehru
        Technological University, Hyderabad. Results are sourced from the
        university&apos;s public result pages; the university notification
        remains authoritative.
      </p>
    </footer>
  );
};

export default HomeFooter;
