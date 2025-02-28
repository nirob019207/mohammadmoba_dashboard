import ProfessorMaterialsTable from "@/components/Professors/ProfessorMaterialsTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function MaterialsPage() {
  return (
    <div>
      <Link
        href={"/professor-materials/add-materials"}
        className="px-4 py-2 rounded-md flex gap-2 items-center my-6 bg-blue-600 text-white w-fit"
      >
        <FaPlus className="text-xl text-white" />
        Add Materials
      </Link>
      <ProfessorMaterialsTable />
    </div>
  );
}
