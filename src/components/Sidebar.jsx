import React, { useEffect, useState } from 'react';
import { Home, FileText, Calendar, ClipboardList, BarChart, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Assuming role is stored here
    setRole(storedRole);
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
    <aside className="w-20 sm:w-60 bg-white min-h-screen left-0">
      <nav className="flex flex-col space-y-2 px-2 sm:px-4 pt-6">
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
              {/* Hide text on small screens */}
              <span className="ml-3 font-medium hidden sm:inline">{link.name}</span>
            </button>
          );
        })}
        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
          >
            <LogOut size={20} />
            <span className="ml-3 font-medium hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
