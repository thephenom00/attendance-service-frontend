import { useParams, useLocation, Link } from "react-router-dom";
import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import AttendanceShoolCard from "../components/AttendanceSchoolCard.jsx";
import { ArrowLeft } from "lucide-react";

const Attendance = () => {
  const { id } = useParams();
  const location = useLocation();
  const training = location.state?.training;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />
        <div className="top-17 sm:top-25 px-5 absolute" >
          <Link
            to="/dashboard"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na dashboard
          </Link>
        </div>
        <main className="flex-grow p-8 bg-gray-50 flex justify-center items-start">
          {training ? (
            <AttendanceShoolCard training={training} />
          ) : (
            <p>No training data found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Attendance;
