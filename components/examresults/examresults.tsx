"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { rollNumberEndings } from "@/constants/rollNumberendings";

const ExamResults = ({ title, query }: { title: string; query: string }) => {
  const [singleHtno, setSingleHtno] = useState("");
  const [multiHtno, setMultiHtno] = useState(["", ""]);
  const onSingleResultSubmit = async () => {
    if (singleHtno.length != 10) {
      toast.error("Kindly check the Hall ticket Number");
      return;
    }
    try {
      const redirectUrl =
        "http://results.jntuh.ac.in/results/resultAction?" +
        query +
        "&htno=" +
        singleHtno +
        "&result=null&grad=null";

      window.open(redirectUrl, "_blank");
    } catch (e: any) {
      console.log(e);
      toast.error("Internal Server Error!!!");
    }
  };
  const onMultiResultSubmit = () => {
    if (multiHtno[0].length != 10 || multiHtno[1].length != 10) {
      toast.error("Kindly check the Hall ticket Numbers");
      return;
    }
    const firstEnding = multiHtno[0].substring(8);
    const secondEnding = multiHtno[1].substring(8);
    if (
      rollNumberEndings.indexOf(firstEnding) >
      rollNumberEndings.indexOf(secondEnding)
    ) {
      toast.error("The from Htno should not be greater than to Htno ");
      return;
    }
    toast("Not Yet Implemented");
  };
  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center w-full md:max-w-5xl ">
        <div className="w-full flex justify-center">
          <Tabs defaultValue="single" className="w-full md:w-[50%]">
            <TabsList className="md:w-full w-full">
              <TabsTrigger value="single" className="w-[50%]">
                Single Result
              </TabsTrigger>
              <TabsTrigger value="multi" className="w-[50%]">
                Multi Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <div className="border border-gray-300 p-8 rounded-md">
                <div className="flex justify-center font-semibold pb-12">
                  Single Result
                </div>
                <div className="flex justify-center">
                  <input
                    className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded
          shadow-xl
          "
                    name="htno1"
                    placeholder="Enter your Hall ticket No."
                    type="text"
                    value={singleHtno}
                    onChange={(event) => {
                      setSingleHtno(event.target.value.toUpperCase());
                    }}
                    maxLength={10}
                  />
                </div>
                <div className="flex mt-8 justify-center w-full">
                  <Button
                    className="w-24 h-8 text-[80%] md:w-32"
                    onClick={onSingleResultSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="multi">
              <div className="border border-gray-300 p-8 rounded-md">
                <div className="flex justify-center font-semibold pb-12">
                  Multi Results
                </div>
                <div className="md:flex ml-6 md:ml-0 justify-center">
                  <input
                    className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded
          shadow-xl
          "
                    name="htno1"
                    placeholder="Enter from Hall ticket No."
                    type="text"
                    value={multiHtno[0]}
                    onChange={(event) => {
                      const updatedHtno = [...multiHtno];
                      updatedHtno[0] = event.target.value.toUpperCase();
                      setMultiHtno(updatedHtno);
                    }}
                    maxLength={10}
                  />
                  <input
                    className="
          text-rounded text-center text-[60%] sm:text-[90%]
          w-[150px] h-[30px] sm:w-[200px] sm:h-[35px]
          m-[4px]
          border-[1px] border-double border-black dark:border-white rounded
          shadow-xl
          "
                    name="htno2"
                    placeholder="Enter to Hall ticket No."
                    type="text"
                    value={multiHtno[1]}
                    onChange={(event) => {
                      const updatedHtno = [...multiHtno];
                      updatedHtno[1] = event.target.value.toUpperCase();
                      setMultiHtno(updatedHtno);
                    }}
                    maxLength={10}
                  />
                </div>
                <div className="flex mt-8 justify-center w-full">
                  <Button
                    type="submit"
                    className="w-24 h-8 text-[80%] md:w-32"
                    onClick={onMultiResultSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
