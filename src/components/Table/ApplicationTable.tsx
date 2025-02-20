import { User } from '@/types/interface';
import React from 'react';

interface ApplicationTableProps {
  application: User;
  isLoading: boolean;
  serial: number;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ application, isLoading, serial }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-md">
      {isLoading ? (
        <p className="text-white text-center">Loading...</p>
      ) : application && application.length > 0 ? (
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 text-black divide-y divide-gray-600">
            {application?.map((app, index) => (
              <tr key={app.id} className="hover:bg-gray-600 transition">
                <td className="p-3">{serial + index}</td>
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    app.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white text-center">No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationTable;
