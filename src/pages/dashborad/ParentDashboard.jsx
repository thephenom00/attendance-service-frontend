import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import ParentUpcomingTrainingCard from "../../components/parent/ParentUpcomingTrainingCard";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";

const ParentDashboard = ({ upcomingTrainings, news, children, isLoading }) => {
  const navigate = useNavigate();
  const hasTrainings = upcomingTrainings && upcomingTrainings.length > 0;

  const hasPendingRegistrations = children?.some(
    (child) => child.requestedTrainingId && !child.training
  );

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      {/* WAITING TO ADD CHILD TO TRAINING */}
      {children?.map((child) => {
        if (child.requestedTrainingId && !child.training) {
          return (
            <Alert
              key={child.id}
              severity="info"
              sx={{
                mb: 2,
                borderRadius: 2,
                backgroundColor: "#E3F2FD",
                border: "1px solid #90CAF9",
                color: "#0D47A1",
                fontWeight: 500,
                fontSize: "15px",
              }}
            >
              Registrace Vašeho dítěte{" "}
              <strong>
                {child.firstName} {child.lastName}
              </strong>{" "}
              je v procesu schválení administrátorem.
            </Alert>
          );
        }
        return null;
      })}
      
      {/* NO CHILD REGISTERED */}
      {hasTrainings ? (
        <ParentUpcomingTrainingCard news={news} trainings={upcomingTrainings} />
      ) : !hasPendingRegistrations ? (
        <Paper sx={{ padding: 4, textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 2, fontSize: "17px" }}
          >
            Nezaregistroval(a) jste dítě na žádný trénink. Použijte tlačítko
            níže nebo v postranním menu pro registraci.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register-child")}
          >
            Zaregistrovat dítě na trénink
          </Button>
        </Paper>
      ) : null}

      <NewsCard news={news} />
    </>
  );
};

export default ParentDashboard;
