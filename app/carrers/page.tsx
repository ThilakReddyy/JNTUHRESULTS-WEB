"use client";

import { useCallback, useEffect, useState } from "react";
import CareerFilters from "@/components/carrers/carrerfilters";
import axios from "axios";
import Jobs from "@/components/carrers/jobs";
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
    type: "",
    experience: "0",
    location: "India",
    company: "",
    status: "",
    dateposted: "",
  });

  const getJobDetails = useCallback(
    async (pageIncrement: number = 0) => {
      try {
        var pagination = "page=" + page + "&pageSize=" + pageSize;
        var query = "";
        if (form.job == "intern") {
          query += "&experience_word=intern";
        }
        if (form.type !== "") {
          if (form.type == "remote") {
            query += "&remote=T";
          } else {
            query += "&remote=F";
          }
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
    },
    [form, page, pageSize],
  );

  useEffect(() => {
    getJobDetails();
  }, [page, getJobDetails]);

  const incrementPage = () => {
    if (page < totalPages) {
      setPage(() => page + 1);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] ">
      <div className=" text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
        <div className="text-center font-bold py-5 text-xs lg:text-2xl">
          JOBS & CARRERS
        </div>
      </div>

      <div className="flex  flex-col   items-center lg:w-[calc(100vw-272px)]  gap-2 m-2">
        <CareerFilters form={form} setForm={setForme} getJobs={getJobDetails} />
        <Jobs jobDetails={jobs} incrementPage={incrementPage} />
      </div>
    </div>
  );
};

export default Carrers;
