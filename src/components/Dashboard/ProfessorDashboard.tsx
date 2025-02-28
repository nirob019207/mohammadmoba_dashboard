"use client";
import { useGetProfessorDashboardQuery } from "@/Redux/Api/professor/professorApi";
import { Batch } from "@/types/interface";
import Image from "next/image";
import { GiReceiveMoney } from "react-icons/gi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { PiBookOpenUserFill } from "react-icons/pi";
import { TProfessorDashboard } from "@/types/professorInterface";
import ProfessorBatchCard from "./ProfessorBatchCard";

export default function ProfessorDashboard() {
  const { data } = useGetProfessorDashboardQuery(undefined);
  const professorStats: TProfessorDashboard = data?.data;
  const professorBatches: Batch[] = data?.data?.batches || [];

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
      <h2 className="text-3xl mt-12 mb-6 font-semibold">My Batches</h2>
      <ProfessorBatchCard batches={professorBatches} />
    </div>
  );
}
