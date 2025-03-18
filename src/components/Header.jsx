import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../imgs/logo.jpeg";

const Header = ({ variant = "default", className = "" }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`flex items-center justify-between py-3 px-3 ${
        variant === "dashboard" ? "sm:px-7" : "sm:px-35"
      } bg-white shadow-md ${className}`}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 hover:cursor-pointer"
      >
        <img
          src={img}
          alt="Logo"
          className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
        />
        <span className="text-xl sm:text-[28px] font-bold text-judo-blue">DojoLog</span>
      </div>
    </header>
  );
};

export default Header;
