"use client";
import { Building2Icon, MapIcon, MapPinIcon, Share2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

interface JobDetail {
  job_id: string;
  title: string;
  company: string;
  experience: number;
  experience_word: string;
  remote: string;
  posted_date: string; // ISO 8601 date string
  link: string;
  expired: boolean;
  locations: string[];
  abouts: string[];
  qualifications: string[];
  responsibilities: string[];
  preferredqualifications: string[];
  minqualifications: string[];
}

interface JobsProps {
  jobDetails: JobDetail[];
  canIncrement: Boolean;
  incrementPage: () => void;
}

const Jobs: React.FC<JobsProps> = ({
  jobDetails,
  canIncrement,
  incrementPage,
}) => {
  const [selectedJob, setSelectedJob] = useState<JobDetail | null>(null);

  const scrollableRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (jobDetails.length > 0) {
      setSelectedJob(jobDetails[0]);
    }
  }, [jobDetails]);
  useEffect(() => {
    const scrollableElement = scrollableRef.current;

    const handleScroll = () => {
      if (
        scrollableElement &&
        scrollableElement.scrollHeight - scrollableElement.scrollTop ===
          scrollableElement.clientHeight
      ) {
        onScrollEnd();
      }
    };

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup listener on unmount
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const onScrollEnd = () => {
    incrementPage();
    // Add your logic here
  };

  if (jobDetails.length === 0) {
    return <div className="text-x mt-16">No Internships or Jobs to show</div>;
  }

  return (
    <div className="w-full flex gap-2 lg:mr-2">
      <div
        className="overflow-y-auto dark:bg-gray-800 rounded bg-gray-50   p-2 w-full lg:max-w-[420px] border-gray-300 h-[83vh] flex "
        ref={scrollableRef}
      >
        <div className="w-full justify-start">
          {jobDetails.map((jobDetail) => (
            <div
              key={jobDetail.job_id}
              onClick={() => {
                setSelectedJob(jobDetail);
              }}
              className={`rounded  md:cursor-pointer mb-4 bg-white dark:bg-gray-900 border border-[#dadce0] p-4 gap-6 flex flex-col   ${
                selectedJob?.job_id === jobDetail.job_id
                  ? "lg:border-blue-500"
                  : ""
              }`}
            >
              <div className="flex text-sm justify-between font-medium">
                <div>{jobDetail.title}</div>
                <div className="cursor-pointer">
                  <Share2Icon size={16} />
                </div>
              </div>
              <div className="flex items-center gap-10 mr-4   ">
                {" "}
                <div className="flex gap-2 text-xs  font-normal justify-center">
                  {" "}
                  <Building2Icon size={16} /> <span>{jobDetail.company}</span>{" "}
                </div>
                {jobDetail.locations.length > 0 && (
                  <div className="flex gap-1 text-xs  font-normal justify-center">
                    <MapPinIcon size={16} />
                    <span>{jobDetail.locations[0]}</span>
                  </div>
                )}
              </div>
              <div className=" text-xs flex">
                <Button className="text-xs w-[80px] h-[35px] ">
                  <Link href={jobDetail.link} target="_blank">
                    Apply
                  </Link>
                </Button>
                <Drawer>
                  <DrawerTrigger>
                    <div className="text-xs inline-flex items-center justify-center whitespace-nowrap rounded  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  disabled:opacity-50 lg:hidden ml-4 px-4  h-[35px] py-[10px] border-solid border border-black  hover:bg-gray-300 dark:border-white dark:hover:bg-gray-700  ">
                      Learn more
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="h-auto max-h-[85vh] lg:hidden ">
                    <DrawerHeader className="flex justify-between border-b">
                      <div
                        className="flex flex-col gap-2
                        "
                      >
                        <div className="flex">
                          <div className="ml-2  mr-4 mb-2 border p-2 rounded flex justify-center items-center w-[80px] h-[80px]">
                            <Image
                              src={`/${jobDetail.company.toLowerCase()}icon.png`}
                              width={50}
                              height={50}
                              alt={jobDetail.company}
                            />
                          </div>
                          <DrawerTitle className="text-left leading-6 flex items-center mb-8">
                            {jobDetail.title}
                          </DrawerTitle>
                        </div>
                        <div className="ml-2 flex items-center gap-6  text-muted-foreground">
                          <div className="flex gap-2 text-xs  font-normal justify-center">
                            <Building2Icon size={16} />
                            <span>{jobDetail.company}</span>
                          </div>
                          {jobDetail.locations.length > 0 && (
                            <div className="flex gap-1 text-xs  font-normal justify-center">
                              <MapPinIcon size={16} />
                              <span>{jobDetail.locations[0]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </DrawerHeader>
                    <div className="overflow-auto h-auto">
                      <div className="m-2 rounded bg-gray-50 dark:bg-gray-800 p-2">
                        <p className="text-base tracking-normal underline underline-offset-2 font-semibold">
                          Job Description
                        </p>
                        <div className="mt-4">
                          <p className="font-semibold tracking-normal text-sm">
                            Responsibilities:
                          </p>
                          <ul className="list-disc pl-4">
                            {jobDetail.responsibilities.map(
                              (responsibility: string, index: number) => {
                                return (
                                  <li className="text-xs pt-2" key={index}>
                                    {responsibility}
                                  </li>
                                );
                              },
                            )}
                          </ul>
                        </div>
                        {jobDetail.qualifications.length !== 0 && (
                          <div className="mt-4">
                            <p className="font-semibold tracking-normal text-sm">
                              Qualifications:
                            </p>
                            <ul className="list-disc pl-4">
                              {jobDetail.qualifications.map(
                                (qualification: string, index: number) => {
                                  return (
                                    <li className="text-xs pt-2" key={index}>
                                      {qualification}
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        )}
                        {jobDetail.minqualifications.length !== 0 && (
                          <div className="mt-4">
                            <p className="font-semibold tracking-normal text-sm">
                              Minimum Qualifications:
                            </p>
                            <ul className="list-disc pl-4">
                              {jobDetail.minqualifications.map(
                                (qualification: string, index: number) => {
                                  return (
                                    <li className="text-xs pt-2" key={index}>
                                      {qualification}
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        )}

                        {jobDetail.preferredqualifications.length !== 0 && (
                          <div className="mt-4">
                            <p className="font-semibold tracking-normal text-sm">
                              Preferred Qualifications:
                            </p>
                            <ul className="list-disc pl-4">
                              {jobDetail.preferredqualifications.map(
                                (qualification: string) => {
                                  return (
                                    <li
                                      className="text-xs pt-2"
                                      key={qualification}
                                    >
                                      {qualification}
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="m-2 rounded bg-gray-50 dark:bg-gray-800 p-2">
                        <p className="text-base tracking-normal underline underline-offset-2 font-semibold">
                          About
                        </p>
                        <div className="pl-2 text-xs text-justify">
                          {jobDetail.abouts.map(
                            (about: string, index: number) => {
                              return (
                                <p
                                  className="pt-2"
                                  key={index}
                                  dangerouslySetInnerHTML={{ __html: about }}
                                ></p>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bottom-0 h-36 border-t-[1px] dark:border-t-yellow-50 m-0 py-2 text-center">
                      <Link href={jobDetail.link} target="_blank">
                        <Button className="w-[80%] " onClick={() => {}}>
                          Apply
                        </Button>
                      </Link>
                    </div>
                  </DrawerContent>
                </Drawer>
                <div className="justify-end w-full flex items-end text-[8px]">
                  {jobDetail.expired && (
                    <div className="text-red-800 rounded  py-1 px-2 bg-red-300">
                      Expired
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            className={`w-full flex justify-center ${canIncrement ? "" : "hidden"}`}
          >
            <Button
              variant="ghost"
              className="bg-gray-500 mb-2 text-white px-2 rounded py-2 text-xs h-fit"
              onClick={() => incrementPage()}
            >
              Load more
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full hidden lg:block">
        <div className="hidden lg:block w-full  overflow-y-auto h-[83vh]  rounded-b ">
          <div className="pb-2 rounded-b border-t-4 border-t-blue-500 border border-gray-300 dark:bg-gray-900  w-full bg-gray-100 ">
            <div className="m-8 mr-4 flex">
              <div className="border-gray-500 dark:bg-gray-900 border  h-fit min-h-[120px] min-w-[120px] items-center flex bg-white p-4 w-fit rounded">
                <Image
                  src={`/${selectedJob?.company.toLowerCase()}icon.png`}
                  width={80}
                  height={80}
                  alt={`${selectedJob?.company.toLowerCase()}icon`}
                />
              </div>
              <div className="text-lg font-medium ml-8 flex items-center">
                <div>
                  <div>{selectedJob?.title}</div>
                  <div className="flex items-center my-1 justify-start w-full font-light text-base">
                    <Building2Icon size={16} />
                    <div className="text-sm font-normal ml-1">
                      {selectedJob?.company}
                    </div>
                  </div>
                  <div
                    className={`flex  my-2 h-fit justify-start  w-full font-light text-base `}
                  >
                    <div className="h-full pt-1">
                      <MapPinIcon className="flex justify-start" size={16} />
                    </div>
                    <div className="pl-1 text-sm lg:pl-2 w-full  grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4">
                      {selectedJob?.locations.map((location: string) => {
                        return <span key={location}>{location};&nbsp; </span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-500 pr-4 pt-2 flex justify-end w-full">
              <Link
                href={selectedJob ? selectedJob?.link : "#"}
                target="_blank"
              >
                <Button className="w-[180px]">Apply</Button>
              </Link>
            </div>
          </div>
          <div className=" my-1">
            <div
              className={`border border-gray-300 p-8 rounded-b my-1 dark:bg-gray-900 rounded  w-full bg-gray-100 ${selectedJob?.qualifications.length === 0 && selectedJob?.minqualifications.length === 0 && selectedJob?.preferredqualifications.length === 0 && "hidden"}`}
            >
              {selectedJob?.qualifications.length !== 0 && (
                <div>
                  <div>
                    <div className="font-semibold  text-lg">
                      Qualifications:
                    </div>
                    <ul className="list-disc pl-8 pt-2">
                      {selectedJob?.qualifications.map(
                        (qualification: string) => {
                          return <li key={qualification}>{qualification}</li>;
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
              {selectedJob?.minqualifications.length !== 0 && (
                <div>
                  <div className="font-semibold  text-lg">
                    Minimum qualifications:
                  </div>
                  <ul className="list-disc pl-8 pt-2">
                    {selectedJob?.minqualifications.map(
                      (qualification: string) => {
                        return <li key={qualification}>{qualification}</li>;
                      },
                    )}
                  </ul>
                </div>
              )}
              {selectedJob?.preferredqualifications.length !== 0 && (
                <div>
                  <div className="font-semibold  text-lg pt-4">
                    Preferred qualifications:
                  </div>
                  <ul className="list-disc pl-8 pt-2">
                    {selectedJob?.preferredqualifications.map(
                      (qualification: string) => {
                        return <li key={qualification}>{qualification}</li>;
                      },
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className=" p-8 rounded-b border border-gray-300 my-1 dark:bg-gray-900 rounded  w-full bg-gray-100 ">
              <div className="font-semibold  text-lg"> About the job:</div>
              <ul className=" pl-4 pt-1">
                {selectedJob?.abouts.map((qualification: string) => {
                  return (
                    <li
                      key={qualification}
                      className="pt-2"
                      dangerouslySetInnerHTML={{ __html: qualification }}
                    ></li>
                  );
                })}
              </ul>
            </div>
            <div
              className={` p-8 pt-4 border border-gray-300 rounded-b my-1 dark:bg-gray-900 rounded  w-full bg-gray-100 ${selectedJob?.responsibilities.length === 0 && "hidden"}`}
            >
              <div className="font-semibold  text-lg">Responsibilities</div>
              <ul className=" pl-8 pt-1 list-disc">
                {selectedJob?.responsibilities.map((responsibility: string) => {
                  return <li key={responsibility}>{responsibility}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
