import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import UpcomingTrainingsCard from "../components/UpcomingTrainingsCard.jsx";
import PastTrainingsCard from "../components/PastTrainingsCard.jsx";
import { ApiService } from "../api/api.js";

const Dashboard = () => {
  const email = localStorage.getItem('email');
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);

  const getDayName = (dayIndex) => {
    const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    return days[dayIndex] || '';
  };

  const mapTrainingData = (training) => {
    const date = new Date(training.date[0], training.date[1] - 1, training.date[2]);
    const start = `${training.startTime[0].toString().padStart(2, '0')}:${training.startTime[1].toString().padStart(2, '0')}`;
    const end = `${training.endTime[0].toString().padStart(2, '0')}:${training.endTime[1].toString().padStart(2, '0')}`;
    const dayIndex = date.getDay();

    return {
      id: training.id,
      location: training.schoolName,
      title: training.name,
      description: training.description,
      date: `${date}`,
      dayOfTheWeek: getDayName(dayIndex),
      time: `${start} - ${end}`,
      attendees: training.numberOfChildren
    };
  };

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
