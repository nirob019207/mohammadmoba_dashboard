"use client";

import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import ProfessorDashboard from "@/components/Dashboard/ProfessorDashboard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export default function Page() {
  // Retrieve and decode the token
  const token = Cookies.get("token");
  let userRole = "";

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <div className="w-full">
      {userRole === "professor" ? (
        <ProfessorDashboard />
      ) : (
        <DashboardOverview />
      )}
    </div>
  );
}
