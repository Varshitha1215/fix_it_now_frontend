import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Fastservices from "./pages/Fastservices";  // ← Changed to lowercase 's'
import Scheduleservices from "./pages/Scheduleservices";
import InteriorServiceForm from "./pages/InteriorServiceForm";
import ExteriorServiceForm from "./pages/ExteriorServiceForm";
import EcoServicesForm from "./pages/EcoServicesForm";
import MaidScheduleServices from "./pages/MaidScheduleServices";
import CateringScheduleServices from "./pages/CateringScheduleServices";
import LaundryScheduleServices from "./pages/LaundryScheduleServices";
import MilkScheduleServices from "./pages/MilkDeliveryScheduleServices";
import HomeHealthCheckScheduleServices from "./pages/HomeHealthCheckScheduleServices";
import GardeningScheduleServices from "./pages/GardeningScheduleServices";
import AdminDashboard from "./pages/AdminDashboard";
import AllOrders from "./pages/AllOrders";
// import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/contact" element={<Contact />} /> 
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/fastservice" element={<Fastservices />} /> 
      <Route path="/schedule" element={<Scheduleservices />} />
      <Route path="/interior" element={<InteriorServiceForm />} />
      <Route path="/exterior" element={<ExteriorServiceForm />} />
      <Route path="/eco" element={<EcoServicesForm />} />
      <Route path="/maid-schedule" element={<MaidScheduleServices />} />
      <Route path="/catering-schedule" element={<CateringScheduleServices />} />
      <Route path="/laundry-schedule" element={<LaundryScheduleServices />} />
      <Route path="/milk-schedule" element={<MilkScheduleServices />} />
      <Route path="/home-health-check-schedule" element={<HomeHealthCheckScheduleServices />} />
      <Route path="/gardening-schedule" element={<GardeningScheduleServices />} />
    </Routes>
  );
}

export default App;