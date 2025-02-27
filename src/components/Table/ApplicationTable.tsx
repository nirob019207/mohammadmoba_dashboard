import React, { useState } from "react";
import { User } from "@/types/interface";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import Image from "next/image";
import {
  useAppApproveMutation,
  useAppRejectMutation,
} from "@/Redux/Api/applicationApi";
import { toast } from "sonner";
import { ImCross } from "react-icons/im";
import { FaCheck, FaEye } from "react-icons/fa";
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
  const [selectedApplication, setSelectedApplication] = useState<User | null>(
    null
  );
  const [approve] = useAppApproveMutation();
  const [reject] = useAppRejectMutation();

  const totalPages = Math.ceil(application?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = application?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const openModal = (app: User) => {
    setSelectedApplication(app);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  // Handler for Approve action (customize as needed)
  // Handler for Approve action
  const handleApprove = async (app: User) => {
    if (!app || !app.id) {
      toast.error("Invalid application data!");
      return;
    }

    try {
      await approve({ status: "approved", id: app.id }).unwrap();
      toast.success("Application approved successfully!");
    } catch (error) {
      toast.error("Failed to approve application!");
      console.error("Approve Error:", error);
    }
  };

  // Handler for Reject action
  const handleReject = async (app: User) => {
    if (!app || !app.id) {
      toast.error("Invalid application data!");
      return;
    }

    try {
      await reject({ status: "rejected", id: app.id }).unwrap();
      toast.success("Application rejected successfully!");
    } catch (error) {
      toast.error("Failed to reject application!");
      console.error("Reject Error:", error);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString();
  const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString();

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : application?.length > 0 ? (
          <>
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[#E6F0FF]">
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    #
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Apllication Status
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedData?.map((app, index) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm">
                      {serial + startIndex + index}
                    </td>
                    <td className="p-4 text-sm">
                      {app.first_name} {app.last_name}
                    </td>
                    <td className="p-4 text-sm">{app.email}</td>
                    <td className="p-4">
                      <span className="text-emerald-600 text-sm font-medium">
                        {app.application_status}{" "}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* View Details Button */}
                        <button
                          onClick={() => openModal(app)}
                          className="flex items-center gap-1 p-2 text-blue-600 rounded hover:bg-blue-600 hover:text-white"
                        >
                          <FaEye className="text-xl" />
                        </button>
                        {/* Approve Button */}
                        <button
                          onClick={() => handleApprove(app)}
                          className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-md"
                        >
                          <FaCheck className="text-xl" />
                        </button>
                        {/* Reject Button */}

                        <button
                          onClick={() => handleReject(app)}
                          className="text-red-600 hover:text-white hover:bg-red-500 p-2 rounded-md"
                        >
                          <ImCross className="text-xl" />
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
                {Math.min(startIndex + itemsPerPage, application.length)} of{" "}
                {application.length} results
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
          <p className="text-center text-gray-700 p-4">
            No applications found.
          </p>
        )}
      </div>

      {/* Modal for Application Details */}
      {selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-11/12 md:w-1/2 max-h-screen overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-medium">First Name:</div>
              <div>{selectedApplication.first_name}</div>

              <div className="font-medium">Last Name:</div>
              <div>{selectedApplication.last_name}</div>

              <div className="font-medium">Date of Birth:</div>
              <div>{formatDate(selectedApplication.date_of_birth)}</div>

              <div className="font-medium">Gender:</div>
              <div>{selectedApplication.gender}</div>

              <div className="font-medium">Nationality:</div>
              <div>{selectedApplication.nationality}</div>

              <div className="font-medium">Contact Number:</div>
              <div>{selectedApplication.contact_number}</div>

              <div className="font-medium">Email:</div>
              <div>{selectedApplication.email}</div>

              <div className="font-medium">Address:</div>
              <div>{selectedApplication.address}</div>

              <div className="font-medium">NID Number:</div>
              <div>{selectedApplication.nid_number}</div>

              <div className="font-medium">Program:</div>
              <div>{selectedApplication.program}</div>

              <div className="font-medium">Bachelor Institution:</div>
              <div>{selectedApplication.bachelor_institution}</div>

              <div className="font-medium">Degree Earned:</div>
              <div>{selectedApplication.degree_earned}</div>

              <div className="font-medium">Graduation Year:</div>
              <div>{selectedApplication.graduation_year}</div>

              <div className="font-medium">GPA:</div>
              <div>{selectedApplication.gpa}</div>

              <div className="font-medium">Job Title:</div>
              <div>{selectedApplication.job_title}</div>

              <div className="font-medium">Years of Experience:</div>
              <div>{selectedApplication.years_experience}</div>

              <div className="font-medium">Responsibilities:</div>
              <div>{selectedApplication.responsibilities}</div>

              <div className="font-medium">Passport Path:</div>

              <div className="font-medium">NID Path:</div>
              <Image
                height={33}
                width={44}
                src={`${process.env.NEXT_PUBLIC_STORAGE}/${selectedApplication.nid_path}`}
                alt="NID"
              />

              <div className="font-medium">Application Status:</div>
              <div>{selectedApplication.application_status}</div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationTable;
