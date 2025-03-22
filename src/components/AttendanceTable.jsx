import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const AttendanceTable = () => {
  const [attendees, setAttendees] = useState([
    { id: 1, firstName: "Jan Novák", present: true },
    {
      id: 2,
      firstName: "Petra Svobodová",
      present: false,
    },
    { id: 3, firstName: "Tomáš Dvořák", present: true },
    { id: 4, firstName: "Lucie Horáková", present: false },
    { id: 5, firstName: "David Procházka", present: true },
    { id: 6, firstName: "Eva Krejčí", present: true },
  ]);

  const togglePresence = (id) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, present: !a.present } : a))
    );
  };

  return (
    <div className="w-[350px] sm:w-[1000px]">
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell sx={{ padding: "14px", fontSize: "18px", color: "#374151", fontWeight: "bold"  }}>
                Jméno
              </TableCell>
              <TableCell sx={{ padding: "14px", fontSize: "18px", color: "#374151", fontWeight: "bold"  }}>
                Prezence
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                {/* NAME */}
                <TableCell
                  sx={{
                    padding: "14px",
                    fontSize: "17px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {attendee.firstName}
                </TableCell>
                {/* ATTENDANCE */}
                <TableCell sx={{ padding: "14px", fontSize: "17px" }}>
                  <Chip
                    label={attendee.present ? "Přítomen" : "Nepřítomen"}
                    size="small"
                    sx={{
                      backgroundColor: attendee.present ? "#d1fae5" : "#fee2e2",
                      color: attendee.present ? "#15803d" : "#b91c1c",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                {/* BUTTON */}
                <TableCell
                  sx={{ padding: "20px", whiteSpace: "nowrap" }}
                  align="right"
                >
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: attendee.present
                        ? "#4caf50"
                        : "transparent",
                      borderRadius: "8px",
                      border: attendee.present ? "none" : "1px solid #d1d5db",
                      color: attendee.present ? "white" : "black",
                      "&:hover": {
                        backgroundColor: attendee.present
                          ? "#43a047"
                          : "#f3f4f6",
                      },
                      marginRight: "15px",
                    }}
                    onClick={() => togglePresence(attendee.id)}
                  >
                    <Check fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: !attendee.present
                        ? "#f44336"
                        : "transparent",
                      borderRadius: "8px",
                      border: !attendee.present ? "none" : "1px solid #d1d5db",
                      color: !attendee.present ? "white" : "black",
                      "&:hover": {
                        backgroundColor: !attendee.present
                          ? "#e53935"
                          : "#f3f4f6",
                      },
                    }}
                    onClick={() => togglePresence(attendee.id)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceTable;
