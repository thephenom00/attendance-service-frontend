import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, School } from "lucide-react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getDayName, formatTime } from "../utils/trainingUtils";

const MyChild = () => {
  

//   useEffect(() => {
//     const child = mockChildren.find((c) => c.id === childId);
//     const trainings = mockTrainings[childId] || [];

//     setTimeout(() => {
//       setChild(child);
//       setTrainings(trainings);
//       setLoading(false);
//     }, 500);
//   }, [childId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />

        <div className="top-17 sm:top-25 px-5 absolute">
          <Link
            to="/my-child"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na seznam dětí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyChild;
