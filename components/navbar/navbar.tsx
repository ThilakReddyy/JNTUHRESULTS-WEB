"use client";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineGithub } from "react-icons/ai";
import {
  MdNotificationsActive,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { ModeToggle } from "../ui/toggle";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import { useNavBarContext } from "@/customhooks/navbarhook";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  const { toggleSidebar } = useSidebarContext();
  const { navbar } = useNavBarContext();
  return (
    <nav
      className={`fixed inset-y-0 h-16 w-full z-50 p-4 px-4 lg:px-8  dark:bg-[#09090B] bg-white grid grid-cols-3 lg:grid-cols-2 border-b ${
        navbar ? "block" : "hidden"
      }`}
    >
      <div className="justify-start flex items-center lg:hidden cursor-pointer">
        <button
          onClick={toggleSidebar}
          className="curso-pointer"
          aria-label="sidebarhook"
          role="button"
        >
          <HiOutlineBars3BottomLeft size={26} />
        </button>
      </div>
      <Link
        className="flex justify-center lg:justify-start items-center cursor-pointer"
        href="/"
      >
        <div className="md:hidden">
          <span className="dark:hidden">
            <Image
              src="/jntuhresults.png"
              alt="jntuhresults_logo"
              width={65}
              height={40}
              priority={false}
            />
          </span>
          <span className="hidden dark:block">
            <Image
              src="/jntuhresults_black.png"
              alt="jntuhresults_logo"
              width={65}
              height={40}
              priority={false}
            />
          </span>
        </div>
        <div className="hidden md:block">
          <span className="dark:hidden">
            <Image
              src="/jntuhresults_md.png"
              alt="jntuhresults_logo"
              width={130}
              height={80}
              priority={false}
            />
          </span>
          <span className="hidden dark:block">
            <Image
              src="/jntuhresults_md_black.png"
              alt="jntuhresults_logo"
              width={130}
              height={80}
              priority={false}
            />
          </span>
        </div>
      </Link>
      <div className="flex justify-end items-center">
        <span className="flex gap-4 items-center">
          <span className="hidden items-center md:block">
            <ModeToggle />
          </span>
          {path === "/notifications" ? (
            <Link href="/" aria-label="home link">
              <MdOutlineNotificationsActive size={24} />
            </Link>
          ) : (
            <Link href="/notifications" aria-label="notifications link">
              <MdNotificationsActive size={24} />
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
