"use client";

import {
  useDeleteMaterialsMutation,
  useGetAllMaterialsQuery,
  useGetMaterialsByCourseIdQuery,
} from "@/Redux/Api/professor/professorApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoTrash } from "react-icons/io5";

export default function ProfessorMaterialsTable() {
  const { batchId, courseId } = useParams();
  // State to store the batch id that the user wants to delete
  const [materialToDelete, setMaterialToDelete] = useState<number | null>(null);

  const [deleteMaterial, { isLoading: deleteLoading }] =
    useDeleteMaterialsMutation();
  const itemsPerPage = 10;
  const serial = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetMaterialsByCourseIdQuery({
    batchId,
    courseId,
  });
  const materialsData = data?.data?.materials || [];

  const totalPages = Math.ceil(materialsData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = materialsData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const confirmDelete = async () => {
    if (materialToDelete) {
      try {
        await deleteMaterial(materialToDelete).unwrap();
        // Optionally, display a success message or refetch data here
      } catch (error) {
        console.error("Failed to delete batch: ", error);
      } finally {
        setMaterialToDelete(null);
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg">
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : materialsData?.length > 0 ? (
          <>
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[#E6F0FF]">
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    #
                  </th>

                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Title
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Total time
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>

                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedData?.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm">
                      {serial + startIndex + index}
                    </td>

                    <td className="p-4 text-sm">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-700">
                          {item.title}
                        </h3>
                        <p className="text-slate-500">{item.subtitle}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{item.total_time}</td>
                    <td className="p-4 text-sm">{item.date}</td>
                    <td className="p-4 text-sm">
                      <button className="bg-green-200 rounded-full px-4 py-1 text-sm font-semibold text-green-900">
                        Published
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Existing action button */}

                        {/* TODO: To implement edit, uncomment it */}
                        {/* <button
                        className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-md"
                        onClick={() => setMaterialToDelete(item.id)}
                      >
                        <FiEdit className="text-3xl" />
                      </button> */}

                        {/* Delete action button opens modal */}
                        <button
                          onClick={() => setMaterialToDelete(item.id)}
                          disabled={deleteLoading}
                          className="text-red-600 hover:text-white hover:bg-red-500 p-2 rounded-md"
                        >
                          <IoTrash className="text-3xl " />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white px-4 py-3 border-t">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, materialsData?.length)} of{" "}
                {materialsData?.length} results
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-700 p-4">No Course found.</p>
        )}

        {/* Delete Confirmation Modal */}
        {materialToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Modal Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 z-10">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-6">
                Are you sure you want to delete this Course?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setMaterialToDelete(null)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
