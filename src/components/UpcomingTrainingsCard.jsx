import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const upcomingTrainings = [
  {
    id: 1,
    title: "Začátečníci",
    date: "2023-10-25",
    time: "17:00 - 18:30",
    location: "ZŠ Hovnova",
    attendees: 15,
  },
  ,
  {
    id: 2,
    title: 'Pokročilí',
    date: '2023-10-27',
    time: '17:00 - 18:30',
    location: 'ZŠ Na Kopci',
    attendees: 30
  },
  {
    id: 3,
    title: 'Závodníci',
    date: '2023-10-30',
    time: '17:00 - 18:30',
    location: 'ZŠ Daleko',
    attendees: 3
  },
  {
    id: 4,
    title: 'Opice',
    date: '2023-10-31',
    time: '16:00 - 17:00',
    location: 'ZŠ V Riti',
    attendees: 10
  }
];

const UpcomingTrainings = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Nadcházející tréninky
        </h2>
      </div>
      <div
        className={`grid gap-4 ${
          upcomingTrainings.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {upcomingTrainings.map((training) => (
          <div
            key={training.id}
            className="border border-slate-100 rounded-lg p-4 hover:border-dojo-blue/20 transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50/30"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-slate-800">{training.title}</h3>
              <span className="text-sm px-2 py-1 bg-blue-50 text-dojo-blue rounded-full">
                <Users size={14} className="inline mr-1" />
                {training.attendees}
              </span>
            </div>

            <div className="text-slate-600 space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-judo-blue" />
                <span>{new Date(training.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-judo-blue" />
                <span>{training.time}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-judo-blue" />
                <span>{training.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrainings;
