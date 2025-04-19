import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, School } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ApiService } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading"

const MyChild = () => {
  const { user } = useAuth();
  const email = user.email;

  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const children = await ApiService.getParentChildren(email);
        setChildren(children);
      } catch (err) {
        console.error("Failed to fetch parents children", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [email]);

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
          {loading ? <Loading /> : (
            <h1>Ahoj</h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyChild;
