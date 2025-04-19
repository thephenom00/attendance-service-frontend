import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Baby } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ApiService } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const MyChild = () => {
  const { user } = useAuth();
  const email = user.email;

  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (!email) return;
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

        <div className="absolute top-17 sm:top-25 px-5">
          <Link
            to="/dashboard"
            className="flex items-center text-judo-blue hover:underline text-[15px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na dashboard
          </Link>
        </div>

        <main className="flex-grow px-4 sm:px-8 py-8 bg-gray-50 flex flex-col items-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full max-w-2xl space-y-6 mt-[20px]">
              {children.length > 0 ? (
                children.map((child) => (
                  <div
                    key={child.id}
                    className="bg-white rounded-2xl shadow-md p-2 flex items-center gap-4"
                  >
                    <div className="text-judo-blue rounded-full p-4">
                      <Baby className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-md text-gray-800">{child.firstName} {child.lastName}</h2>
                    </div>
                    <div
                      className="bg-judo-blue hover:bg-blue-700 hover:cursor-pointer 
                      text-white px-2 py-2 sm:px-4 sm:py-2 
                      text-sm rounded-xl font-medium transition-colors
                      text-center"
                    >
                      Zobrazit docházku
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No children found.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyChild;
