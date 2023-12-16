"use client";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navitems } from "@/constants/navitems";
import { socialMediaItems } from "@/constants/socialmediaitems";
import { ModeToggleMobile } from "../ui/toggle";

const SideMenubar = () => {
  const { sidebar, toggleSidebar } = useSidebarContext();
  const pathname = usePathname();

  const getButtonClass = (href: string) => {
    const path = "/" + pathname.split("/")[1];

    return `flex w-full  text-sm items-center gap-4 py-3.5 px-3 hover:bg-muted rounded-lg transition-background group ${
      href === path ? "text-primary bg-muted" : "text-muted-foreground"
    } font-medium`;
  };

  return (
    <nav
      className={` h-full flex flex-col w-full lg:w-64 fixed inset-y-0 bg-white dark:bg-black  pt-16 transition-all duration-100 ease-in ${
        sidebar ? "left-0 shadow-xl" : "-left-full"
      } lg:left-0 z-10`}
    >
      <div className=" h-full flex flex-col z-[99]  lg:border-r">
        <div className="flex flex-col  lg:w-full  ">
          <div className="flex flex-col w-full space-y-1.5 p-3">
            {navitems.map((navitem) => (
              <Link
                href={navitem.href}
                key={navitem.href}
                onClick={() => {
                  if (pathname !== navitem.href) {
                    toggleSidebar();
                  }
                }}
                className={getButtonClass(navitem.href)}
              >
                {navitem.image}
                {navitem.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className=" mb-[5px] lg:hidden flex justify-center">
        <ModeToggleMobile />
      </div>
      <footer className="lg:hidden border-t">
        <div className="bottom-0  w-full">
          <div className="flex justify-center m-2 mt-4  gap-4 text-xs text-grey-400">
            {socialMediaItems.map((socialmediaItem) => (
              <Link
                href={socialmediaItem.href}
                key={socialmediaItem.href}
                target="_blank"
                aria-label={socialmediaItem.href}
              >
                {socialmediaItem.icon}
              </Link>
            ))}
          </div>
          <div className="flex justify-center m-2 text-xs text-muted-foreground">
            © 2023 jntuhresults.vercel.app
          </div>
        </div>
      </footer>
    </nav>
  );
};

export default SideMenubar;
