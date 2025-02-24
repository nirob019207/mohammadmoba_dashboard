import { useState } from "react";
import { User } from "@/types/interface";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";

interface ApplicationTableProps {
  application: User[];
  isLoading: boolean;
  serial: number;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  application,
  isLoading,
  serial,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(application?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = application?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : application?.length > 0 ? (
        <>
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#E6F0FF]">
                <th className="p-4 text-left text-sm font-medium text-gray-700">#</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData?.map((app, index) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm">{serial + startIndex + index}</td>
                  <td className="p-4 text-sm">{app.first_name + " " + app.last_name}</td>
                  <td className="p-4 text-sm">{app.email}</td>
                  <td className="p-4">
                    <span className="text-emerald-600 text-sm font-medium">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                   
                      <Link href={``} className="text-gray-600 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-4 py-3 border-t">
            <div className="text-sm text-gray-700">
              Showing 1 to {Math.min(10, application.length)} of {application.length} results
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
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
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
        <p className="text-center text-gray-700 p-4">No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationTable;
