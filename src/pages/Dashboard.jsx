import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import UpcomingTrainings from "../components/UpcomingTrainingsCard.jsx";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />

        <main className="flex-grow p-8 bg-gray-50 space-y-8">
          <UpcomingTrainings />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
