import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import Image from "next/image";
import {  Course } from "@/types/interface";
import { useDeleteCourseMutation } from "@/Redux/Api/course/courseApi";

interface CourseType {
  course: Course[];
  isLoading: boolean;
  serial: number;
}

const CourseTable: React.FC<CourseType> = ({ course, isLoading, serial }) => {
  const [deleteCourse, { isLoading: deleteLoading }] = useDeleteCourseMutation();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // State to store the batch id that the user wants to delete
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const totalPages = Math.ceil(course?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = course?.slice(startIndex, startIndex + itemsPerPage);

  const confirmDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete).unwrap();
        // Optionally, display a success message or refetch data here
      } catch (error) {
        console.error("Failed to delete batch: ", error);
      } finally {
        setCourseToDelete(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : course?.length > 0 ? (
        <>
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#E6F0FF]">
                <th className="p-4 text-left text-sm font-medium text-gray-700">#</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Course Image
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Descripiton
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData?.map((item: any, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm">{serial + startIndex + index}</td>
                  <td className="p-4 text-sm">
                    <Image
                      height={33}
                      width={44}
                      src={`${process.env.NEXT_PUBLIC_STORAGE}/${item.course_image.trimEnd()}`}
                      alt={item.title}
                      className="w-10 h-10"
                    />
                  </td>
                  <td className="p-4 text-sm">{item.name}</td>
                  <td className="p-4 text-sm">{item.description}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* Existing action button */}
                      <button className="text-green-600 hover:text-gray"  onClick={() => setCourseToDelete(item.id)}>
                        <Edit className="w-4 h-4"/>
                      </button>

                      {/* Delete action button opens modal */}
                      <button
                        onClick={() => setCourseToDelete(item.id)}
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, course?.length)} of {course?.length} results
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === page ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
      {courseToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 z-10">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this Course?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setCourseToDelete(null)}
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

export default CourseTable;
