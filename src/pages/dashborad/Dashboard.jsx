import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../api/api.js";
import { mapTrainingData } from "../../utils/trainingUtils.js";
import TrainerDashboard from "./TrainerDashboard.jsx";
import ParentDashboard from "./ParentDashboard.jsx";
import { useAuth } from '../../context/AuthContext.jsx';

const Dashboard = () => {
  const [trainerUpcomingTrainings, setTrainerUpcomingTrainings] = useState([]);
  const [trainerPastTrainings, setTrainerPastTrainings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [parentUpcomingTrainings, setParentUpcomingTrainings] = useState([]);
  const [news, setNews] = useState([]);
  const [children, setChildren] = useState([]);
  
  const { user } = useAuth();
  const email = user.email;
  const role = user.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) return;

    if (role === "ROLE_TRAINER") {
      const fetchTrainerUpcomingTrainings = async () => {
        try {
          setLoading(true);
          const upcomingData = await ApiService.getTrainerUpcomingTrainings(email);
          const pastData = await ApiService.getTrainerPastTrainings(email);

          setTrainerUpcomingTrainings(upcomingData.map((t) => mapTrainingData(t, true)));
          setTrainerPastTrainings(pastData.map((t) => mapTrainingData(t, true)));
        } catch (err) {
          console.error("Failed to fetch trainings", err);
        } finally {
          setLoading(false);
        }
      };

      fetchTrainerUpcomingTrainings();      
    } else if (role === "ROLE_PARENT") {
      const fetchParentData = async () => {
        try {
          setLoading(true);
          const [upcomingData, childrenData, newsData] = await Promise.all([
            ApiService.getParentUpcomingTrainings(email),
            ApiService.getParentChildren(email),
            ApiService.getNews()
          ]);
    
          setParentUpcomingTrainings(upcomingData.map((training) => mapTrainingData(training, false)));
          setChildren(childrenData);
          setNews(newsData);
        } catch (err) {
          console.error("Failed to fetch parent data", err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchParentData();
    }
     else {
      navigate("/")
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
              isLoading={loading}
            />
          )}

          {role === "ROLE_PARENT" && (
            <ParentDashboard
            upcomingTrainings={parentUpcomingTrainings}
            news={news}
            children={children}
            isLoading={loading}
          />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
