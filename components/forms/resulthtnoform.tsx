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
      className="mx-auto mt-[6%] flex w-[calc(100%_-_1.5rem)] max-w-3xl justify-center border border-border bg-card px-4 shadow-[4px_4px_0_hsl(var(--border)/0.2)] sm:px-10"
      toolname={tool.name}
      tooldescription={tool.description}
      toolautosubmit=""
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="w-full pb-10 pt-7">
        <h1 className="mb-10 border-b border-border bg-secondary px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.16em] md:text-base">
          {title}
        </h1>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <input
            className="
          h-11 w-full min-w-0 text-center text-base uppercase tracking-[0.08em]
          border border-input bg-background px-3 placeholder:normal-case placeholder:tracking-normal
          sm:w-72 lg:w-80 lg:text-sm
          shadow-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring
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
          h-11 w-full min-w-0 text-center text-base uppercase tracking-[0.08em]
          border border-input bg-background px-3 placeholder:normal-case placeholder:tracking-normal
          sm:w-72 lg:w-80 lg:text-sm
          shadow-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring
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

        <div className="mt-12 flex justify-center">
          <button
            type="submit"
            className="
            text-sm md:text-lg
            min-w-[120px] border border-primary bg-primary px-5 py-2
            font-bold uppercase tracking-[0.14em] text-primary-foreground
            transition-colors hover:bg-transparent hover:text-primary
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
