import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPages from "./pages/authentication/AuthPages.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Attendance from "./pages/Attendance.jsx";
import Report from "./pages/Report.jsx";
import Event from "./pages/Event.jsx";
import EventDetail from "./pages/EventDetail.jsx";


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPages currentPage="login" setUser={setUser} />}/>
        <Route path="/register" element={<AuthPages currentPage="register" setUser={setUser} />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/attendance/:id" element={<Attendance />}/>
        <Route path="/report" element={<Report />}/>
        <Route path="/events" element={<Event />}/>
        <Route path="/events/detail/:id" element={<EventDetail />}/>
      </Routes>
    </Router>
  );
}

export default App;
