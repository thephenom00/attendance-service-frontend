import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import UpcomingTrainingsCard from "../components/UpcomingTrainingsCard.jsx";
import PastTrainingsCard from "../components/PastTrainingsCard.jsx";
import { ApiService } from "../api/api.js";

const Dashboard = () => {
  const email = localStorage.getItem('email');
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await ApiService.getTrainerUpcomingTrainings(email);
        // Transform the data here
        const mappedTrainings = data.map(training => {
          const date = new Date(training.date[0], training.date[1] - 1, training.date[2]);
          const start = `${training.startTime[0].toString().padStart(2, '0')}:${training.startTime[1].toString().padStart(2, '0')}`;
          const end = `${training.endTime[0].toString().padStart(2, '0')}:${training.endTime[1].toString().padStart(2, '0')}`;
          const dayIndex = date.getDay();
          
          let day = '';
          switch (dayIndex) {
            case 0:
              day = 'Neděle';
              break;
            case 1:
              day = 'Pondělí';
              break;
            case 2:
              day = 'Úterý';
              break;
            case 3:
              day = 'Středa';
              break;
            case 4:
              day = 'Čtvrtek';
              break;
            case 5:
              day = 'Pátek';
              break;
            case 6:
              day = 'Sobota';
              break;
            default:
              day = '';
          }

          return {
            id: training.id,
            location: training.schoolName,
            title: training.name,
            date: `${date}`,
            dayOfTheWeek: `${day}`,
            time: `${start} - ${end}`,
            attendees: training.numberOfChildren
          };
        });

        setTrainings(mappedTrainings);
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
          <UpcomingTrainingsCard trainings={trainings}/>
          <PastTrainingsCard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
