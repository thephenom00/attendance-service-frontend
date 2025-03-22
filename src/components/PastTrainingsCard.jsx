import React, { useState } from "react";
import { Calendar, Clock, Pen, School, PersonStanding } from "lucide-react";
import { ApiService } from "../api/api.js";

const PastTraininigsCard = ({ trainings, setTrainings }) => {
  const [editingId, setEditingId] = useState(null);
  const [tempDescription, setTempDescription] = useState("");

  const handleEditClick = (id, description) => {
    setEditingId(id);
    setTempDescription(description);
  };

  const handleSave = async (id) => {
    try {
      const updatedTraining = await ApiService.updateTrainingUnitDescription(
        id,
        tempDescription
      );

      setTrainings((prev) =>
        prev.map((training) =>
          training.id === id
            ? { ...training, description: updatedTraining.description }
            : training
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating description:", error);
      alert("Failed to update description.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempDescription("");
  };

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
        {[...trainings]
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA - dateB !== 0) {
              return dateA - dateB;
            }
            const [startHourA, startMinuteA] = a.time
              .split(" - ")[0]
              .split(":")
              .map(Number);
            const [startHourB, startMinuteB] = b.time
              .split(" - ")[0]
              .split(":")
              .map(Number);
            if (startHourA !== startHourB) {
              return startHourA - startHourB;
            }
            return startMinuteA - startMinuteB;
          })
          .map((training) => (
            <div
              key={training.id}
              className="relative min-h-60 border border-slate-100 rounded-lg p-4 bg-white flex flex-col justify-between"
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
                    <span className="text-[16px]">{training.title}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-[16px] h-[16px] mr-2 text-gray-600" />
                    <span className="text-[14px]">
                      {training.dayOfTheWeek}{" "}
                      {new Date(training.date).toLocaleDateString()} •{" "}
                      {training.time}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex overflow-auto">
                      <Pen className="w-[16px] h-[16px] mr-2" />
                      {editingId === training.id ? (
                        <textarea
                          className="border border-gray-300 rounded m-2 text-[14px] w-full"
                          value={tempDescription}
                          rows={3}
                          onChange={(e) => setTempDescription(e.target.value)}
                        />
                      ) : (
                        <div className="text-[14px] h-[100px] whitespace-pre-wrap pr-1 break-all">
                          {training.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1 right-1 flex gap-2">
                {editingId === training.id ? (
                  <>
                    <button
                      className="text-sm px-2 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600"
                      onClick={() => handleSave(training.id)}
                    >
                      Uložit
                    </button>
                    <button
                      className="text-sm px-2 py-2 text-white bg-rose-500 rounded hover:bg-rose-600"
                      onClick={handleCancel}
                    >
                      Zrušit
                    </button>
                  </>
                ) : (
                  <button
                    className="text-sm px-2 py-2 text-gray-500 hover:cursor-pointer"
                    onClick={() =>
                      handleEditClick(training.id, training.description)
                    }
                  >
                    Upravit
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastTraininigsCard;
