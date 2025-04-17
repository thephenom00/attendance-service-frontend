import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ArrowLeft } from "lucide-react";
import { ApiService } from "../api/api.js";
import ReportTable from "../components/trainer/ReportTable.jsx";
import TotalHoursCard from "../components/trainer/TotalHoursCard";
import { useAuth } from '../context/AuthContext.jsx';

const Report = () => {
  const [report, setReport] = useState([]);
  const { user } = useAuth();
  const email = user.email;

  useEffect(() => {
    if (!user || !user.email) return;
  
    const fetchReport = async () => {
      try {
        const reports = await ApiService.getTrainerCurrentMonthReport(user.email);
        setReport(reports);
      } catch (err) {
        console.error("Failed to fetch report", err);
      }
    };
  
    fetchReport();
  }, [user]);

  const totalHours = report ? report.reduce((sum, training) => sum + training.hours, 0) : 0;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />
        <div className="top-17 sm:top-25 px-5 absolute">
          <Link
            to="/dashboard"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na dashboard
          </Link>
        </div>
        <main className="flex-grow p-8 bg-gray-50 flex flex-col gap-6 items-center">
          <TotalHoursCard totalHours={totalHours} />
          <ReportTable trainerReport={report} />
        </main>
      </div>
    </div>
  );
};

export default Report;
