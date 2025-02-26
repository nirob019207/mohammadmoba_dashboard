"use client"
import { useGetmatQuery } from "@/Redux/Api/mycourse/mycourseApi";
import { PlayCircle, Users } from "lucide-react";
import Image from "next/image";

export default function MyCourse() {
  const { data } = useGetmatQuery({});
  console.log(data);

  const mycourseData = data?.courses;

  if (!mycourseData || mycourseData.length === 0) {
    return (
      <div className="max-w-2xl p-6">
        <h2 className="mb-4 text-xl font-semibold">My Course</h2>
        <p>No course found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">My Course</h2>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="relative h-[120px] w-full sm:h-[140px] sm:w-[180px]">
            <Image
              src={mycourseData?.course_image || "/placeholder.svg"}
              alt={mycourseData?.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{mycourseData?.professor?.name}</h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4" />
                <span>{mycourseData?.materials?.length} Videos</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Batch-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
