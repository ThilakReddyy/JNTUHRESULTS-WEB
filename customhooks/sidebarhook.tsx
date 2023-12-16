"use client";
import { createContext, useState, ReactNode, useContext } from "react";

interface SidebarContextprops {
  sidebar: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextprops | undefined>(
  undefined,
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebar((prevsidebar) => !prevsidebar);
  };
  const value: SidebarContextprops = {
    sidebar,
    toggleSidebar,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
export const useSidebarContext = () => {
  const sidebar = useContext(SidebarContext);

  if (sidebar == undefined) {
    throw new Error("useSidecontext must be used with SidebarContext");
  }

  return sidebar;
};
