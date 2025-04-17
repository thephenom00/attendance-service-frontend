import React from "react";
import TrainerUpcomingTrainingsCard from "../../components/trainer/TrainerUpcomingTrainingsCard";
import TrainerPastTrainingsCard from "../../components/trainer/TrainerPastTrainingsCard";

const TrainerDashboard = ({ upcomingTrainings, pastTrainings, setPastTrainings }) => (
  <>
    <TrainerUpcomingTrainingsCard trainings={upcomingTrainings} />
    <TrainerPastTrainingsCard trainings={pastTrainings} setTrainings={setPastTrainings} />
  </>
);

export default TrainerDashboard;
