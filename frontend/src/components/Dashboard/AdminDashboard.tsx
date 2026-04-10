import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">System Overview</h3>
          <p className="text-gray-500">Monitor all platform activity</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">User Management</h3>
          <p className="text-gray-500">Manage users and roles via Keycloak</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Configuration</h3>
          <p className="text-gray-500">System settings and parameters</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Audit Log</h3>
          <p className="text-gray-500">Track all system events</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
