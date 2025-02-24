"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCourseQuery } from "@/Redux/Api/course/courseApi";
import CourseTable from "../Table/CourseTable";

const Course = () => {
  const { data, isLoading } = useGetCourseQuery(undefined);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const courseData = data?.data?.course?.data || [];

  // Filter the batch data by title (or any other property you choose)
  const filteredCourseData = courseData.filter((batch:any) =>
    batch.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    router.push("add_course");
  };

  return (
    <div className="pl-3">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Application
        </h1>
           {/* Search Field */}
      <div className="mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Course by title..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
      </div>
        <div className="pr-4">
          <button
            onClick={handleAdd}
            className="bg-blue-700 px-4 py-2 text-white rounded-md"
          >
            Add Course
          </button>
        </div>
      </div>

   

      <div className="flex justify-between mb-5">
        <div className="w-full">
          <CourseTable course={filteredCourseData} isLoading={isLoading} serial={1} />
        </div>
      </div>
    </div>
  );
};

export default Course;
