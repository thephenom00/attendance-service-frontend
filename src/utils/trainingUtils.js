export const getDayName = (input) => {
  const days = [
    { en: "Sunday", cz: "Neděle" },
    { en: "Monday", cz: "Pondělí" },
    { en: "Tuesday", cz: "Úterý" },
    { en: "Wednesday", cz: "Středa" },
    { en: "Thursday", cz: "Čtvrtek" },
    { en: "Friday", cz: "Pátek" },
    { en: "Saturday", cz: "Sobota" },
  ];

  if (typeof input === "number") {
    return days[input]?.cz || "";
  } else if (typeof input === "string") {
    const normalized = input.trim().toLowerCase();
    const match = days.find((day) => day.en.toLowerCase() === normalized);
    return match?.cz || "";
  }

  return "";
};


export const mapTrainingData = (training, isTrainer=true) => {
  const date = new Date(
    training.date[0],
    training.date[1] - 1,
    training.date[2]
  );
  const start = `${training.startTime[0]
    .toString()
    .padStart(2, "0")}:${training.startTime[1].toString().padStart(2, "0")}`;
  const end = `${training.endTime[0]
    .toString()
    .padStart(2, "0")}:${training.endTime[1].toString().padStart(2, "0")}`;
  const dayIndex = date.getDay();

  if (isTrainer) {
    return {
      id: training.id,
      schoolName: training.schoolName,
      name: training.name,
      description: training.description,
      date: `${date}`,
      dayOfTheWeek: getDayName(dayIndex),
      time: `${start} - ${end}`,
      numberOfChildren: training.numberOfChildren,
    };
  } else {
    return {
      id: training.id,
      location: training.schoolName,
      title: training.name,
      date: `${date}`,
      dayOfTheWeek: getDayName(dayIndex),
      time: `${start} - ${end}`,
      childNames: training.childNames,
      trainerNames: training.trainerNames,
      trainerPhoneNumbers: training.trainerPhoneNumbers,
    }
  }


};


export const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray)) return "";
  const [year, month, day] = dateArray;
  return `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year}`;
};

export const formatTime = (time) => {      
  if (!Array.isArray(time)) return "";
  const [hour, minute] = time;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};
