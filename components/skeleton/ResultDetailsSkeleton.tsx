import { Skeleton } from "@/components/ui/skeleton";

const ResultDetailsSkeleton = () => {
  return (
    <>
      <table className="w-[100%] mt-2 border-black dark:border-white rounded-t">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className="dark:border-white">Name</th>
            <th className="dark:border-white">Roll Number</th>
            <th className="dark:border-white w-[80px]">College Code</th>
            <th className="dark:border-white">Father Name</th>
          </tr>
          <tr>
            <th className="dark:border-white ">
              <Skeleton className="h-4 w-[120px] mx-auto rounded-none" />
            </th>
            <th className="dark:border-white p-2">
              <Skeleton className="h-4 w-[100px] mx-auto rounded-none" />
            </th>
            <th className="dark:border-white p-2">
              <Skeleton className="h-4 w-[20px] mx-auto rounded-none" />
            </th>
            <th className="dark:border-white p-2">
              <Skeleton className="h-4 w-[120px] mx-auto rounded-none" />
            </th>
          </tr>
        </tbody>
      </table>

      <table className="w-[100%] mb-2 border-black dark:border-white rounded-b">
        <tbody>
          <tr>
            <th className="dark:border-white max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
              COLLEGE NAME
            </th>
            <th className="dark:border-white max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
              BRANCH
            </th>
          </tr>
          <tr>
            <th className="dark:border-white p-2">
              <Skeleton className="h-4 w-[90%] mx-auto rounded-none" />
            </th>
            <th className="dark:border-white p-2">
              <Skeleton className="h-4 w-[80%] mx-auto rounded-none" />
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ResultDetailsSkeleton;
