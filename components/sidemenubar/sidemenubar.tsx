"use client";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navitems } from "@/constants/navitems";
import { socialMediaItems } from "@/constants/socialmediaitems";
import { ModeToggleMobile } from "../ui/toggle";
import { useState } from "react";

const SideMenubar = () => {
  const { sidebar, toggleSidebar } = useSidebarContext();
  const pathname = usePathname();
  const [toggleResult, setToggleResult] = useState(false);

  const getButtonClass = (href: string) => {
    const path = "/" + pathname.split("/")[1];

    return `flex w-full  text-sm items-center gap-4 py-3.5 px-3 hover:bg-muted rounded-lg transition-background group ${
      href === path ? "text-primary bg-muted" : "text-muted-foreground"
    } font-medium`;
  };

  return (
    <nav
      className={` h-full flex flex-col w-full lg:w-64 fixed inset-y-0 bg-white dark:bg-[#181A20]  pt-16 transition-all duration-150 ease-in ${
        sidebar ? "left-0 shadow-xl" : "-left-full"
      } lg:left-0 z-10`}
    >
      <div className="overflow-y-auto h-full flex flex-col z-[99]  lg:border-r">
        <div className="flex flex-col  lg:w-full  ">
          <div className="flex flex-col w-full space-y-1.5 p-3">
            {navitems.map((navitem, index: number) => {
              const isArray = Array.isArray(navitem);

              if (isArray) {
                return (
                  <div className="" key={index}>
                    <div
                      className="flex flex-1 w-full text-sm items-center gap-4  hover:bg-muted rounded-lg transition-background
                      group text-muted-foreground font-medium py-4 px-3 mb-1 cursor-pointer"
                      onClick={() => {
                        setToggleResult(!toggleResult);
                      }}
                    >
                      {navitem[0].image}
                      <span className="flex-grow">{navitem[0].title}</span>
                      <div className="">
                        {toggleResult ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-right"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      className={`px-3 border-l-2 mx-5 ${toggleResult ? "block" : "hidden"}`}
                    >
                      {navitem.map((item, index) => {
                        const path = "/" + pathname.split("/")[1];

                        if (index == 0) {
                          return;
                        }
                        return (
                          <Link
                            href={item?.href}
                            key={item.href}
                            onClick={() => {
                              if (pathname !== item.href) {
                                toggleSidebar();
                              }
                            }}
                            className={` pl-4  flex w-full text-sm items-center gap-4 px-2 py-3 hover:bg-muted rounded-lg transition-background group text-muted-foreground text-medium
                                 ${item.href === path ? "text-primary bg-muted" : "text-muted-foreground"}`}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
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
                );
              }
            })}
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
