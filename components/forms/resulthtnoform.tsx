"use client";

interface FormProps {
  title: string;
  hallticketno: string;
  hallticketno2?: string;
  sethallticketno: (value: string) => void;
  sethallticketno2?: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

const toolDetails: Record<string, { name: string; description: string }> = {
  "Academic Result": {
    name: "view_academic_result",
    description: "View the semester-by-semester academic result for a JNTUH hall ticket number.",
  },
  "Academic All Results": {
    name: "view_all_academic_results",
    description: "View all available JNTUH academic results for a hall ticket number.",
  },
  "Backlog Report": {
    name: "view_backlog_report",
    description: "View the current backlog report for a JNTUH hall ticket number.",
  },
  "Class Result": {
    name: "view_class_result",
    description: "View the class result associated with a JNTUH hall ticket number.",
  },
  "Credits Checker": {
    name: "check_academic_credits",
    description: "Check earned academic credits for a JNTUH hall ticket number.",
  },
  "Grace Marks Update": {
    name: "check_grace_marks_eligibility",
    description: "Check whether a JNTUH hall ticket number is eligible to submit an existing grace-marks update.",
  },
  "JNTUH Wrapped": {
    name: "view_jntuh_wrapped",
    description: "View the academic year-in-review summary for a JNTUH hall ticket number.",
  },
  "Result Contrast": {
    name: "compare_academic_results",
    description: "Compare the academic results of two JNTUH hall ticket numbers.",
  },
  "Your Academic Journey": {
    name: "view_academic_journey",
    description: "View the complete academic journey for a JNTUH hall ticket number.",
  },
};

const Form = ({
  title,
  hallticketno,
  hallticketno2,
  sethallticketno,
  sethallticketno2,
  onSubmit,
  isDisabled,
}: FormProps) => {
  const tool = toolDetails[title] ?? {
    name: "view_jntuh_result",
    description: "View a JNTUH result using a hall ticket number.",
  };

  return (
    <form
      className="flex justify-center mt-[6%] mx-[16%] px-10 rounded-md border-black dark:border-white border-2 shadow-2xl"
      toolname={tool.name}
      tooldescription={tool.description}
      toolautosubmit=""
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="pt-[30px] pb-[50px]">
        <h2 className="mb-12 md:text-2xl font-semibold text-center">{title}</h2>
        <div className="flex  justify-center flex-col md:flex-row">
          <input
            className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded placeholder:pl-2
          shadow-xl
          "
            name="htno1"
            type="text"
            required
            value={hallticketno}
            onChange={(event) => {
              event.target.value = event.target.value.toUpperCase();
              sethallticketno(event.target.value);
            }}
            minLength={10}
            maxLength={10}
            pattern="[A-Za-z0-9]{10}"
            autoComplete="off"
            aria-label={hallticketno2 !== undefined ? "First hall ticket number" : "Hall ticket number"}
            toolparamdescription="A 10-character JNTUH student hall ticket number."
            placeholder={
              hallticketno2 !== undefined
                ? "Enter first hallticket no"
                : "Enter your hallticket no"
            }
          />
          {hallticketno2 !== undefined && (
            <input
              className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded 
          shadow-xl
          "
              name="htno2"
              type="text"
              required
              value={hallticketno2 ?? ""}
              onChange={(event) => {
                event.target.value = event.target.value.toUpperCase();
                sethallticketno2?.(event.target.value);
              }}
              minLength={10}
              maxLength={10}
              pattern="[A-Za-z0-9]{10}"
              autoComplete="off"
              aria-label="Second hall ticket number"
              toolparamdescription="The second 10-character JNTUH student hall ticket number to compare."
              placeholder="Enter second hall ticket no"
            />
          )}
        </div>

        <div className="flex justify-center mt-[80px]">
          <button
            type="submit"
            className="
            text-sm md:text-lg
            px-3 py-1
            rounded
            bg-black dark:bg-gray-300
            dark:text-black text-white
            w-[100px]
            "
            disabled={isDisabled}
          >
            Result
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
