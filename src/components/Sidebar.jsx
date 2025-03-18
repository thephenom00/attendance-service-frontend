import React, { useEffect, useState } from 'react';
import { Home, FileText, Calendar, ClipboardList, BarChart, LogOut, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // Always true on large screens

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    // Check screen size at load
    if (window.innerWidth < 768) {
      setIsOpen(false); // Close on small screens by default
    } else {
      setIsOpen(true); // Open on big screens
    }
  }, []);

  const trainerLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Trainings', path: '/trainings', icon: FileText },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Report', path: '/report', icon: BarChart },
  ];

  const parentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Register Training', path: '/schools', icon: FileText },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'My Child', path: '/my-child', icon: ClipboardList },
  ];

  const links = role === 'parent' ? parentLinks : trainerLinks;

  return (
    <aside
      className={`${
        isOpen ? 'w-60' : 'w-20'
      } bg-white min-h-screen left-0 transition-all duration-300 flex flex-col`}
    >
      {/* Hamburger only visible on small screens */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="hover:cursor-pointer">
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex flex-col ${isOpen ? 'px-4' : 'px-2'} pt-4 flex-grow`}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex items-center p-3 rounded-lg transition-colors hover:cursor-pointer ${
                isActive
                  ? 'bg-judo-blue text-white'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <link.icon size={20} />
              <span className={`ml-3 font-medium transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0 hidden sm:inline'
              }`}>
                {link.name}
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <div className="mt-auto border-t pt-4">
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
          >
            <LogOut size={20} />
            <span className={`ml-3 font-medium transition-opacity ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden sm:inline'
            }`}>
              Logout
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
