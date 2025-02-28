import ProfessorBatchCard from "@/components/Dashboard/ProfessorBatchCard";

export default function ProfessorMaterialsPage() {
  return (
    <div>
      <h1 className="text-3xl my-6">Select a batch</h1>
      <ProfessorBatchCard redirectTo="professor-materials" />
    </div>
  );
}
