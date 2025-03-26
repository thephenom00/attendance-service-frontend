import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import UpcomingTrainingsCard from "../components/UpcomingTrainingsCard.jsx";
import PastTrainingsCard from "../components/PastTrainingsCard.jsx";
import { ApiService } from "../api/api.js";
import { mapTrainingData, getDayName } from "../utils/trainingUtils.js";


const Dashboard = () => {
  const email = localStorage.getItem('email');
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const upcomingData = await ApiService.getTrainerUpcomingTrainings(email);
        const pastData = await ApiService.getTrainerPastTrainings(email);

        setUpcomingTrainings(upcomingData.map(mapTrainingData));
        setPastTrainings(pastData.map(mapTrainingData));
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      }
    };

    fetchTrainings();
  }, [email]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />

        <main className="flex-grow p-8 bg-gray-50 space-y-8">
          <UpcomingTrainingsCard trainings={upcomingTrainings} />
          <PastTrainingsCard trainings={pastTrainings} setTrainings={setPastTrainings} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
