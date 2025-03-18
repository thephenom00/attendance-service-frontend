import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />

        <main className="flex-grow p-8 bg-gray-50">
          <h1 className="mb-4 text-xl font-bold">Dashboard Content</h1>
          {[...Array(30)].map((_, i) => (
            <h1 key={i} className="mb-2">
              TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
            </h1>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
