import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Result } from "@/types/interface";

interface ResultType {
  result: Result[];
  isLoading: boolean;
}

const ResultTable: React.FC<ResultType> = ({ result, isLoading }) => {
  const itemsPerPage = 6; // Show 6 records per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(result?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = result?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : result?.length > 0 ? (
        <>
          {/* Table for Results */}
          <table className="min-w-full table-auto border-collapse bg-white">
            <thead>
              <tr className="bg-[#E6F0FF]">
                <th className="p-4 text-left text-sm font-medium text-gray-700">#</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Profile Image</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Full Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Address</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData?.map((item: any, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm">{startIndex + index + 1}</td>
                  {/* Profile Image Column */}
                  <td className="p-4 text-sm">
                    <img
                      src={item.profile_picture || "/placeholder.svg"} // Use placeholder if image is missing
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  {/* Full Name Column */}
                  <td className="p-4 text-sm">
                    {item.first_name && item.last_name
                      ? `${item.first_name} ${item.last_name}`
                      : "null"} {/* Concatenate first and last name */}
                  </td>
                  {/* Email Column */}
                  <td className="p-4 text-sm">
                    {item.email || "null"}
                  </td>
                  {/* Phone Number Column */}
                  <td className="p-4 text-sm">
                    {item.phone_number || "null"}
                  </td>
                  {/* Address Column */}
                  <td className="p-4 text-sm">
                    {item.address || "null"}
                  </td>
                  {/* Status Column */}
                  <td className="p-4 text-sm">
                    {item.user_status || "null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-4 py-3 border-t">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, result?.length)} of {result?.length} results
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
        <p className="text-center text-gray-700 p-4">No result found.</p>
      )}
    </div>
  );
};

export default ResultTable;
