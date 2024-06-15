"use client";
import { redirect, usePathname } from "next/navigation";

const NotFound = () => {
  const pagename = usePathname();
  if (pagename === "/academicreport") redirect("/academicresult");
  else redirect("/");
};

export default NotFound;
