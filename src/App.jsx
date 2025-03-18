import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPages from "./pages/authentication/AuthPages.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<AuthPages currentPage="login" setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<AuthPages currentPage="register" setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
