"use client";
interface FormProps {
  title: string;
  hallticketno: string;
  hallticketno2?: string;
  sethallticketno: (value: string) => void;
  sethallticketno2?: (value: string) => void;
  onSubmit: () => void;
}

const Form = ({
  title,
  hallticketno,
  hallticketno2,
  sethallticketno,
  sethallticketno2,
  onSubmit,
}: FormProps) => {
  return (
    <div className="flex justify-center  mt-[6%]  mx-[16%] px-10 rounded-md border-black dark:border-white border-2  shadow-2xl   ">
      <div className="pt-[30px] pb-[50px]">
        <div className="md:text-2xl font-semibold text-center">{title}</div>
        <br />
        <br />
        <input
          className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded 
          shadow-xl
          "
          type="text"
          value={hallticketno}
          onChange={(event) => {
            event.target.value = event.target.value.toUpperCase();
            sethallticketno(event.target.value);
          }}
          maxLength={10}
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
            type="text"
            value={hallticketno2 ?? ""}
            onChange={(event) => {
              console.log(event);
              event.target.value = event.target.value.toUpperCase();
              sethallticketno2?.(event.target.value);
            }}
            maxLength={10}
            placeholder="Enter second hall ticket no"
          />
        )}

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
            onClick={onSubmit}
          >
            Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
