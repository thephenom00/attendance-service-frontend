import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CalendarDays, Clock, School, PersonStanding } from "lucide-react";

const ReportTable = ({ trainerReport }) => {
  return (
    <div className="w-[350px] sm:w-[700px]">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          mt: "30px",
          overflowX: "auto",
        }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {/* DATE */}
              <TableCell
                sx={{
                  padding: "12px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                <div className="flex items-center">Datum</div>
              </TableCell>
              {/* SCHOOL */}
              <TableCell
                sx={{
                  padding: "12px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                <div className="flex items-center">Škola</div>
              </TableCell>
              {/* GROUP */}
              <TableCell
                sx={{
                  padding: "12px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                <div className="flex items-center">Skupina</div>
              </TableCell>
              {/* HOURS */}
              <TableCell
                sx={{
                  padding: "12px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="flex items-center">Počet hodin</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...trainerReport]
              .sort((a, b) => {
                const [dayA, monthA] = a.date.split(".").map(Number);
                const [dayB, monthB] = b.date.split(".").map(Number);

                if (monthA !== monthB) return monthA - monthB;
                return dayA - dayB;
              })
              .map((training, index) => (
                <TableRow key={index}>
                  {/* DATE */}
                  <TableCell sx={{ padding: "14px", fontSize: "16px" }}>
                    <div className="flex items-center gap-x-2 whitespace-nowrap">
                      <CalendarDays className="text-gray-500 w-4 h-4" />
                      {training.date}
                    </div>
                  </TableCell>
                  {/* SCHOOL */}
                  <TableCell sx={{ padding: "14px", fontSize: "16px" }}>
                    <div className="flex items-center gap-x-2 whitespace-nowrap">
                      <School className="text-gray-500 w-4 h-4" />
                      {training.school}
                    </div>
                  </TableCell>
                  {/* GROUP */}
                  <TableCell sx={{ padding: "14px", fontSize: "16px" }}>
                    <div className="flex items-center gap-x-2 whitespace-nowrap">
                      <PersonStanding className="text-gray-500 w-4 h-4" />
                      {training.name}
                    </div>
                  </TableCell>
                  {/* HOURS */}
                  <TableCell sx={{ padding: "14px", fontSize: "16px" }}>
                    <div className="flex items-center gap-x-2 whitespace-nowrap">
                      <Clock className="text-gray-500 w-4 h-4" />
                      {training.hours} h
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportTable;
