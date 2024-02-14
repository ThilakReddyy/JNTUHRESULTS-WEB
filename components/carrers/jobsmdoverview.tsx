"use client";
import React from "react";
import { DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface jobprops {
  title: string;
  company: string;
  link: string;
  locations: string[];
  qualifications: string[];
  minqualifications: string[];
  preferredqualifications: string[];
  experience: number;
  responsibilities: string[];
  about: string[];
}
const JobsmdOverview = ({ selectedjob }: jobprops | any) => {
  return (
    <div className="lg:hidden">
      <DrawerContent className="h-auto max-h-[85vh] lg:hidden ">
        <DrawerHeader className="border-b  border-gray-200 ">
          <div className="flex">
            <div className="ml-2  mr-4 flex items-center min-w-[60px]">
              <Image
                src={`/${selectedjob.company.toLowerCase()}icon.png`}
                width={80}
                height={80}
                alt={selectedjob.company}
              />
            </div>
            <DrawerTitle className="text-left leading-6 flex items-center mb-8">
              {selectedjob.title}
            </DrawerTitle>
          </div>
          <div className="flex text-muted-foreground">
            <div className="ml-2">
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
                  className="md:hidden lucide lucide-building-2"
                >
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>
                <div className="pl-1 lg:pl-2 text-xs lg:text-lg">
                  {selectedjob.company}
                </div>
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
                  className="md:hidden ml-4 lucide lucide-map-pin"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="pl-1 text-xs lg:text-lg lg:pl-2 flex">
                  {selectedjob.locations[0]}
                </div>
              </div>
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
                {selectedjob.responsibilities.map(
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
            {selectedjob.qualifications.length !== 0 && (
              <div className="mt-4">
                <p className="font-semibold tracking-normal text-sm">
                  Qualifications:
                </p>
                <ul className="list-disc pl-4">
                  {selectedjob.qualifications.map(
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
            {selectedjob.minqualifications.length !== 0 && (
              <div className="mt-4">
                <p className="font-semibold tracking-normal text-sm">
                  Minimum Qualifications:
                </p>
                <ul className="list-disc pl-4">
                  {selectedjob.minqualifications.map(
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

            {selectedjob.preferredqualifications.length !== 0 && (
              <div className="mt-4">
                <p className="font-semibold tracking-normal text-sm">
                  Preferred Qualifications:
                </p>
                <ul className="list-disc pl-4">
                  {selectedjob.preferredqualifications.map(
                    (qualification: string) => {
                      return (
                        <li className="text-xs pt-2" key={qualification}>
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
              {selectedjob.about.map((about: string, index: number) => {
                return (
                  <p
                    className="pt-2"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: about }}
                  ></p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bottom-0 h-36 border-t-[1px] dark:border-t-yellow-50 m-0 py-2 text-center">
          <Link href={selectedjob.link} target="_blank">
            <Button className="w-[80%] " onClick={() => {}}>
              Apply
            </Button>
          </Link>
        </div>
      </DrawerContent>
    </div>
  );
};
export default JobsmdOverview;
