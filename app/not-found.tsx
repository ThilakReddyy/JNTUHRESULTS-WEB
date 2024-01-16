"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const NotFound = () => {
  const pagename = usePathname();
  if (pagename === "/academicreport") redirect("/academicresult");
  else redirect("/");
};

export default NotFound;
