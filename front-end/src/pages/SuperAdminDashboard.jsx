// src/pages/SuperAdminDashboard.jsx
import React, { useState } from "react";
import TenantList from "../components/superadmin/TenantList";
import Billing from "../components/superadmin/Billing";
import Logs from "../components/superadmin/Logs";
import Tickets from "../components/superadmin/Tickets";
import SuperAdminSidebar from "../components/superadmin/SuperAdminSidebar";

export default function SuperAdminDashboard() {
  const [currentTab, setCurrentTab] = useState("tenants");

  const renderTab = () => {
    switch (currentTab) {
      case "tenants":
        return <TenantList />;
      case "billing":
        return <Billing />;
      case "logs":
        return <Logs />;
      case "tickets":
        return <Tickets />;
      default:
        return <TenantList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SuperAdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 overflow-auto p-6">
        {renderTab()}
      </main>
    </div>
  );
}