import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = ["Code", "Subject Name", "Int.", "Ext.", "Total", "Grade", "Cr."];

const AcademicResultSkeleton = ({
  academic = false,
}: {
  academic?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6">
      {Array(3).fill(null).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm"
        >
          {/* Semester header skeleton */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0b3954] dark:bg-[#0b3954]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              <Skeleton className="h-4 w-28 bg-white/20" />
            </div>
            {academic && (
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Skeleton className="h-3 w-8 bg-white/20" />
                <Skeleton className="h-4 w-8 bg-white/20" />
              </div>
            )}
          </div>

          {/* Table skeleton */}
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: "collapse", borderSpacing: 0, border: "none", width: "100%" }}>
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                  {HEADERS.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap"
                      style={{ border: "none" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(null).map((_, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 dark:border-white/5 ${i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/80 dark:bg-white/[0.03]"
                      }`}
                  >
                    <td className="px-4 py-2.5" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-16 rounded-md" />
                    </td>
                    <td className="px-4 py-2.5" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-44 rounded-md" />
                    </td>
                    <td className="px-4 py-2.5 text-center" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-8 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-2.5 text-center" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-8 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-2.5 text-center" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-8 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-2.5 text-center" style={{ border: "none" }}>
                      <Skeleton className="h-6 w-9 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-2.5 text-center" style={{ border: "none" }}>
                      <Skeleton className="h-4 w-6 rounded-md mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicResultSkeleton;
