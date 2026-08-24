"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SidebarContextprops {
  /** Mobile off-canvas drawer state. */
  sidebar: boolean;
  toggleSidebar: () => void;
  /** Desktop rail state: true renders the icon-only rail. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** False until the stored preference has been read, so the first paint does not animate. */
  hydrated: boolean;
}

const COLLAPSED_STORAGE_KEY = "sidebarCollapsed";

const SidebarContext = createContext<SidebarContextprops | undefined>(
  undefined,
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // The inline script in the root layout has already applied the stored
  // preference to <html data-sidebar> before first paint. Mirror it into React
  // state so labels and icons match what CSS is painting; the width itself
  // never changes here, so nothing animates on load.
  useEffect(() => {
    setCollapsed(document.documentElement.dataset.sidebar === "collapsed");
    setHydrated(true);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebar((prevsidebar) => !prevsidebar);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prevCollapsed) => {
      const next = !prevCollapsed;

      // Keep the attribute authoritative: it drives the widths in CSS and is
      // what the next page load reads back before painting.
      document.documentElement.dataset.sidebar = next
        ? "collapsed"
        : "expanded";

      try {
        localStorage.setItem(COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // The preference simply will not survive this session.
      }

      return next;
    });
  }, []);

  const value: SidebarContextprops = {
    sidebar,
    toggleSidebar,
    collapsed,
    toggleCollapsed,
    hydrated,
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
