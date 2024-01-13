import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
  redirect("/");
};

export default NotFound;
