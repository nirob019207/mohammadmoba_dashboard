"use client"
import { useGetmatQuery } from "@/Redux/Api/mycourse/mycourseApi";
import StuMaterialTable from "../Table/student/StuMaterialTable";
import { useGetCourseQuery } from "@/Redux/Api/course/courseApi";
import { useParams } from "next/navigation";

const CourseMaterial = () => {
  const params=useParams()
  
  const { data, isLoading } = useGetmatQuery(params.id);

  // Flatten the materials from all courses
const mat=data?.data?.materials

  return (
    <div className="pl-3">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Course Material
        </h1>
        {/* Search Field */}
      </div>

      <div className="flex justify-between mb-5">
        <div className="w-full">
          <StuMaterialTable material={mat} isLoading={isLoading} serial={1} />
        </div>
      </div>
    </div>
  );
};

export default CourseMaterial;
