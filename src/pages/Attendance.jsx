import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import AttendanceSchoolCard from "../components/AttendanceSchoolCard.jsx";
import { ArrowLeft } from "lucide-react";
import { ApiService } from "../api/api.js";
import { mapTrainingData } from "../utils/trainingUtils.js";
import AttendanceTable from "../components/AttendanceTable.jsx";

const Attendance = () => {
  const { id } = useParams();
  const [training, setTraining] = useState();

  const [trainerAttendances, setTrainerAttendances] = useState();
  const [childAttendances, setchildAttendances] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const training = await ApiService.getTrainingUnitById(id);
        setTraining(mapTrainingData(training));

        const trainerAtt =
          await ApiService.getTrainerAttendancesByTrainingUnitId(id);
        setTrainerAttendances(trainerAtt);

        const childAtt = await ApiService.getChildAttendancesByTrainingUnitId(
          id
        );
        setchildAttendances(childAtt);
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      }
    };

    fetchData();
  }, [id]);

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
          {training ? (
            <AttendanceSchoolCard
              training={training}
              setTraining={setTraining}
            />
          ) : (
            <p>No training data found.</p>
          )}
          {trainerAttendances && childAttendances && (
            <AttendanceTable
              trainerAttendances={trainerAttendances}
              childAttendances={childAttendances}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Attendance;
