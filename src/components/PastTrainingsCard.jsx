import React from "react";
import { Calendar, Clock, Pen, School, PersonStanding } from "lucide-react";

const PastTraininigsCard = () => {
    const trainings = [
        {
          id: 1,
          location: "ZŠ Nová Plzeň",
          title: "Začátečníci",
          date: new Date(2025, 3, 5),
          dayOfTheWeek: "Úterý",
          time: "16:00 - 17:30",
          attendees: 12,
          description: "Základy pádu, ukemi, první seznámení s technikami o-soto-gari a kesa-gatame.",
        },
        {
          id: 2,
          location: "ZŠ Kopce",
          title: "Pokročilí",
          date: new Date(2025, 3, 6),
          dayOfTheWeek: "Středa",
          time: "17:00 - 18:30",
          attendees: 18,
          description: "Procvičení ne-waza, přechody mezi technikami a randori na zemi.",
        },
        {
          id: 3,
          location: "Sokolovna",
          title: "Závodníci",
          date: new Date(2025, 3, 8),
          dayOfTheWeek: "Pátek",
          time: "18:00 - 19:30",
          attendees: 8,
          description: "Taktická příprava na soutěž, kombinace, práce s tempem a útokem.",
        },
        {
          id: 4,
          location: "ZŠ Štěnovice",
          title: "Mladší žáci",
          date: new Date(2025, 3, 4),
          dayOfTheWeek: "Pondělí",
          time: "15:30 - 16:45",
          attendees: 15,
          description: "Hry na rozvoj koordinace, základní techniky házení a fixace soupeře.",
        },
        {
          id: 5,
          location: "ZŠ Borská",
          title: "Rodiče + Děti",
          date: new Date(2025, 3, 9),
          dayOfTheWeek: "Neděle",
          time: "10:00 - 11:00",
          attendees: 20,
          description: "Společné cvičení rodičů s dětmi, hravou formou a nácvik pádů.",
        },
        {
          id: 6,
          location: "ZŠ Na Výsluní",
          title: "Opice",
          date: new Date(2025, 3, 7),
          dayOfTheWeek: "Čtvrtek",
          time: "14:30 - 15:30",
          attendees: 10,
          description: "Cvičení pro nejmenší, kotouly, přetahování, hry na reflex a pohyb.",
        },
      ];
      

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[25px] font-semibold text-slate-800">
          Předešlé tréninky
        </h2>
      </div>
      <div
        className={`grid gap-4 ${
          trainings.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {trainings.map((training) => (
          <div
            key={training.id}
            className="relative min-h-[220px] border border-slate-100 rounded-lg p-4 bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center justify-center">
                  <School className="w-6 h-6 mr-2 text-gray-600" />
                  <h3 className="font-medium text-[19px] text-gray-600">
                    {training.location}
                  </h3>
                </div>
              </div>

              <div className="text-slate-600 space-y-2 text-sm">
                <div className="flex items-center">
                  <PersonStanding className="w-[16px] h-[16px] mr-2 text-gray-600" />
                  <span className="text-[14px]">{training.title}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-[16px] h-[16px] mr-2 text-gray-600" />
                  <span className="text-[14px]">
                    {training.dayOfTheWeek}{" "}
                    {new Date(training.date).toLocaleDateString()} •{" "}
                    {training.time}
                  </span>
                </div>
                <div className="flex">
                  <Pen className="w-[16px] h-[16px] mr-2 mt-1 text-gray-600 shrink-0" />
                  <span className="text-[14px] max-h-[100px] overflow-hidden overflow-ellipsis block">
                    {training.description}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button at Bottom-Right */}
            <div className="absolute bottom-1 right-1">
              <button className="text-sm px-3 py-1 hover:cursor-pointer text-gray-500 text-[14px]">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastTraininigsCard;
