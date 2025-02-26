"use client";


import ResultTable from "../Table/ResultTable";
import { useGetResultQuery } from "@/Redux/Api/result/resultApi";

const Result = () => {
  const { data, isLoading } = useGetResultQuery(undefined);



  const result = data?.data?.student?.data|| [];






  return (
    <div className="pl-3">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Result
        </h1>
           {/* Search Field */}
      
       
      </div>

   

      <div className="flex justify-between mb-5">
        <div className="w-full">
          <ResultTable result={result} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Result;
