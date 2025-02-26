"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useGetStudentQuery } from "@/Redux/Api/student/studentApi";
import StudentTable from "../Table/SturdentTable";

const Student = () => {
  const { data, isLoading } = useGetStudentQuery(undefined);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const studentData = data?.data?.students?.data || [];
  console.log(studentData)

  // Filter the batch data by title (or any other property you choose)


  const handleAdd = () => {
    router.push("add_student");
  };

  return (
    <div className="pl-3">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Students
        </h1>
           {/* Search Field */}
      {/* <div className="mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Course by title..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
      </div> */}
       
      </div>

   

      <div className="flex justify-between mb-5">
        <div className="w-full">
          <StudentTable student={studentData} isLoading={isLoading} serial={1} />
        </div>
      </div>
    </div>
  );
};

export default Student;
