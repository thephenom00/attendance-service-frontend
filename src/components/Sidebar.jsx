import React, { useEffect, useState } from "react";
import {
  Home,
  FileText,
  Calendar,
  ClipboardList,
  BarChart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const trainerLinks = [
    { name: "Přehled", path: "/dashboard", icon: Home },
    { name: "Tréninky", path: "/trainings", icon: FileText },
    { name: "Akce", path: "/events", icon: Calendar },
    { name: "Report", path: "/report", icon: BarChart },
  ];

  const parentLinks = [
    { name: "Přehled", path: "/dashboard", icon: Home },
    { name: "Příhlásit na trénink", path: "/schools", icon: FileText },
    { name: "Akce", path: "/events", icon: Calendar },
    { name: "Moje dítě", path: "/my-child", icon: ClipboardList },
  ];

  const links = role === "parent" ? parentLinks : trainerLinks;

  return (
    <>
      {/* Hamburger Button only visible on small screens */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer p-2 rounded-md bg-white shadow-md"
        >
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/33 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
            fixed top-0 w-60 md:w-[300px] left-0 z-50 bg-white min-h-screen transition-transform duration-300 flex flex-col 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:relative md:flex`}
        >

        {/* Close Button on small screens */}
        <div className="flex items-center justify-end p-4 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-4 pt-4 flex-grow">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false); // Auto close after clicking (on small screens)
                }}
                className={`flex items-center p-3 rounded-lg transition-colors hover:cursor-pointer ${
                  isActive
                    ? "bg-judo-blue text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <link.icon size={20} />
                <span className="ml-3 font-medium">{link.name}</span>
              </button>
            );
          })}

          <div className="mt-auto border-t border-gray-300 pt-4">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
                setIsOpen(false);
              }}
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
            >
              <LogOut size={20} />
              <span className="ml-3 font-medium">Odhlásit se</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
