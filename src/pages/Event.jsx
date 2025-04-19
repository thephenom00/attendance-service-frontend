import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import EventCard from "../components/EventCard.jsx";
import { ArrowLeft } from "lucide-react";
import { ApiService } from "../api/api.js";
import { formatDate, formatTime } from "../utils/trainingUtils.js";
import Loading from "../components/Loading.jsx";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getEvents();
        const formatted = data.map((event) => ({
          ...event,
          startDate: formatDate(event.startDate),
          endDate: event.endDate ? formatDate(event.endDate) : null,
          startTime: event.startTime ? formatTime(event.startTime) : null,
          endTime: event.endTime ? formatTime(event.endTime) : null,
          price: event.price.toLocaleString("cs-CZ"),
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Header variant="dashboard" />
        <div className="top-17 sm:top-25 px-5 absolute">
          <Link
            to="/dashboard"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na dashboard
          </Link>
        </div>
        <main className="flex-grow p-8 bg-gray-50 flex flex-col gap-6 items-center">
          {loading ? <Loading/> : <EventCard events={events} />}
        </main>
      </div>
    </div>
  );
};

export default Event;
