import { Skeleton } from "@/components/ui/skeleton";

const DetailCell = ({
  label,
  hiddenOnMobile = false,
}: {
  label: string;
  hiddenOnMobile?: boolean;
}) => (
  <div
    className={`min-h-16 bg-[#edf3e7] px-4 py-3 text-[#17211e] dark:bg-[#111827] dark:text-gray-100 ${
      hiddenOnMobile ? "hidden md:block" : ""
    }`}
  >
    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
      {label}
    </p>
    <Skeleton className="mt-2 h-4 w-3/4" />
  </div>
);

const ResultDetailsSkeleton = () => (
  <section className="mb-4 border border-[#2a342f] bg-[#2a342f] shadow-sm dark:border-white/[0.15] dark:bg-white/[0.15]">
    <div className="bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:bg-[#172033] dark:text-gray-100">
      Student Details
    </div>
    <div className="grid grid-cols-1 gap-px border-t border-[#2a342f] bg-[#2a342f] dark:border-white/[0.15] dark:bg-white/[0.15] md:grid-cols-2 lg:grid-cols-4">
      <DetailCell label="Student Name" />
      <DetailCell label="Hall Ticket No." />
      <DetailCell label="College Code" hiddenOnMobile />
      <DetailCell label="Father's Name" hiddenOnMobile />
      <div className="lg:col-span-2">
        <DetailCell label="College Name" />
      </div>
      <div className="lg:col-span-2">
        <DetailCell label="Branch" />
      </div>
    </div>
  </section>
);

export default ResultDetailsSkeleton;
