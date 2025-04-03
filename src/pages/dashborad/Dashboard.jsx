import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import { ApiService } from "../../api/api.js";
import { mapTrainingData, getDayName } from "../../utils/trainingUtils.js";
import TrainerDashboard from "./TrainerDashboard.jsx";
// import ParentDashboard from "./ParentDashboard.jsx";
import { useAuth } from '../../context/AuthContext.jsx';

const Dashboard = () => {
  const [trainerUpcomingTrainings, setTrainerUpcomingTrainings] = useState([]);
  const [trainerPastTrainings, setTrainerPastTrainings] = useState([]);

  const [parentUpcomingTrainings, setParentUpcomingTrainings] = useState([]);
  
  const { user } = useAuth();
  const email = user.email;
  const role = user.role;

  useEffect(() => {
    if (role === "ROLE_TRAINER") {
      const fetchTrainerUpcomingTrainings = async () => {
        try {
          const upcomingData = await ApiService.getTrainerUpcomingTrainings(email);
          const pastData = await ApiService.getTrainerPastTrainings(email);

          setTrainerUpcomingTrainings(upcomingData.map(mapTrainingData));
          setTrainerPastTrainings(pastData.map(mapTrainingData));
        } catch (err) {
          console.error("Failed to fetch trainings", err);
        }
      };

      fetchTrainerUpcomingTrainings();
    } else if (role === "ROLE_PARENT") {
      const fetchParentUpcomingTrainings = async () => {
        try {
          const upcomingData = await ApiService.getParentUpcomingTrainings(email);
          setParentUpcomingTrainings(upcomingData);
        } catch (err) {
          console.error("Failed to fetch trainings", err);
        }
      };

      fetchParentUpcomingTrainings();
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
              upcomingTrainings={trainerUpcomingTrainings}
              pastTrainings={trainerPastTrainings}
              setPastTrainings={setTrainerPastTrainings}
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
