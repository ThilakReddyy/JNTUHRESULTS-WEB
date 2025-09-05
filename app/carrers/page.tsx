"use client";

import { useCallback, useEffect, useState } from "react";
import CareerFilters from "@/components/carrers/carrerfilters";
import axios from "axios";
import Jobs from "@/components/carrers/jobs";
import { Skeleton } from "@/components/ui/skeleton";
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

const Carrers = () => {
  const [jobs, setJobs] = useState<JobDetail[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const [form, setForme] = useState<{ [key: string]: string }>({
    job: "fulltime",
    title: "",
    type: "",
    experience: "",
    location: "India",
    company: "",
    status: "",
    dateposted: "",
  });

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        if (page <= 1) setIsLoading(true);
        var pagination = "page=" + page + "&pageSize=" + pageSize;
        var query = "";
        if (form.job == "intern") {
          query += "&experience_word=intern";
        }
        if (form.type !== "") {
          query += "&remote=" + form.type;
        }
        if (form.experience !== "" && form.job !== "intern") {
          query += "&experience=" + form.experience;
        }
        if (form.location !== "") {
          query += "&location_name=" + form.location;
        }
        if (form.status != "") {
          query += "&expired=" + form.status;
        }
        if (form.company !== "") {
          query += "&company=" + form.company;
        }
        if (form.date_posted !== "") {
          query += "&date_filter=" + form.title;
        }
        if (form.title !== "") {
          query += "&title=" + form.title;
        }

        const url =
          "https://jobss.up.railway.app/job_opportunities?" +
          pagination +
          query;
        const response = await axios.get(url);
        if (response.status === 200) {
          setTotalPages(response.data.totalPages);
          setPage(response.data.currentPage);
          setPageSize(response.data.pageSize);
          if (page > 1) {
            setJobs((jobs) => [...jobs, ...response.data.jobs]);
          } else {
            setJobs(response.data.jobs);
          }
        }
      } catch (err) {
        console.log("Error occured while fetching jobs");
      }
      setIsLoading(false);
    };
    if (page == 1) {
      getJobDetails();
    }

    setPage(1);
  }, [form]);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        if (page <= 1) setIsLoading(true);
        var pagination = "page=" + page + "&pageSize=" + pageSize;
        var query = "";
        if (form.job == "intern") {
          query += "&experience_word=intern";
        }
        if (form.type !== "") {
          query += "&remote=" + form.type;
        }
        if (form.experience !== "") {
          query += "&experience=" + form.experience;
        }
        if (form.location !== "") {
          query += "&location_name=" + form.location;
        }
        if (form.status != "") {
          query += "&expired=" + form.status;
        }
        if (form.company !== "") {
          query += "&company=" + form.company;
        }
        if (form.title !== "") {
          query += "&title=" + form.title;
        }
        const url =
          "https://jobss.up.railway.app/job_opportunities?" +
          pagination +
          query;
        const response = await axios.get(url);
        if (response.status === 200) {
          setTotalPages(response.data.totalPages);
          setPage(response.data.currentPage);
          setPageSize(response.data.pageSize);
          if (page > 1) {
            setJobs((jobs) => [...jobs, ...response.data.jobs]);
          } else {
            setJobs(response.data.jobs);
          }
        }
      } catch (err) {
        console.log("Error occured while fetching jobs");
      }
      setIsLoading(false);
    };

    getJobDetails();
  }, [page, pageSize]);

  const incrementPage = () => {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] ">
      {/* <div className=" text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]"> */}
      {/*   <div className="text-center font-bold py-5 text-xs lg:text-2xl"> */}
      {/*     JOBS & CARRERS */}
      {/*   </div> */}
      {/* </div> */}

      <div className="flex  flex-col   items-center lg:w-[calc(100vw-272px)]  gap-2 m-2">
        <CareerFilters form={form} setForm={setForme} />

        {isLoading ? (
          <>
            <div className="w-full flex gap-2 lg:mr-2">
              <div className="overflow-y-auto dark:bg-gray-800 rounded bg-gray-50   p-2 w-full lg:max-w-[420px] border-gray-400 h-[83vh] flex">
                <div className="w-full justify-start">
                  {Array.from({ length: 10 }, (_, index) => (
                    <div
                      key={index}
                      className="rounded md:cursor-pointer mb-4 bg-white dark:bg-gray-900 border border-[#dadce0] p-4 gap-6 flex flex-col"
                    >
                      <div className="flex text-sm justify-between font-medium">
                        <Skeleton className="h-6 w-[250px]" />
                        <div>
                          <Skeleton className="h-6 w-[20px]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-10 mr-4">
                        <div className="flex gap-2 text-xs font-normal justify-center">
                          <Skeleton className="h-6 w-[20px]" />
                          <Skeleton className="h-6 w-[100px]" />
                        </div>
                        <div className="flex gap-1 text-xs font-normal justify-center">
                          <Skeleton className="h-6 w-[20px]" />
                          <Skeleton className="h-6 w-[100px]" />
                        </div>
                      </div>
                      <div className="text-xs flex">
                        <Skeleton className="w-[120px] h-[35px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Jobs
            jobDetails={jobs}
            incrementPage={incrementPage}
            canIncrement={page < totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default Carrers;
