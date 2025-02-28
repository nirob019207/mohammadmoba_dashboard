"use client";

import { useGetProfessorsBatchStudentsQuery } from "@/Redux/Api/professor/professorApi";
import { useParams } from "next/navigation";
import StudentTable from "../Table/SturdentTable";

export default function ProfessorBatchStudent() {
  const { batchId } = useParams();
  const { data: studentData, isLoading } =
    useGetProfessorsBatchStudentsQuery(batchId);
  console.log(studentData?.data?.students?.data);
  const students = studentData?.data?.students?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 my-6">
        Student of Batch {batchId}
      </h1>
      <StudentTable isLoading={isLoading} serial={1} student={students} />
    </div>
  );
}
