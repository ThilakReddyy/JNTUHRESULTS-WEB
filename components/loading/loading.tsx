import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";
const Loading = ({ splNote = "Result" }) => {
  const { theme } = useTheme();
  const color = theme == "light" ? "#000000" : "#ffffff";
  return (
    <>
      <div className="flex justify-center text-sm  md:text-2xl font-normal ">
        <div className="border-b flex py-6  justify-center px-2">
          <span className="hidden lg:block">
            Please wait a moment while we retrieve the results for you...
          </span>
          <span className="block lg:hidden">
            Kindly wait!! {splNote} is loading...
          </span>
        </div>
      </div>
      <div className="flex relative  justify-center m-10">
        <span className="z-0">
          <HashLoader
            color={color}
            cssOverride={{}}
            size={40}
            speedMultiplier={1}
            className="hidden"
          />
        </span>
      </div>
    </>
  );
};

export default Loading;
