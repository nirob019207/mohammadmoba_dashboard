"use client";

import { useGetProfessorBatchesQuery } from "@/Redux/Api/professor/professorApi";

export default function ProfessorBatches() {
  const { data, isLoading } = useGetProfessorBatchesQuery(undefined);

  const batchData = data?.data?.batch_data || [];

  console.log(batchData);

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
        This is ProfessorBatches component
      </h1>
    </div>
  );
}
