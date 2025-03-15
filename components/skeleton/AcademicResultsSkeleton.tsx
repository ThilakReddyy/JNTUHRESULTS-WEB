import { Skeleton } from "@/components/ui/skeleton";

const AcademicResultSkeleton = ({
  academic = false,
}: {
  academic?: boolean;
}) => {
  // Create an array of 3 items to simulate multiple semesters
  const semesters = Array(3).fill(null);

  return (
    <div className="flex flex-col gap-2">
      {semesters.map((_, index) => (
        <div key={index}>
          <table className="dark:border-white w-[100%] rounded-t">
            <tbody>
              <tr>
                <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                  <Skeleton className="h-4 w-[120px] mx-auto my-1 rounded-none" />
                </th>
              </tr>
            </tbody>
          </table>

          <table className="dark:border-white">
            <tbody>
              <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954]">
                <th className="dark:border-white px-1">Subject Code</th>
                <th className="dark:border-white px-1">Subject Name</th>
                <th className="dark:border-white px-1">Internal</th>
                <th className="dark:border-white px-1">External</th>
                <th className="dark:border-white px-1">Total</th>
                <th className="dark:border-white px-1">Grade</th>
                <th className="dark:border-white px-1">Credits</th>
              </tr>
              {/* Create 5 rows of skeleton subjects per semester */}
              {Array(5)
                .fill(null)
                .map((_, subIndex) => (
                  <tr key={subIndex}>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[80px] mx-auto my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[160px] mx-auto  my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[40px] mx-auto my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[40px] mx-auto my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[40px] mx-auto my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[30px] mx-auto my-1 rounded-none" />
                    </th>
                    <th className="dark:border-white px-1">
                      <Skeleton className="h-4 w-[30px] mx-auto my-1 rounded-none" />
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>

          {academic && (
            <table className="dark:border-white rounded-b">
              <tbody>
                <tr>
                  <th className="dark:border-white w-[75%]">SGPA</th>
                  <th className="dark:border-white w-[25%]">
                    <Skeleton className="h-4 w-[50px] mx-auto" />
                  </th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default AcademicResultSkeleton;
