import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
// import TrainingPage from "./pages/TrainingPage";
import RegistrationForm from "./components/RegistrationForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Contact from "./components/Contact";
import TrainingPage from "./pages/TrainingPage";
import ConsultingPage from "./pages/ConsultingPage";
import EducationPage from "./pages/EducationPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/program/training" element={<TrainingPage />} />
        <Route path="/program/consulting" element={<ConsultingPage />} />
        <Route path="/program/education" element={<EducationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;