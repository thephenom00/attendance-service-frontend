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
  Modal,
  Box,
  Typography,

} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { AtSign, Users, Phone } from "lucide-react";
import { ApiService } from "../api/api.js";

const AttendanceTable = ({ trainerAttendances, childAttendances }) => {
  const [trainers, setTrainers] = useState(trainerAttendances);
  const [children, setChildren] = useState(childAttendances);
  const [selectedParent, setSelectedParent] = useState(null);

  const handleTrainerPresence = async (trainerAttendanceId, present) => {
    try {
      if (present) {
        await ApiService.markTrainerAttendancePresent(trainerAttendanceId);
      } else {
        await ApiService.markTrainerAttendanceAbsent(trainerAttendanceId);
      }

      setTrainers((prev) =>
        prev.map((trainer) =>
          trainer.id === trainerAttendanceId ? { ...trainer, present } : trainer
        )
      );
    } catch (err) {
      console.error("Failed to update trainer attendance", err);
    }
  };

  const handleChildPresence = async (childAttendanceId, present) => {
    try {
      if (present) {
        await ApiService.markChildAttendancePresent(childAttendanceId);
      } else {
        await ApiService.markChildAttendanceAbsent(childAttendanceId);
      }
      setChildren((prev) =>
        prev.map((child) =>
          child.id === childAttendanceId ? { ...child, present } : child
        )
      );
    } catch (err) {
      console.error("Failed to update child attendance", err);
    }
  };

  const handleParentContact = async (childAttendanceId) => {
    try {
      const parent = await ApiService.getParentContact(childAttendanceId);
      setSelectedParent(parent)
    } catch (err) {
      console.error("Failed to fetch childs parents", err);
    }
  };

  return (
    <div className="w-[350px] sm:w-[700px]">
      {/* TRAINER TABLE */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", overflow: "hidden", mb: "50px" }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell
                sx={{
                  padding: "14px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                  width: "280px",
                }}
              >
                Jméno
              </TableCell>
              <TableCell
                sx={{
                  padding: "14px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                Prezence
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                {/* NAME */}
                <TableCell
                  sx={{
                    padding: "14px",
                    fontSize: "17px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  <span>
                    {trainer.firstName} {trainer.lastName}
                  </span>{" "}
                </TableCell>
                {/* ATTENDANCE */}
                <TableCell sx={{ padding: "14px", fontSize: "17px" }}>
                  <Chip
                    label={trainer.present ? "Přítomen" : "Nepřítomen"}
                    size="small"
                    sx={{
                      backgroundColor: trainer.present ? "#d1fae5" : "#fee2e2",
                      color: trainer.present ? "#15803d" : "#b91c1c",
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
                      backgroundColor: trainer.present
                        ? "#4caf50"
                        : "transparent",
                      borderRadius: "8px",
                      border: trainer.present ? "none" : "1px solid #d1d5db",
                      color: trainer.present ? "white" : "black",
                      "&:hover": {
                        backgroundColor: trainer.present
                          ? "#43a047"
                          : "#f3f4f6",
                      },
                      marginRight: "15px",
                    }}
                    onClick={() => {
                      if (!trainer.present) {
                        handleTrainerPresence(trainer.id, true);
                      }
                    }}
                  >
                    <Check fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: !trainer.present
                        ? "#f44336"
                        : "transparent",
                      borderRadius: "8px",
                      border: !trainer.present ? "none" : "1px solid #d1d5db",
                      color: !trainer.present ? "white" : "black",
                      "&:hover": {
                        backgroundColor: !trainer.present
                          ? "#e53935"
                          : "#f3f4f6",
                      },
                    }}
                    onClick={() => {
                      if (trainer.present) {
                        handleTrainerPresence(trainer.id, false);
                      }
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CHILD TABLE */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell
                sx={{
                  padding: "14px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                  width: "280px",
                }}
              >
                Jméno
              </TableCell>
              <TableCell
                sx={{
                  padding: "14px",
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                Prezence
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((attendee) => (
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
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleParentContact(attendee.id)}
                  >
                    {attendee.firstName} {attendee.lastName}
                  </span>{" "}
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
                    onClick={() => {
                      if (!attendee.present) {
                        handleChildPresence(attendee.id, true);
                      }
                    }}
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
                    onClick={() => {
                      if (attendee.present) {
                        handleChildPresence(attendee.id, false);
                      }
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={!!selectedParent} onClose={() => setSelectedParent(null)}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "28px",
            borderRadius: "18px",
            width: "100%",
            maxWidth: "420px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            outline: "none",
          }}
        >
          <Typography
            variant="h6"
            mb={3}
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
              textAlign: "center",
              color: "#1e40af",
            }}
          >
            Kontakt na rodiče
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users className="text-judo-blue" size={18} />
              <Typography variant="body1">
                <strong>Jméno:</strong> {selectedParent?.firstName}{" "}
                {selectedParent?.lastName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone className="text-judo-blue" size={18} />
              <Typography variant="body1">
                <strong>Telefon:</strong> {selectedParent?.phoneNumber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AtSign className="text-judo-blue" size={18} />
              <Typography variant="body1">
                <strong>Email:</strong> {selectedParent?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AttendanceTable;
