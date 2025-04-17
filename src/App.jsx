import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPages from "./pages/authentication/AuthPages.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashborad/Dashboard.jsx";
import Attendance from "./pages/Attendance.jsx";
import Report from "./pages/Report.jsx";
import Event from "./pages/Event.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import News from "./pages/News.jsx";
import RegisterChild from "./pages/RegisterChild.jsx";
import MyChild from "./pages/MyChild.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPages currentPage="login" />}/>
        <Route path="/register" element={<AuthPages currentPage="register" />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/attendance/:id" element={<Attendance />}/>
        <Route path="/report" element={<Report />}/>
        <Route path="/events" element={<Event />}/>
        <Route path="/events/detail/:id" element={<EventDetail />}/>
        <Route path="/news" element={<News />}/>
        <Route path="/register-child" element={<RegisterChild />}/>
        <Route path="/my-child" element={<MyChild />}/>
      </Routes>
    </Router>
  );
}

export default App;
