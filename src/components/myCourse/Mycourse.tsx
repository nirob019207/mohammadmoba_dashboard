"use client";
import { useGetmatQuery, useGetstudentsCourseQuery } from "@/Redux/Api/mycourse/mycourseApi";
import { PlayCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyCourse() {
  const { data } = useGetstudentsCourseQuery({});

  const mycourseData = data?.data.course

  if (!mycourseData || mycourseData.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">My Course</h2>
        <p className="text-gray-600">No courses found</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">My Course</h2>

      {mycourseData?.map((course: any) => (
        <Link href={`/mycourse/${course?.id}`} key={course.id}>
          <div
            key={course.id}
            className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
              {/* Course Image */}
              <div className="relative h-[160px] w-full sm:h-[160px] sm:w-[200px]">
                <Image
                  src={
                    course.course_image
                      ? `${process.env.NEXT_PUBLIC_STORAGE}/${course.course_image}`
                      : "/placeholder.svg"
                  }
                  alt={course.name}
                  fill
                  className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                  priority
                />
              </div>

              {/* Course Info */}
              <div className="p-5 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.name}
                </h3>
               

                <div className="mt-3 flex items-center gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <PlayCircle className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">
                      {course.total_materials} Videos
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Batch-{data?.batch_id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
