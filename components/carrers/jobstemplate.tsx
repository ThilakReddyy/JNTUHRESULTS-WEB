import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DrawerTrigger } from "../ui/drawer";
import { DialogTrigger } from "@radix-ui/react-dialog";
interface jobProps {
  title: string;
  company: string;
  link: string;
  locations: string[];
  minqualifications: string[];
  preferredqualifications: string[];
  experience: number;
  responsibilities: string[];
  about: string[];
}
interface jobTemplateProps {
  jobs: jobProps[];

  selectedjob: jobProps;
  setSelectedJob: Dispatch<SetStateAction<jobProps | null>> | any;
}
const JobsTemplate = ({
  jobs,
  selectedjob,
  setSelectedJob,
}: jobTemplateProps) => {
  return (
    <>
      <div className="overflow-y-auto dark:bg-gray-800 rounded bg-gray-50  p-2 w-full lg:max-w-[420px] border-gray-400 h-[79.5vh]">
        {jobs.map((job: any) => {
          return (
            <div
              onClick={() => {
                setSelectedJob(job);
              }}
              key={job.title}
              className={`rounded cursor-pointer mb-4 bg-white dark:bg-gray-900 border-2 border-[#dadce0] p-4 ${
                job === selectedjob ? "lg:border-blue-500" : ""
              }`}
            >
              <div className="flex w-full">
                <div className="justify-start  flex flex-1 font-medium  ">
                  {job.title}
                </div>
                <div className=" min-w-[10%] flex  justify-end ">
                  <svg
                    onClick={() => {}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="cursor-pointer lucide lucide-share-2"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
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
                    className=" lucide lucide-building-2"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>

                  <div className="pl-1 lg:pl-2 text-xs ">{job.company}</div>
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
                    className=" ml-6 lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  <div className="pl-1 text-xs lg:pl-2 flex">
                    {job.locations[0]}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs flex">
                <Button className="text-xs w-[100px]">
                  <Link href={job.link} target="_blank">
                    Apply
                  </Link>
                </Button>
                <DrawerTrigger className="lg:hidden ml-4 px-4 py-[10px] border border-black rounded hover:bg-gray-400 dark:border-white dark:hover:bg-gray-700">
                  Learn more
                </DrawerTrigger>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JobsTemplate;
