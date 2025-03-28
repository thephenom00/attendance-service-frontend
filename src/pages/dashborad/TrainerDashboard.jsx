import React from "react";
import UpcomingTrainingsCard from "../../components/UpcomingTrainingsCard";
import PastTrainingsCard from "../../components/PastTrainingsCard";

const TrainerDashboard = ({ upcomingTrainings, pastTrainings, setPastTrainings }) => (
  <>
    <UpcomingTrainingsCard trainings={upcomingTrainings} />
    <PastTrainingsCard trainings={pastTrainings} setTrainings={setPastTrainings} />
  </>
);

export default TrainerDashboard;
