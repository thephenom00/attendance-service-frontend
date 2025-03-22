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
    { id: 2, firstName: "Petra Svobodová", present: false },
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
  <TableContainer component={Paper}>
    <Table size="small"> {/* Compact row height */}
      <TableHead>
        <TableRow>
          <TableCell sx={{ padding: "14px", fontSize: "18px" }}>Jméno</TableCell>
          <TableCell sx={{ padding: "14px", fontSize: "18px" }}>Prezence</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendees.map((attendee) => (
          <TableRow key={attendee.id}>
            {/* NAME */}
            <TableCell sx={{ padding: "14px", fontSize: "18px" }}>{attendee.firstName}</TableCell>
            {/* ATTENDANCE */}
            <TableCell sx={{ padding: "14px", fontSize: "18px" }}>
              <Chip
                label={attendee.present ? "Přítomen" : "Nepřítomen"}
                color={attendee.present ? "success" : "error"}
                size="small"
              />
            </TableCell>
            {/* BUTTON */}
            <TableCell sx={{ padding: "0px" }} align="right">
              <IconButton
                size="small"
                color={attendee.present ? "success" : "default"}
                onClick={() => togglePresence(attendee.id)}
              >
                <Check fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color={!attendee.present ? "error" : "default"}
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
