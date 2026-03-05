import { Skeleton } from "@/components/ui/skeleton";

const ResultDetailsSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm mb-4">
      {/* Primary info row */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white dark:bg-white/5 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-white/10">
        {["Student Name", "Roll Number", "College Code", "Father's Name"].map((label) => (
          <div key={label} className="flex flex-col gap-2 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
              {label}
            </p>
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        ))}
      </div>

      {/* Secondary info row */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-[#0b3954]/40 border-t border-gray-100 dark:border-white/10 divide-x divide-gray-100 dark:divide-white/10">
        {["College Name", "Branch"].map((label) => (
          <div key={label} className="flex flex-col gap-2 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
              {label}
            </p>
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDetailsSkeleton;
