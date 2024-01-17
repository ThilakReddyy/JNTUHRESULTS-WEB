"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

const Carrers = () => {
  function shareUrl(link: any, title: string) {
    if (!navigator.share) return;

    const sharedText = `*Check out the JOB title!* \n\n ${title}\n\n\n`;

    navigator
      .share({
        title: "Check out this website!",
        text: sharedText,
        url: link,
      })
      .then(() => console.log("Successfully shared!"))
      .catch((error) => console.log("Error sharing:", error));
  }
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
          <TabsContent value="jobs">
            <div className="flex justify-center">No Job listings yet!!</div>
          </TabsContent>
          <TabsContent value="internships">
            <Drawer>
              <div className=" rounded drop-shadow-2xl border-2 border-[#dadce0] shadow-xl p-4 lg:p-8">
                <div className="flex">
                  <div
                    className="justify-start lg:text-[24px] font-medium max-w-[70%]"
                    id="title"
                  >
                    Software Student Training in Engineering Program (STEP)
                    Intern, 2024
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
                      strokeLinejoin="round"
                      className="block cursor-pointer md:hidden lucide lucide-share-2"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hidden md:block lucide lucide-share-2"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hidden md:block lucide lucide-building-2"
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
                      className="md:hidden ml-6 lucide lucide-map-pin"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hidden md:block ml-6 lucide lucide-map-pin"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div className="pl-1 text-xs lg:text-lg lg:pl-2 flex">
                      Hyderabad, Telangana
                      <span className="hidden md:block">
                        Bangalore, Karnataka
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs">
                  <Button className="text-xs">
                    <Link
                      href="https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024"
                      target="_blank"
                    >
                      Apply
                    </Link>
                  </Button>
                  <DrawerTrigger className="lg:hidden ml-4 px-4 py-[10px] border border-black rounded hover:bg-gray-400 dark:border-white dark:hover:bg-gray-700">
                    more
                  </DrawerTrigger>
                </div>
              </div>

              <DrawerContent className="h-auto max-h-[85vh] ">
                <DrawerHeader className="border-b border-gray-200 rounded">
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
                <div className="m-2 bg-gray-50 p-2  h-auto overflow-auto">
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
                        majoring or intending to major in Computer Science or
                        related technical field.Specific responsibilities vary
                        by project area.
                      </li>
                      <li className="text-xs pt-2 ">
                        Experience in one or more general purpose programming
                        languages.
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
                        Ability to complete a full-time, 10-12 week internship
                        between May and August 2024 (exact program dates will be
                        provided at a later point in the process).
                      </li>
                    </ul>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Carrers;
