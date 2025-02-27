"use client"
import { useGetmatQuery } from "@/Redux/Api/mycourse/mycourseApi";
import StuMaterialTable from "../Table/student/StuMaterialTable";

const CourseMaterial = () => {
  const { data, isLoading } = useGetmatQuery({});

  // Flatten the materials from all courses
  const flattenedMaterials = data?.courses?.flatMap((course:any) => course.materials) || [];

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
          <StuMaterialTable material={flattenedMaterials} isLoading={isLoading} serial={1} />
        </div>
      </div>
    </div>
  );
};

export default CourseMaterial;
