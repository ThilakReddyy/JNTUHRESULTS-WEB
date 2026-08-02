import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = ["Int.", "Ext.", "Total", "Grade", "Cr."];

const SemesterSkeleton = ({ position }: { position: number }) => (
  <div className="border border-[#2a342f] dark:border-white/[0.15]">
    <div className="flex min-h-9 items-center justify-between border-b border-[#2a342f] bg-[#e7ebe2] px-3 py-2 dark:border-white/[0.15] dark:bg-[#172033]">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#17211e] dark:text-gray-100">
        {position === 0 ? "I Semester" : "II Semester"}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
          SGPA
        </span>
        <Skeleton className="h-3 w-7" />
      </div>
    </div>

    <table className="w-full table-fixed border-collapse text-[#17211e] dark:text-gray-100 sm:min-w-[560px]">
      <colgroup>
        <col className="w-[36%] sm:w-24" />
        <col className="hidden sm:table-column" />
        <col className="w-[12%] sm:w-12" />
        <col className="w-[12%] sm:w-12" />
        <col className="w-[12%] sm:w-12" />
        <col className="w-[12%] sm:w-12" />
        <col className="w-[16%] sm:w-14" />
      </colgroup>
      <thead>
        <tr className="h-12 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
          <th className="border-b border-r border-[#2a342f] px-1 text-center dark:border-white/[0.15]">
            <span className="sm:hidden">Subject</span>
            <span className="hidden sm:inline">Subject Code</span>
          </th>
          <th className="hidden border-b border-r border-[#2a342f] px-3 text-left dark:border-white/[0.15] sm:table-cell">
            Subject Title
          </th>
          {HEADERS.map((header) => (
            <th
              key={header}
              className="border-b border-r border-[#2a342f] px-0.5 text-center last:border-r-0 dark:border-white/[0.15]"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 4 }, (_, index) => (
          <tr
            key={index}
            className="h-12 [&>td]:border-b [&>td]:border-r [&>td]:border-[#7b867f] last:[&>td]:border-b-0 dark:[&>td]:border-white/10"
          >
            <td className="px-2 py-2">
              <Skeleton className="mx-auto h-3 w-14" />
              <Skeleton className="mx-auto mt-1 h-2 w-20 sm:hidden" />
            </td>
            <td className="hidden px-3 sm:table-cell">
              <Skeleton className="h-3 w-3/4" />
            </td>
            {HEADERS.map((header) => (
              <td key={header} className="px-0.5 last:border-r-0">
                <Skeleton className="mx-auto h-3 w-5" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AcademicResultSkeleton = () => (
  <div className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]">
    {["I YEAR", "II YEAR"].map((year) => (
      <div
        key={year}
        className="border-b border-[#2a342f] last:border-b-0 dark:border-white/[0.15]"
      >
        <div className="border-b border-[#2a342f] bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold tracking-[0.2em] text-[#17211e] dark:border-white/[0.15] dark:bg-[#172033] dark:text-gray-100">
          {year}
        </div>
        <div className="grid grid-cols-1 gap-1 bg-[#edf3e7] p-1 dark:bg-[#111827] lg:grid-cols-2">
          <SemesterSkeleton position={0} />
          <SemesterSkeleton position={1} />
        </div>
      </div>
    ))}
  </div>
);

export default AcademicResultSkeleton;
