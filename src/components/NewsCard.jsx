import { React } from "react";
import { formatDate } from "../utils/trainingUtils.js";
import { Calendar } from "lucide-react";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full p-6 mt-[18px]">
      {news && (
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Aktuality
        </h1>
      )}
      <div className="space-y-6">
        {[...news]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-md p-4 bg-white"
            >
              <h2 className="text-2xl font-semibold text-judo-blue">
                {item.name}
              </h2>
              <div className="flex text-1xl items-center text-gray-600 mb-2 mt-2">
                <Calendar className="w-4 h-4 mr-1 text-judo-blue" />
                {formatDate(item.date)}
              </div>
              <p className="text-slate-700 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsCard;