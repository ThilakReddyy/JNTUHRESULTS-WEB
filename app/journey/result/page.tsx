"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import HeroSection from "@/components/journey/HeroSection";
import SGPAChart from "@/components/journey/SGPAChart";
import SemesterStory from "@/components/journey/SemesterStory";
import CGPASimulator from "@/components/journey/CGPASimulator";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";

const JourneyResultPage = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [academicData, setAcademicData] = useState<AcademicResulProps | null>(null);
  const [allData, setAllData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!htno) {
      router.push("/journey");
      return;
    }

    const base = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

    const fetchData = async () => {
      toast.loading("Building your journey...");
      try {
        const [acRes, allRes] = await Promise.allSettled([
          axios.get(`${base}api/getAcademicResult?rollNumber=${htno}`, {
            timeout: 20000,
            validateStatus: () => true,
          }),
          axios.get(`${base}api/getAllResult?rollNumber=${htno}`, {
            timeout: 20000,
            validateStatus: () => true,
          }),
        ]);

        toast.dismiss();

        const ac = acRes.status === "fulfilled" ? acRes.value : null;
        const all = allRes.status === "fulfilled" ? allRes.value : null;

        if (!ac || ac.status !== 200 || !("details" in (ac.data ?? {}))) {
          if (ac?.status === 202)
            toast("Result is being prepared. Please check back shortly.");
          else if (ac?.status === 424)
            toast.error("JNTUH servers are currently down.");
          else
            toast.error("Could not fetch your result. Try again.");
          router.push("/journey");
          return;
        }

        setAcademicData(ac.data);
        if (all && all.status === 200 && "details" in (all.data ?? {})) {
          setAllData(all.data);
        }
      } catch {
        toast.dismiss();
        toast.error("Network error. Please try again.");
        router.push("/journey");
      }
      setLoading(false);
    };

    fetchData();
  }, [htno, router]);

  if (loading || !academicData) {
    return (
      <div className="mx-auto px-3 pb-6 max-w-3xl">
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Academic Journey
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Building your story...
          </p>
        </div>
        <ResultDetailsSkeleton />
        <AcademicResultSkeleton />
      </div>
    );
  }

  const { details, results } = academicData;
  const allSemesters = allData?.results ?? null;

  return (
    <div className="mx-auto px-3 pb-10 max-w-3xl">
      <div className="text-center py-6">
        <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          Academic Journey
        </h1>
        <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
          4 Years · Your Story
        </p>
      </div>

      <HeroSection details={details} results={results} allSemesters={allSemesters} />
      <SGPAChart semesters={results.semesters ?? []} />
      <SemesterStory semesters={results.semesters ?? []} />
      <CGPASimulator
        semesters={results.semesters ?? []}
        currentCGPA={results.CGPA}
      />

      <div className="flex justify-center text-[10px] text-gray-400 pt-4 pb-2">
        jntuhconnect.dhethi.com · Your Journey
      </div>
    </div>
  );
};

export default JourneyResultPage;
