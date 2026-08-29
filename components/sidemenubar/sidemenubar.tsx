"use client";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navitems } from "@/constants/navitems";
import { socialMediaItems } from "@/constants/socialmediaitems";
import { ModeToggleMobile } from "../ui/toggle";
import { useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  useMobilePlatform,
} from "@/customhooks/appdownloadhook";

const SideMenubar = () => {
  const { sidebar, toggleSidebar, collapsed, toggleCollapsed, hydrated } =
    useSidebarContext();
  const pathname = usePathname();
  const [toggleResult, setToggleResult] = useState(false);
  const isIOS = useMobilePlatform() === "ios";

  const getButtonClass = (href: string) => {
    const path = "/" + pathname.split("/")[1];

    return `flex w-full border border-transparent text-sm items-center gap-4 py-3.5 px-3 hover:border-border hover:border-x-0 hover:bg-muted transition-colors group ${
      href === path
        ? "border-border text-primary bg-muted"
        : "text-muted-foreground"
    } sidebar-item font-medium`;
  };

  return (
    <nav
      id="app-sidebar"
      className={`fixed inset-y-0 flex h-full w-full flex-col bg-background pt-16 transition-[left] duration-200 ease-out ${
        sidebar ? "left-0 " : "-left-full"
      } lg:left-0 z-40`}
    >
      <div className="overflow-y-auto h-full flex flex-col z-[99]  lg:border-r">
        <div className="sidebar-section hidden lg:flex border-b border-border p-2">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-controls="app-sidebar"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="sidebar-item flex w-full items-center gap-3 border border-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
          >
            <span className="sidebar-icon">
              {collapsed ? (
                <PanelLeftOpen size={18} aria-hidden="true" />
              ) : (
                <PanelLeftClose size={18} aria-hidden="true" />
              )}
            </span>
            <span className="sidebar-label">Collapse</span>
          </button>
        </div>
        <div className="flex flex-col lg:w-full  ">
          <div className="sidebar-section flex flex-col w-full space-y-1.5 p-3">
            {navitems.map((navitem, index: number) => {
              const isArray = Array.isArray(navitem);

              if (isArray) {
                return (
                  <div className="" key={index}>
                    <div
                      className="sidebar-item mb-1 flex w-full flex-1 cursor-pointer items-center gap-4 border border-transparent px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted"
                      title={collapsed ? navitem[0].title : undefined}
                      onClick={() => {
                        // On the rail there is nowhere to show the submenu, so
                        // open the sidebar and reveal it in one click.
                        if (collapsed) {
                          toggleCollapsed();
                          setToggleResult(true);
                          return;
                        }
                        setToggleResult(!toggleResult);
                      }}
                    >
                      <span className="sidebar-icon">{navitem[0].image}</span>
                      <span className="sidebar-label flex-grow">
                        {navitem[0].title}
                      </span>
                      <div className="sidebar-label">
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
                      className={`sidebar-subnav px-3 border-l-2  mx-5 ${toggleResult ? "block" : "hidden"}`}
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
                            className={` my-1 flex w-full items-center gap-4 border border-transparent px-2 py-3 pl-4 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted group text-medium
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
                    title={collapsed ? navitem.title : undefined}
                  >
                    <span className="sidebar-icon">{navitem.image}</span>
                    <span className="sidebar-label">{navitem.title}</span>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 md:hidden">
        <Link
          href={isIOS ? APP_STORE_URL : PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            isIOS
              ? "Download JNTUH Connect on the App Store"
              : "Download JNTUH Connect on Google Play"
          }
          className={`flex w-full items-center gap-3 border px-4 py-3 transition-colors active:scale-[0.98] ${
            isIOS
              ? "border-gray-500/30 bg-gray-500/10 hover:bg-gray-500/20"
              : "border-green-500/30 bg-green-500/10 hover:bg-green-500/20"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-black">
            {isIOS ? (
              <FaApple className="text-white" size={18} />
            ) : (
              <FaGooglePlay className="text-white" size={16} />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              JNTUH Connect
            </p>
            <p
              className={`text-[10px] leading-tight ${
                isIOS
                  ? "text-gray-600 dark:text-gray-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {isIOS ? "Download on the App Store" : "Get it on Google Play"}
            </p>
          </div>
        </Link>
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
            © {new Date().getFullYear()} jntuhconnect.dhethi.com
          </div>
        </div>
      </footer>
    </nav>
  );
};

export default SideMenubar;
