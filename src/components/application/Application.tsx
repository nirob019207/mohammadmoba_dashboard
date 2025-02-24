"use client";

import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

import { useApplicationQuery } from "@/Redux/Api/applicationApi";
import ApplicationTable from "../Table/ApplicationTable";

const Application = () => {
  const { data, isLoading } = useApplicationQuery(undefined);

  const appData = data?.data?.applications?.data;

  const pathname = usePathname();

  return (
    <div className="pl-3">
      <div>
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Application
        </h1>
      </div>
      <div className="flex justify-between mb-5">
        <div className="w-full">
          <ApplicationTable
            application={appData}
            isLoading={isLoading}
            serial={1}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Application;
