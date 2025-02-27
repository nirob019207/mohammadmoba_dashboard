"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Material } from "@/types/interface";

interface CourseType {
  material: Material[];
  isLoading: boolean;
  serial: number;
}

const StuMaterialTable: React.FC<CourseType> = ({ material, isLoading, serial }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(material?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = material?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : material?.length > 0 ? (
        <>
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#E6F0FF]">
                <th className="p-4 text-left text-sm font-medium text-gray-700">#</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Lesson</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Video Time</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                  <td className="p-4 text-sm text-gray-700">{item.title}</td>
                  <td className="p-4 text-sm text-gray-700">{item.subtitle}</td>
                  <td className="p-4 text-sm text-gray-700">{item.total_time}</td>
                  <td className="p-4 text-sm text-gray-700">{item.date}</td>
                  <td className="p-4 text-sm text-gray-700">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <PlayCircle className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-4 py-3 border-t">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, material?.length)} of {material?.length} results
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
        <p className="text-center text-gray-700 p-4">No Material found.</p>
      )}
    </div>
  );
};

export default StuMaterialTable;
