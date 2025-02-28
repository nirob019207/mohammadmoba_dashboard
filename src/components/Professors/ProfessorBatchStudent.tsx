"use client";

import { useGetProfessorsBatchStudentsQuery } from "@/Redux/Api/professor/professorApi";
import { useParams } from "next/navigation";

export default function ProfessorBatchStudent() {
  const batchId = useParams();
  const { data: studentData, isLoading } =
    useGetProfessorsBatchStudentsQuery(batchId);
  console.log(studentData?.data?.students?.data);

  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        This is ProfessorBatchStudent component
      </h1>
    </div>
  );
}
