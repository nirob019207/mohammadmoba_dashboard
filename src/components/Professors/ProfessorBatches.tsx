"use client";

import { useGetProfessorBatchesQuery } from "@/Redux/Api/professor/professorApi";

export default function ProfessorBatches() {
  const { data, isLoading } = useGetProfessorBatchesQuery(undefined);

  const batchData = data?.data?.batch_data || [];

  return <div>Hello</div>;
}
