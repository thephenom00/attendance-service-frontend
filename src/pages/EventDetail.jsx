import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ApiService } from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import {
  ArrowLeft,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  Banknote,
  Phone,
  AtSign,
  Baby,
} from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

const EventDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const event = state?.event;
  const { user } = useAuth();
  const role = user.role;
  const email = user.email;

  const [isLoading, setIsLoading] = useState(false);

  const [registeredChildren, setRegisteredChildren] = useState([]);
  const [childrenStatus, setChildrenStatus] = useState([]);

  const [selectedChild, setSelectedChild] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isChildRegistered, setIsChildRegistered] = useState(false);

  const fetchChildrenEventStatus = async () => {
    try {
      setIsLoading(true);
      const data = await ApiService.getChildrenEventStatus(email, id);
      setChildrenStatus(data);
    } catch (err) {
      console.error("Failed to fetch children event status", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!role) return;

    if (role === "ROLE_TRAINER") {
      const fetchRegisteredChildren = async () => {
        try {
          setIsLoading(true);
          const data = await ApiService.getEventRegisteredChildren(id);
          setRegisteredChildren(data);
        } catch (err) {
          console.error("Failed to fetch children", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRegisteredChildren();
    } else if (role === "ROLE_PARENT") {
      fetchChildrenEventStatus();
    }
  }, [id, role, isChildRegistered]);

  const handleRegister = (childId) => {
    const registerChildToEvent = async () => {
      try {
        await ApiService.registerChildToEvent(childId, id);
        fetchChildrenEventStatus();
      } catch (err) {
        console.error("Failed register child to event", err);
      }
    };
    registerChildToEvent();
  };

  if (!event) {
    return (
      <div className="p-8">
        <p>Event data not found. Please go back to the events list.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />
        <div className="top-17 sm:top-25 px-5 absolute">
          <Link
            to="/events"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na akce
          </Link>
        </div>
        <main className="flex-grow p-8 bg-gray-50 flex flex-col gap-6 items-center">
          {/* LOADING */}
          <Backdrop
            sx={{
              color: "#a5a5a5",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {/* CONFIRM DIALOG */}
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            disableRestoreFocus
          >
            <DialogTitle>Potvrzení přihlášení na akci</DialogTitle>
            <DialogContent>
              {selectedChild && (
                <p>
                  Opravdu chcete přihlásit Vaše dítě{" "}
                  <strong>
                    {selectedChild.firstName} {selectedChild.lastName}
                  </strong>{" "}
                  na akci {event.name}? Tuto akci nebude možné později zrušit.
                </p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Zrušit</Button>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  handleRegister(selectedChild.id);
                  setSelectedChild(null);
                }}
                variant="contained"
                color="primary"
              >
                Přihlásit
              </Button>
            </DialogActions>
          </Dialog>

          <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
            <h1 className="text-2xl font-semibold text-slate-800 mb-4">
              {event.name}
            </h1>

            <div className="text-slate-600 space-y-3 text-[16px]">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-judo-blue" />
                Datum:{" "}
                {event.endDate
                  ? `${event.startDate} - ${event.endDate}`
                  : event.startDate}
              </div>
              {event.startTime && event.endTime && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-judo-blue" />
                  Čas: {event.startTime} - {event.endTime}
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-judo-blue" />
                Místo konání: {event.location}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-judo-blue" />
                {event.places - event.takenPlaces} volných míst
              </div>
              <div className="flex items-center">
                <Banknote className="w-5 h-5 mr-2 text-judo-blue" />
                {event.price !== "0" ? `Cena: ${event.price} Kč` : "Zdarma"}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Popis akce
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {childrenStatus.length !== 0 && role === "ROLE_PARENT" && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Přihlásit dítě na akci
                </h2>
                <div className="grid gap-2">
                  {[...childrenStatus]
                    .sort((a, b) => a.lastName.localeCompare(b.lastName))
                    .map((child) => (
                      <div
                        key={child.id}
                        className="flex flex-row items-center justify-between border border-slate-100 rounded-lg p-3 gap-2"
                        style={{
                          backgroundColor: child.isRegistered
                            ? "#e6f4ea"
                            : "#f8fafc",
                        }}
                      >
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Baby className="w-6 h-6 text-judo-blue flex-shrink-0" />
                          <span className="font-medium text-slate-800">
                            {child.firstName} {child.lastName}
                          </span>
                        </div>

                        {child.isRegistered ? (
                          <div className="ml-auto flex items-center gap-2 text-green-700 font-medium text-[10px] sm:text-sm">
                            <Check className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                            <span>Dítě je přihlášeno na akci</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedChild(child);
                              setIsDialogOpen(true);
                            }}
                            className="ml-auto text-judo-blue border border-judo-blue px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-medium transition duration-200 ease-in-out cursor-pointer hover:bg-blue-50 hover:shadow-sm hover:border-blue-800 hover:text-blue-800"
                          >
                            Přihlásit dítě na akci
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {registeredChildren.length !== 0 && role === "ROLE_TRAINER" && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Registrované děti
                </h2>
                <div className="grid gap-2">
                  {[...registeredChildren]
                    .sort((a, b) => {
                      const lastNameA = a.name.split(" ").slice(-1)[0];
                      const lastNameB = b.name.split(" ").slice(-1)[0];
                      return lastNameA.localeCompare(lastNameB);
                    })
                    .map((child, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-slate-100 rounded-lg p-3 bg-slate-50 gap-2 sm:gap-4"
                      >
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Baby className="w-6 h-6 text-judo-blue flex-shrink-0" />
                          <span className="font-medium text-slate-800">
                            {child.name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{child.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <AtSign className="w-4 h-4 text-gray-500" />
                            <span>{child.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetail;
