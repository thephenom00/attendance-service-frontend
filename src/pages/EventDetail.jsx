import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ApiService } from "../api/api.js";

import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Banknote,
  Phone,
  AtSign,
  Baby,
} from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const event = state?.event;
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchRegisteredChildren = async () => {
      try {
        const data = await ApiService.getEventRegisteredChildren(id);
        setChildren(data);
      } catch (err) {
        console.error("Failed to fetch children", err);
      }
    };
    fetchRegisteredChildren();
  }, [id]);

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

            {children.length !== 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Registrované děti
                </h2>
                <div className="grid gap-2">
                  {[...children]
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
                          <Baby className="w-5 h-5 text-judo-blue" />
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
