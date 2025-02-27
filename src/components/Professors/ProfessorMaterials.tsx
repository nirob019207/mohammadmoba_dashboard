"use client";

import { useGetAllMaterialsQuery } from "@/Redux/Api/professor/professorApi";

export default function ProfessorMaterials() {
  const { data, isLoading } = useGetAllMaterialsQuery(undefined);

  const batchData = data?.data;

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
        This is ProfessorMaterials component
      </h1>
    </div>
  );
}
