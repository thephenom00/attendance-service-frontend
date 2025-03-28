import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import { ApiService } from "../../api/api.js";
import { mapTrainingData, getDayName } from "../../utils/trainingUtils.js";
import TrainerDashboard from "./TrainerDashBoard.jsx";

const Dashboard = () => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);

  useEffect(() => {
    if (role === "ROLE_TRAINER") {
      const fetchTrainings = async () => {
        try {
          const upcomingData = await ApiService.getTrainerUpcomingTrainings(
            email
          );
          const pastData = await ApiService.getTrainerPastTrainings(email);

          setUpcomingTrainings(upcomingData.map(mapTrainingData));
          setPastTrainings(pastData.map(mapTrainingData));
        } catch (err) {
          console.error("Failed to fetch trainings", err);
        }
      };

      fetchTrainings();
    } else if (role === "ROLE_PARENT") {
    }
  }, [email, role]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />

        <main className="flex-grow p-8 bg-gray-50 space-y-8">
          {role === "ROLE_TRAINER" && (
            <TrainerDashboard
              upcomingTrainings={upcomingTrainings}
              pastTrainings={pastTrainings}
              setPastTrainings={setPastTrainings}
            />
          )}

          {role === "ROLE_PARENT" && (
            <h1>NECUM MOC</h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
