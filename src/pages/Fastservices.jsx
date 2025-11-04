import React, { useState } from "react";
import axios from "axios";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BuildIcon from "@mui/icons-material/Build";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import WifiIcon from "@mui/icons-material/Wifi";
import LockIcon from "@mui/icons-material/Lock";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PoolIcon from "@mui/icons-material/Pool";
import GrassIcon from "@mui/icons-material/Grass";

const services = [
  { label: "Plumbing Fixes", icon: <PlumbingIcon /> },
  { label: "Electrical Repairs", icon: <ElectricalServicesIcon /> },
  { label: "Maid Services", icon: <CleaningServicesIcon /> },
  { label: "Small Appliance Repairs", icon: <BuildIcon /> },
  { label: "Wall Touch-Up Painting", icon: <FormatColorFillIcon /> },
  { label: "Hanging Frames & Décor", icon: <PhotoLibraryIcon /> },
  { label: "Wi-Fi & Router Setup", icon: <WifiIcon /> },
  { label: "Key Duplication / Lock Fixes", icon: <LockIcon /> },
  { label: "Car/Bike Wash & Tyre Services", icon: <DirectionsCarIcon /> },
  { label: "LED Light Installation", icon: <LightbulbIcon /> },
  { label: "Swimming Pool Cleaning", icon: <PoolIcon /> },
  { label: "Gardening", icon: <GrassIcon /> },
];

const subServices = {
  "Plumbing Fixes": [
    "Leaky Faucets and Fixtures",
    "Clogged Drains and Toilets",
    "Low Water Pressure",
    "Leaky or Burst Pipes",
    "Running Toilets",
    "Poor Drainage and Backflow",
    "Noisy or Vibrating Pipes",
    "Faulty or Unsealed Floor Traps",
  ],
  "Electrical Repairs": [
    "Circuit Repair",
    "Breaker Reset",
    "Outlet Fix",
    "Wiring Repair",
    "Fuse Replacement",
  ],
  "Maid Services": [
    "House Cleaning",
    "Kitchen Cleaning",
    "Bathroom Cleaning",
    "Laundry",
    "Window Cleaning",
  ],
  "Small Appliance Repairs": [
    "Refrigerator Repair",
    "Microwave Repair",
    "Washing Machine",
    "Oven Repair",
  ],
  "Wall Touch-Up Painting": [
    "Spot Painting",
    "Crack Filling",
    "Stain Removal",
    "Texture Matching",
  ],
  "Hanging Frames & Décor": [
    "Frame Hanging",
    "Mirror Mounting",
    "Wall Art Installation",
    "Shelf Hanging",
  ],
  "Wi-Fi & Router Setup": [
    "Router Installation",
    "Network Configuration",
    "Password Setup",
    "Signal Optimization",
  ],
  "Key Duplication / Lock Fixes": [
    "Key Duplication",
    "Lock Repair",
    "Lock Installation",
    "Door Handle Repair",
  ],
  "Car/Bike Wash & Tyre Services": [
    "Exterior Wash",
    "Interior Cleaning",
    "Tyre Replacement",
    "Wheel Alignment",
  ],
  "LED Light Installation": [
    "Fixture Mounting",
    "Wiring Setup",
    "Switch Installation",
    "Panel Connection",
  ],
  "Swimming Pool Cleaning": [
    "Debris Removal",
    "Vacuuming",
    "Filter Cleaning",
    "Algae Treatment",
  ],
  "Gardening": [
    "Lawn Mowing",
    "Planting",
    "Weeding",
    "Pruning",
  ],
};

const getEstimate = (service, subService) => {
  if (!service || !subService) return "—";
  const basePrice = {
    "Plumbing Fixes": 800,
    "Electrical Repairs": 650,
    "Maid Services": 900,
    "Small Appliance Repairs": 900,
    "Wall Touch-Up Painting": 750,
    "Hanging Frames & Décor": 350,
    "Wi-Fi & Router Setup": 1500,
    "Key Duplication / Lock Fixes": 5000,
    "Car/Bike Wash & Tyre Services": 1500,
    "LED Light Installation": 400,
    "Swimming Pool Cleaning": 800,
    "Gardening": 900,
  };
  return basePrice[service] || 1000;
};

export default function BookingForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    registeredEmail: "",
    contact: "+91",
    pincode: "",
    preferredDate: "",
    gender: "",
    address: "",
    selectedService: "",
    selectedSubService: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleServiceCardClick = (serviceName) => {
    setFormValues((prev) => ({
      ...prev,
      selectedService: serviceName,
      selectedSubService: "",
    }));
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const valid =
    formValues.name.trim() &&
    formValues.registeredEmail.trim() &&
    formValues.contact.trim().length >= 10 &&
    formValues.pincode.trim() &&
    formValues.preferredDate &&
    formValues.gender &&
    formValues.address.trim() &&
    formValues.selectedService &&
    formValues.selectedSubService;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!valid) return;

    setLoading(true);
    setError("");

    try {
      const estimatedCost = getEstimate(formValues.selectedService, formValues.selectedSubService);
      
      const bookingData = {
        serviceType: `${formValues.selectedService} - ${formValues.selectedSubService}`,
        name: formValues.name,
        registeredEmail: formValues.registeredEmail,
        address: `${formValues.address}, Pincode: ${formValues.pincode}`,
        contact: formValues.contact,
        problemDescription: formValues.instructions || "No additional instructions provided",
        urgency: "Normal",
        estimatedCost: estimatedCost,
        preferredDate: formValues.preferredDate,
        gender: formValues.gender,
        pincode: formValues.pincode,
      };

      const response = await axios.post(
        "http://localhost:5000/api/services/instant",
        bookingData
      );

      console.log("Booking response:", response.data);
      setSuccess(true);
      
      setTimeout(() => {
        setFormValues({
          name: "",
          registeredEmail: "",
          contact: "+91",
          pincode: "",
          preferredDate: "",
          gender: "",
          address: "",
          selectedService: "",
          selectedSubService: "",
          instructions: "",
        });
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error("Error booking service:", err);
      setError(err.response?.data?.message || "Failed to book service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Services Showcase */}
      <div style={{ marginBottom: 48 }}>
        <h2
          style={{
            color: "#2348c1",
            marginBottom: 8,
            fontWeight: 700,
            textAlign: "center",
            fontSize: 36,
          }}
        >
          Our Services
        </h2>
        <p style={{ textAlign: "center", color: "#6c757d", marginBottom: 32, fontSize: 16 }}>
          Select a service to get started with your booking
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {services.map((service) => (
            <div
              key={service.label}
              onClick={() => handleServiceCardClick(service.label)}
              style={{
                padding: 20,
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: formValues.selectedService === service.label ? "2px solid #2348c1" : "2px solid transparent",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(34,96,193,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ fontSize: 48, color: "#2348c1", marginBottom: 12 }}>
                {service.icon}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#333" }}>
                {service.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div
        id="booking-form"
        style={{
          maxWidth: 460,
          margin: "0 auto",
          padding: "28px 25px 22px 25px",
          borderRadius: 14,
          background: "#fff",
          boxShadow: "0 6px 24px rgba(60,80,180,0.13)",
        }}
      >
        <h2
          style={{
            color: "#2348c1",
            marginBottom: 18,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Fast Booking
        </h2>
        <form onSubmit={handleConfirmBooking} autoComplete="off">
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Your Name
            </label>
            <input
              type="text"
              required
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Registered Email/Username
            </label>
            <input
              type="text"
              required
              value={formValues.registeredEmail}
              onChange={(e) => handleChange("registeredEmail", e.target.value)}
              placeholder="Enter registered email/username"
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Contact Number
            </label>
            <input
              type="tel"
              required
              value={formValues.contact}
              minLength={10}
              onChange={(e) => handleChange("contact", e.target.value)}
              placeholder="+91XXXXXXXXXX"
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Pincode
            </label>
            <input
              type="text"
              required
              value={formValues.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              placeholder="Enter Pincode"
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Preferred Date
            </label>
            <input
              type="date"
              required
              value={formValues.preferredDate}
              onChange={(e) => handleChange("preferredDate", e.target.value)}
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15, marginBottom: 8 }}>
              Gender
            </label>
            <div style={{ display: "flex", gap: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formValues.gender === "male"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                />
                Male
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formValues.gender === "female"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                />
                Female
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formValues.gender === "other"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                />
                Other
              </label>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Address
            </label>
            <textarea
              required
              value={formValues.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your full address"
              rows={2}
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Select Service
            </label>
            <select
              required
              value={formValues.selectedService}
              onChange={(e) => {
                handleChange("selectedService", e.target.value);
                handleChange("selectedSubService", "");
              }}
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
              }}
            >
              <option value="">-- Select a service --</option>
              {services.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {formValues.selectedService && subServices[formValues.selectedService] && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
                Select Sub-Service
              </label>
              <select
                required
                value={formValues.selectedSubService}
                onChange={(e) => handleChange("selectedSubService", e.target.value)}
                style={{
                  padding: "10px",
                  marginTop: 4,
                  borderRadius: 8,
                  fontSize: 15,
                  border: "1px solid #d6deeb",
                  width: "100%",
                  background: "#f7f8fa",
                }}
              >
                <option value="">-- Select a sub-service --</option>
                {subServices[formValues.selectedService].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formValues.selectedService && formValues.selectedSubService && (
            <div
              style={{
                margin: "22px 0 16px 0",
                fontWeight: 700,
                fontSize: 18,
                color: "#2348c1",
                background: "#f5f8fe",
                borderRadius: 7,
                padding: "12px 0",
                textAlign: "center",
                boxShadow: "0 1px 8px rgba(80,120,200,0.09)",
              }}
            >
              Estimated Cost: ₹{getEstimate(formValues.selectedService, formValues.selectedSubService)}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
              Additional Instructions
            </label>
            <textarea
              value={formValues.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              placeholder="Describe your problem or special instructions (optional)"
              rows={2}
              style={{
                padding: "10px",
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: "1px solid #d6deeb",
                width: "100%",
                background: "#f7f8fa",
                resize: "vertical",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: 15,
                color: "#d32f2f",
                textAlign: "center",
                fontWeight: 500,
                background: "#ffebee",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!valid || loading}
            style={{
              padding: "11px 33px",
              borderRadius: 9,
              background: valid && !loading ? "#2348c1" : "#d4dbee",
              color: valid && !loading ? "white" : "#7c87a1",
              fontWeight: 600,
              fontSize: 17,
              border: "none",
              cursor: valid && !loading ? "pointer" : "not-allowed",
              margin: "0 auto",
              display: "block",
              width: "100%",
            }}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>

          {success && (
            <div
              style={{
                marginTop: 15,
                color: "#118800",
                textAlign: "center",
                fontWeight: 500,
                background: "#e8f5e9",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              ✅ Booking confirmed successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}