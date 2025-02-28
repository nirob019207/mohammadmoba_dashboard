"use client";

import { useGetCourseByBatchIdQuery } from "@/Redux/Api/professor/professorApi";
import { Course } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaRegPlayCircle } from "react-icons/fa";

export default function ProfessorCourses() {
  const { batchId } = useParams();
  const { courseData, loading } = useGetCourseByBatchIdQuery(
    batchId as string,
    {
      selectFromResult: ({ data, isLoading }) => ({
        courseData: data?.data?.course,
        loading: isLoading,
      }),
    }
  );

  return (
    <div>
      {!loading && courseData?.length > 0 ? (
        <div>
          <h1 className="text-3xl my-6">Select a course</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseData?.map((course: Course) => (
              <Link
                href={`/professor-materials/${batchId}/${course.id}`}
                key={course.id}
                className="flex gap-4 items-center p-4 border rounded-md"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE}/${course.course_image}`}
                  alt={`image of ${course.name}`}
                  width={300}
                  height={200}
                  className="w-[200px]"
                />
                <div>
                  <h2 className="text-xl mb-4 font-bold">{course.name}</h2>
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <FaRegPlayCircle className="text-2xl text-blue-600" />
                      <p className="">{course.total_materials} Videos</p>
                    </div>
                    <div>
                      <button className="bg-green-200 rounded-full px-4 py-1 text-sm font-semibold text-green-900">
                        {course.status.toUpperCase()}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-slate-500 font-bold text-center text-3xl my-2">
            No courses found
          </p>
        </div>
      )}
    </div>
  );
}
