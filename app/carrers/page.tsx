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
              <div className="overflow-y-auto dark:bg-gray-800 rounded bg-gray-50  p-2 w-full lg:max-w-[420px] border-gray-400 h-[79.5vh]">
                {internships.map((internship: any) => {
                  return (
                    <div
                      key={internship.title}
                      className="rounded mb-4  bg-white dark:bg-gray-900 lg:border-blue-500 border-2 border-[#dadce0]  p-4 "
                    >
                      <div className="flex">
                        <div className="justify-start  font-medium max-w-[70%]">
                          {internship.title}
                        </div>
                        <div className="w-[100%] flex justify-end ">
                          <svg
                            onClick={() =>
                              shareUrl(
                                "https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024",
                                "Software Student Training in Engineering Program (STEP)Intern, 2024",
                              )
                            }
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

                          <div className="pl-1 lg:pl-2 text-xs ">
                            {internship.company}
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
                            className=" ml-6 lucide lucide-map-pin"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>

                          <div className="pl-1 text-xs lg:pl-2 flex">
                            {internship.locations[0]}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs flex">
                        <Button className="text-xs">
                          <Link
                            href="https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024"
                            target="_blank"
                          >
                            Apply
                          </Link>
                        </Button>
                        <DrawerTrigger className="lg:hidden ml-4 px-4 py-[10px] border border-black rounded hover:bg-gray-400 dark:border-white dark:hover:bg-gray-700">
                          Learn more
                        </DrawerTrigger>

                        <button className="lg:block hidden ml-4 px-4 py-[10px] border border-black rounded hover:bg-gray-400 dark:border-white dark:hover:bg-gray-700">
                          Learn more
                        </button>
                      </div>
                    </div>
                  );
                })}

                <DrawerContent className="h-auto max-h-[85vh] lg:hidden ">
                  <DrawerHeader className="border-b  border-gray-200 ">
                    <div className="flex">
                      <div className="ml-2  mr-4 flex items-center">
                        <Image
                          src="/googleicon.png"
                          width={150}
                          height={500}
                          alt="nothing"
                        />
                      </div>
                      <DrawerTitle className="text-left leading-6">
                        Software Student Training in Engineering Program (STEP)
                        Intern, 2024
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
                            Google
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
                            Hyderabad, Telangana &nbsp;
                            <span className="hidden md:block">
                              Bangalore, Karnataka;
                            </span>
                            <span>& more</span>
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
                          <li className="text-xs pt-2">
                            Specific responsibilities vary by project area.
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold tracking-normal text-sm">
                          Minimum Qualifications:
                        </p>
                        <ul className="list-disc pl-4">
                          <li className="text-xs pt-2 ">
                            Currently enrolled in a Bachelor&apos;s program,
                            majoring or intending to major in Computer Science
                            or related technical field.Specific responsibilities
                            vary by project area.
                          </li>
                          <li className="text-xs pt-2 ">
                            Experience in one or more general purpose
                            programming languages.
                          </li>
                          <li className="text-xs pt-2 ">
                            Ability to communicate in English fluently.
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold tracking-normal text-sm">
                          Preferred Qualifications:
                        </p>
                        <ul className="list-disc pl-4">
                          <li className="text-xs pt-2 ">
                            Currently enrolled in a full time degree program and
                            returning to the program after the completion of the
                            internship
                          </li>
                          <li className="text-xs pt-2 ">
                            Excellent programming skills (C++, Java, Python).
                          </li>
                          <li className="text-xs pt-2 ">
                            Ability to complete a full-time, 10-12 week
                            internship between May and August 2024 (exact
                            program dates will be provided at a later point in
                            the process).
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="m-2 rounded bg-gray-50 dark:bg-gray-800 p-2">
                      <p className="text-base tracking-normal underline underline-offset-2 font-semibold">
                        About
                      </p>
                      <div className="pl-2 pt-2 text-xs text-justify">
                        <p>
                          Google is invested in increasing future computer
                          scientists and software developers, particularly those
                          who are historically underrepresented in the field.
                          Many aspiring computer scientists could benefit from a
                          program that bridges the gap between academic study
                          and a professional internship. Google aims to inspire
                          these underrepresented students to continue in the
                          field with such a program.
                        </p>
                        <p className="pt-2">
                          With this in mind, Google is pleased to announce the
                          2024 STEP internship in India. It will be open to
                          under-represented groups who will be in the second
                          year of their university studies by the Summer of 2024
                          and are studying Computer Science or a related
                          subject.
                        </p>
                        <p className="pt-2">
                          This program includes three main components: a
                          software project, skills-based training, and
                          professional development. This program is open to all
                          qualified University students and is committed to
                          addressing diversity in our company and in the
                          technology industry. Students who are a member of a
                          group that is historically underrepresented in the
                          technology industry are encouraged to apply.
                        </p>
                        <p className="pt-2">
                          This summer trainee program includes a development
                          project that you will work on with a team of Googlers
                          and other STEP Interns. You will enhance your coding
                          skills, and gain exposure to tools and programming
                          languages. You will attend ongoing technical talks by
                          executive Googlers, match with a Google Engineer, to
                          guide you through your summer experience, and engage
                          in social activities, community building, and
                          networking.
                        </p>
                        <p className="pt-2">
                          Google is and always will be an engineering company.
                          We hire people with a broad set of technical skills
                          who are ready to address some of technologys greatest
                          challenges and make an impact on millions, if not
                          billions, of users. At Google, engineers not only
                          revolutionize search, they routinely work on massive
                          scalability and storage solutions, large-scale
                          applications and entirely new platforms for developers
                          around the world. From Google Ads to Chrome, Android
                          to YouTube, Social to Local, Google engineers are
                          changing the world one technological achievement after
                          another.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-0 h-36 border-t-[1px] dark:border-t-yellow-50 m-0 py-2 text-center">
                    <Button className="w-[80%] " onClick={() => {}}>
                      <Link
                        href="https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024"
                        target="_blank"
                      >
                        Apply
                      </Link>
                    </Button>
                  </div>
                </DrawerContent>
              </div>
            </Drawer>
            <div className="hidden lg:block w-full mx-4">
              <div className="pb-2 rounded-b border-t-4 border-blue-500 dark:bg-gray-900  w-full bg-gray-100 ">
                <div className="m-8 flex">
                  <div className="border-gray-500 dark:bg-gray-900 border bg-white p-4 w-fit rounded">
                    <Image
                      src="/googleicon.png"
                      width={80}
                      height={80}
                      alt="googleicon"
                    />
                  </div>
                  <div className="text-lg font-medium mx-8 flex items-center">
                    <div>
                      <div>
                        Software Student Training in Engineering Program (STEP)
                        Intern, 2024
                      </div>
                      <div className="flex items-center my-1 justify-start w-full font-light text-base">
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
                          className="lucide lucide-building-2"
                        >
                          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                          <path d="M10 6h4" />
                          <path d="M10 10h4" />
                          <path d="M10 14h4" />
                          <path d="M10 18h4" />
                        </svg>
                        <div className="text-sm font-normal ml-1">Google</div>
                      </div>
                      <div className="flex items-center my-2 justify-start w-full font-light text-base">
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
                          className="lucide lucide-map-pin"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <div className="pl-1 text-sm lg:pl-2 flex">
                          Hyderabad, Telangana; Bangalore,karnataka; Pune,
                          Maharasthra;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-gray-500 pr-4 pt-2 flex justify-end w-full">
                  <Button className="w-[150px]">Apply</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Carrers;
