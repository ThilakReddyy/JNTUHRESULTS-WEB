"use client";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { jobDetails } from "@/constants/jobsdetails";
import JobsTemplate from "@/components/carrers/jobstemplate";
import { useState } from "react";
import JobOverview from "@/components/carrers/joboverview";
import JobsmdOverview from "@/components/carrers/jobsmdoverview";

const Carrers = () => {
  function shareUrl(link: any, title: string) {
    if (!navigator.share) return;

    const sharedText = `*Check out the JOB!!!* \n\n ${title}\n\n\n`;

    navigator
      .share({
        title: "Check out this website!",
        text: sharedText,
        url: link,
      })
      .then(() => console.log("Successfully shared!"))
      .catch((error) => console.log("Error sharing:", error));
  }
  const internships = jobDetails["internships"];
  const jobs = jobDetails["jobs"];
  const [selectedjob, setSelectedJob] = useState(jobs[0]);
  const [selectedInternship, setSelectedInternship] = useState(internships[0]);
  return (
    <>
      <div className="m-2 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
        <div className="text-center font-bold my-5 text-xs lg:text-2xl">
          JOBS & CARRERS
        </div>
      </div>
      <div className="flex justify-center mt-5 items-center">
        <Tabs defaultValue="internships" className="w-full px-2">
          <TabsList className="flex justify-center">
            <TabsTrigger value="jobs" className="w-full">
              JOBS
            </TabsTrigger>
            <TabsTrigger value="internships" className="w-full">
              Internship
            </TabsTrigger>
          </TabsList>

          <div className="dark:bg-gray-800  bg-gray-50  p-2 my-2 flex justify-center w-full lg:hidden border-gray-400 ">
            <div className="justify-center flex text-center border-red-400 py-2 rounded border-2 w-[90%] text-red-400">
              This feature is currently under development.
            </div>
          </div>
          <TabsContent value="jobs" className="lg:flex">
            <Drawer>
              <JobsTemplate
                jobs={jobs}
                selectedjob={selectedjob}
                setSelectedJob={setSelectedJob}
              />
              <JobsmdOverview selectedjob={selectedjob} />
            </Drawer>
            <JobOverview job={selectedjob} />
          </TabsContent>
          <TabsContent value="internships" className="flex">
            <Drawer>
              <JobsTemplate
                jobs={internships}
                selectedjob={selectedInternship}
                setSelectedJob={setSelectedInternship}
              />
              <JobsmdOverview selectedjob={selectedInternship} />
            </Drawer>
            <JobOverview job={selectedInternship} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Carrers;
