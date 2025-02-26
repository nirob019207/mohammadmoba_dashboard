"use client";
import { useGetProfessorDashboardQuery } from "@/Redux/Api/professor/professorApi";
import { Batch, TProfessorDashboard } from "@/types/interface";
import Image from "next/image";
import { GiReceiveMoney } from "react-icons/gi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { PiBookOpenUserFill } from "react-icons/pi";
import courseImage from "@/assests/courseImage.png";

export default function ProfessorDashboard() {
  const { data } = useGetProfessorDashboardQuery(undefined);
  const professorStats: TProfessorDashboard = data?.data;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="min-h-32 bg-[#0077FF33] rounded-lg flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold">Total Batch</h3>
            <h1 className="text-3xl font-bold">
              {professorStats?.total_batches}
            </h1>
          </div>
          <div className="p-4 bg-white rounded-full">
            <GiReceiveMoney className="size-12" />
          </div>
        </div>
        <div className="min-h-32 bg-[#00B07333] rounded-lg flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold">Total Student</h3>
            <h1 className="text-3xl font-bold">
              {professorStats?.total_students}
            </h1>
          </div>
          <div className="p-4 bg-white rounded-full">
            <PiMoneyWavyLight className="size-12" />
          </div>
        </div>
        <div className="min-h-32 bg-[#18213433] rounded-lg flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold">Total Video</h3>
            <h1 className="text-3xl font-bold">
              {professorStats?.total_materials}
            </h1>
          </div>
          <div className="p-4 bg-white rounded-full">
            <PiBookOpenUserFill className="size-12" />
          </div>
        </div>
        <div className="min-h-32 bg-[#FFBC0333] rounded-lg flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold">Total Course</h3>
            <h1 className="text-3xl font-bold">
              {professorStats?.total_courses}
            </h1>
          </div>
          <div className="p-4 bg-white rounded-full">
            <PiBookOpenUserFill className="size-12" />
          </div>
        </div>
      </div>

      {/* Batch section */}
      <h2 className="text-3xl">My Batches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TODO: Replace  professorStats.batches */}
        {new Array(8).fill(undefined).map((item: Batch, index: number) => (
          <div key={index}>
            <div className="relative  rounded-lg">
              {/* TODO: Replace the image url static to dynamic */}
              <Image src={courseImage} alt="Course Image" className="w-full" />
              <h1 className="text-4xl absolute right-0 bottom-0 py-1 px-4 rounded-full bg-white/20 backdrop-blur-md text-white z-10">
                {index + 1}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
