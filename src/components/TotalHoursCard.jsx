import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Clock } from "lucide-react";

const TotalHoursCard = ({ totalHours }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: { xs: "350px", sm: "700px" },
        mt: "30px",
        backgroundColor: "#f9fafb",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Clock className="text-judo-blue" size={28} />
        <Box>
          <Typography
            variant="h5"
            sx={{ color: "#1e3a8a", fontWeight: "bold" }}
          >
            {totalHours} hodin
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
          Celkový počet odtrénovaných hodin tento měsíc
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TotalHoursCard;
