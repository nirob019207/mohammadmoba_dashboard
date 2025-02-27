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
    router.push("add_porfessor");
  };

  return (
    <div>
          <div className="flex justify-between items-center py-4">
        <h1 className="text-black font-semibold flex items-center text-[24px] gap-2 py-4">
          Professor
        </h1>
      
        <div className="pr-4">
          <button
            onClick={handleAdd}
            className="bg-blue-700 px-4 py-2 text-white rounded-md"
          >
            Add Professor
          </button>
        </div>
      </div>
      <ProfessorTable
        isLoading={isLoading}
        professors={professors}
        serial={1}
      />
    </div>
  );
}
