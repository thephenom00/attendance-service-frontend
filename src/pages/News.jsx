import {React, useEffect, useState} from "react";
import { Calendar } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/trainingUtils.js";
import { ArrowLeft } from "lucide-react";
import { ApiService } from "../api/api.js";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await ApiService.getNews();

        setNews(news);
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      }
    };

    fetchNews();
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
          <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6 mt-[18px]">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6">
              Aktuality
            </h1>
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
        </main>
      </div>
    </div>
  );
};

export default News;
