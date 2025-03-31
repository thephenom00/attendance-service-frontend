import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import API_CONFIG from "../config/api.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    email: null,
    role: null,
    firstName: null,
    lastName: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.sub,
          role: decoded.role,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
  }, []);


  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      const decoded = jwtDecode(accessToken);
      setUser({
        email: decoded.sub,
        role: decoded.role,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
      });

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser({
      email: null,
      role: null,
      firstName: null,
      lastName: null,
    });
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
