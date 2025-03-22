import React, { useState } from "react";
import { Calendar, Clock, School, PersonStanding, Pen } from "lucide-react";
import { ApiService } from "../api/api.js";

const AttendanceShoolCard = ({ training, setTraining }) => {
  const [editingId, setEditingId] = useState(null);
  const [tempDescription, setTempDescription] = useState("");

  const handleEditClick = (id, description) => {
    setEditingId(id);
    if (description !== null) {
      setTempDescription(description);
    }
  };

  const handleSave = async (id) => {
    try {
      const updatedTraining = await ApiService.updateTrainingUnitDescription(
        id,
        tempDescription
      );

      setTraining({
        ...training,
        description: updatedTraining.description,
      });
      
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
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <div className="flex flex-col items-center mb-6 space-y-3">
        <div className="flex items-center space-x-3">
          <School className="w-8 h-8 text-judo-blue" />
          <h3 className="font-medium text-[22px] text-slate-800 text-center">
            {training.location}
          </h3>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-3 sm:space-y-0 text-slate-600 text-sm mb-6">
        <div className="flex items-center">
          <PersonStanding className="w-5 h-5 mr-2 text-judo-blue" />
          <span className="text-[16px]">{training.title}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-judo-blue" />
          <span className="text-[16px]">
            {training.dayOfTheWeek}{" "}
            {new Date(training.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-judo-blue" />
          <span className="text-[16px]">{training.time}</span>
        </div>
      </div>

      <div className="flex items-start text-slate-600 max-h-[90px] overflow-y-auto">
        {training.description && (
          <Pen className="w-5 h-5 mr-2 mt-1 text-judo-blue" />
        )}
        {editingId === training.id ? (
          <textarea
            className="border border-gray-300 rounded m-2 text-[14px] w-full"
            value={tempDescription}
            rows={3}
            onChange={(e) => setTempDescription(e.target.value)}
          />
        ) : (
          <div className="text-[15px] whitespace-pre-wrap break-all">
            {training.description}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        {editingId === training.id ? (
          <>
            <button
              className="text-sm px-2 py-1 mt-4 hover:cursor-pointer text-white bg-emerald-500 rounded hover:bg-emerald-600"
              onClick={() => handleSave(training.id)}
            >
              Save
            </button>
            <button
              className="text-sm px-2 py-1 ml-1 mt-4 hover:cursor-pointer text-white bg-rose-500 rounded hover:bg-rose-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className={`text-sm px-2 py-1 hover:cursor-pointer rounded ${
              training.description
                ? "text-gray-500 hover:text-gray-700 mt-4"
                : "bg-judo-blue text-white hover:bg-blue-600"
            }`}
            onClick={() => handleEditClick(training.id, training.description)}
          >
            {training.description ? "Upravit" : "Vyplnit program tréninku"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AttendanceShoolCard;
