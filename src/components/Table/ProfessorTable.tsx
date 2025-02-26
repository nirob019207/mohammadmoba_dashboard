import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useDeleteProfessorMutation } from "@/Redux/Api/professor/professorApi";
import { TProfessor } from "@/types/interface";
import { formatDate } from "@/utils/FormatDate";

interface StudentType {
  professors: TProfessor[];
  isLoading: boolean;
  serial: number;
}

const ProfessorTable: React.FC<StudentType> = ({
  professors,
  isLoading,
  serial,
}) => {
  const [deleteProfessor, { isLoading: deleteLoading }] =
    useDeleteProfessorMutation();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // State to store the batch id that the user wants to delete
  const [professorToDelete, setProfessorToDelete] = useState<number | null>(
    null
  );

  const totalPages = Math.ceil(professors?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = professors?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const confirmDelete = async () => {
    if (professorToDelete) {
      try {
        await deleteProfessor(professorToDelete).unwrap();
        // Optionally, display a success message or refetch data here
      } catch (error) {
        console.error("Failed to delete batch: ", error);
      } finally {
        setProfessorToDelete(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : professors?.length > 0 ? (
        <>
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#0077FF33]">
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Professor Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Professor ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Phone Number
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Employee Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Join Date
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData?.map((item: TProfessor, index: number) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4 text-sm">
                    <div className="flex gap-1 items-center">
                      <Image
                        height={44}
                        width={44}
                        src={
                          item.profile_picture
                            ? `${
                                process.env.NEXT_PUBLIC_STORAGE
                              }/${item?.profile_picture?.trimEnd()}`
                            : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"
                        }
                        alt={`Photo of ${item.first_name}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <h4 className="font-semibold">{item.first_name}</h4>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{item.id}</td>
                  <td className="p-4 text-sm">{item.email_address}</td>
                  <td className="p-4 text-sm">{item.phone_number}</td>
                  <td className="p-4 text-sm">{item.user_status}</td>
                  <td className="p-4 text-sm">{formatDate(item.created_at)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* Existing action button */}
                      <button className="text-green-600 hover:text-gray">
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete action button opens modal */}
                      <button
                        onClick={() => setProfessorToDelete(item.user_id)}
                        disabled={deleteLoading}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
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
              {Math.min(startIndex + itemsPerPage, professors?.length)} of{" "}
              {professors?.length} results
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        <p className="text-center text-gray-700 p-4">No Student found.</p>
      )}

      {/* Delete Confirmation Modal */}
      {professorToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 z-10">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this Student?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setProfessorToDelete(null)}
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
  );
};

export default ProfessorTable;
