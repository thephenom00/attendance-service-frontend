import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../imgs/logo.jpeg";
import { useAuth } from '../context/AuthContext';

const Header = ({ variant = "default"}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  let firstName = '';
  let lastName = '';
  let initials = '';

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName?.charAt(0)?.toUpperCase() || "";
    const lastInitial = lastName?.charAt(0)?.toUpperCase() || "";
    return firstInitial + lastInitial;
  };
  
  if (variant === "dashboard") {
    firstName = user.firstName || "";
    lastName = user.lastName || "";
    initials = getInitials(firstName, lastName);
  }

  return (
    <header
      className={`flex items-center justify-between py-3 px-3 ${
        variant === "dashboard" ? "sm:px-7" : "sm:px-35"
      } bg-white shadow-md `}
    >
      <div
        onClick={() => variant === "dashboard" ? navigate("/dashboard") : navigate("/")}
        className="flex items-center space-x-2 hover:cursor-pointer"
      >
        <img
          src={img}
          alt="Logo"
          className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
        />
        <span className="text-xl sm:text-[28px] font-bold text-judo-blue">
          DojoLog
        </span>
      </div>

      {variant === "dashboard" && (
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <div className="flex items-center justify-center w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-judo-blue text-white text-sm sm:text-base font-bold">
            <div className="text-[14px] sm:text-xl">
            {initials}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
