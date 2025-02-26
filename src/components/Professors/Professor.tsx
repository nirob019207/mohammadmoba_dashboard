"use client";

import ProfessorTable from "@/components/Table/ProfessorTable";
import { useGetAllProfessorQuery } from "@/Redux/Api/professor/professorApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Professors() {
  const { data, isLoading } = useGetAllProfessorQuery(undefined);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const professors = data?.data?.professors?.data || [];

  // Filter the batch data by title (or any other property you choose)
  const filteredProfessorsData = professors.filter((batch: any) =>
    batch.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    router.push("add_course");
  };

  return (
    <div>
      <ProfessorTable
        isLoading={isLoading}
        professors={professors}
        serial={1}
      />
    </div>
  );
}
