"use client";
import toast from "react-hot-toast";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const socialLinks = [
  { href: "https://github.com/thilakreddyy", Icon: FaGithub },
  { href: "https://x.com/thilakreddyonly", Icon: FaXTwitter },
  { href: "https://www.instagram.com/__thilak_reddy__/", Icon: FaInstagram },
];

export default function FaqActions() {
  return <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
    <button className="border border-border px-4 py-2 text-sm" onClick={() => {
      localStorage.clear(); toast.success("Cache cleared!");
    }}>Clear Cache</button>
    {socialLinks.map(({ href, Icon }) => <a key={href} href={href}
      target="_blank" rel="noopener noreferrer" aria-label={`Developer profile on ${new URL(href).hostname}`}>
      <Icon size={18} aria-hidden="true" />
    </a>)}
  </div>;
}
