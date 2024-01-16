import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Carrers = () => {
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
            <div className=" rounded drop-shadow-2xl border-2 border-[#dadce0] shadow-xl p-4 lg:p-8">
              <div
                className=" lg:text-[24px] font-medium max-w-[70%]"
                id="title"
              >
                Software Student Training in Engineering Program (STEP) Intern,
                2024
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
                  <div className="pl-1 lg:pl-2 text-xs lg:text-lg">Google</div>
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
                    Hyderabad, Telangana;
                    <span className="hidden md:block">
                      Bangalore, Karnataka;
                    </span>
                    <span>+1 more</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button>
                  <Link
                    href="https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024"
                    target="_blank"
                  >
                    Apply
                  </Link>
                </Button>
              </div>
              <div className="text-black-700 mt-4">Last Date: 19-JAN-2024</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Carrers;
