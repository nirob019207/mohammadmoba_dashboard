"use client";

import React, { useState } from "react";
import { useContactsQuery } from "@/Redux/Api/contactApi";
import ContactTable from "../Table/ContactTable";
import { Contacts } from "../Interfaces/Subscription";

const ContactPage = () => {
  const [page, setPage] = useState<number>(1); // Current page state
  const limit = 10; // Items per page

  // Fetch contacts data with pagination
  const { data: contact, isLoading } = useContactsQuery({ page, limit });

  // Ensure contactData is typed correctly as an array of Contacts
  const contactData = contact?.data as Contacts[]; // Access data directly as an array of contacts

  // Pagination logic
  const totalPages = Math.ceil((contact?.meta?.total || 1) / limit);

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-white font-semibold flex items-center gap-2">
          Contact
        </h1>
      </div>

      <ContactTable contactData={contactData} isLoading={isLoading} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="text-white px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
