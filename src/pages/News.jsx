import { React, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard.jsx";
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
          <NewsCard news={news}/>
        </main>
      </div>
    </div>
  );
};

export default News;
