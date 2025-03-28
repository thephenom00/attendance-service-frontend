export const getDayName = (dayIndex) => {
  const days = [
    "Neděle",
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
    "Sobota",
  ];
  return days[dayIndex] || "";
};

export const mapTrainingData = (training) => {
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

  return {
    id: training.id,
    location: training.schoolName,
    title: training.name,
    description: training.description,
    date: `${date}`,
    dayOfTheWeek: getDayName(dayIndex),
    time: `${start} - ${end}`,
    attendees: training.numberOfChildren,
  };
};


export const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray)) return "";
  const [year, month, day] = dateArray;
  return `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year}`;
};

export const formatTime = (time) => {      
  if (Array.isArray(time)) return "";
  const [hour, minute] = time;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};
