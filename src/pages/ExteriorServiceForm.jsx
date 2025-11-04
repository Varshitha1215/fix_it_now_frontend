import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const exteriorServices = [
  "Exterior Painting",
  "Roof Repair & Maintenance",
  "Gutter Cleaning & Installation",
  "Window & Door Installation",
  "Deck & Patio Construction",
  "Landscaping & Garden Design",
  "Driveway & Walkway Paving",
  "Outdoor Lighting",
  "Fencing & Gate Installation",
  "Pool Installation & Maintenance",
];

const servicePrices = {
  "Exterior Painting": 8000,
  "Roof Repair & Maintenance": 15000,
  "Gutter Cleaning & Installation": 3000,
  "Window & Door Installation": 10000,
  "Deck & Patio Construction": 25000,
  "Landscaping & Garden Design": 20000,
  "Driveway & Walkway Paving": 30000,
  "Outdoor Lighting": 5000,
  "Fencing & Gate Installation": 12000,
  "Pool Installation & Maintenance": 80000,
};

export default function ExteriorServiceForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const preSelectedService = location.state?.selectedService || "";

  const [formValues, setFormValues] = useState({
    name: "",
    registeredEmail: "",
    contact: "+91",
    pincode: "",
    preferredDate: "",
    gender: "",
    address: "",
    selectedService: preSelectedService,
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preSelectedService) {
      setFormValues((prev) => ({ ...prev, selectedService: preSelectedService }));
    }
  }, [preSelectedService]);

  // Remove the empty dependency useEffect and replace with this
  useEffect(() => {
    if (preSelectedService) {
      console.log("Pre-selected service:", preSelectedService); // Debug log
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [preSelectedService]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const valid =
    formValues.name.trim() &&
    formValues.registeredEmail.trim() &&
    formValues.contact.trim().length >= 10 &&
    formValues.pincode.trim() &&
    formValues.preferredDate &&
    formValues.gender &&
    formValues.address.trim() &&
    formValues.selectedService;

  const estimatedCost = formValues.selectedService 
    ? servicePrices[formValues.selectedService] || 0 
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/services/general", {
        serviceCategory: "Exterior",
        selectedService: formValues.selectedService,
        name: formValues.name,
        registeredEmail: formValues.registeredEmail,
        contact: formValues.contact,
        pincode: formValues.pincode,
        preferredDate: formValues.preferredDate,
        gender: formValues.gender,
        address: formValues.address,
        instructions: formValues.instructions,
        estimatedCost: estimatedCost,
      });

      console.log("Service booked:", response.data);
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
          instructions: "",
        });
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error booking service:", err);
      setError(err.response?.data?.message || "Failed to book service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 460,
        margin: "48px auto",
        padding: "28px 25px 22px 25px",
        borderRadius: 14,
        background: "#fff",
        boxShadow: "0 6px 24px rgba(60,80,180,0.13)",
        fontFamily: "Inter, Arial, sans-serif",
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
        Book Exterior Service
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
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
            onChange={(e) => handleChange("selectedService", e.target.value)}
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
            {exteriorServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: "block", fontSize: 15 }}>
            Additional Instructions
          </label>
          <textarea
            value={formValues.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            placeholder="Describe your requirements (optional)"
            rows={3}
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

        {formValues.selectedService && (
          <div
            style={{
              margin: "22px 0 28px 0",
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
            Estimated Cost: ₹{estimatedCost.toLocaleString()}
          </div>
        )}

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
          {loading ? "Confirming..." : "Confirm Booking"}
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
            ✅ Service booked successfully!
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            padding: "11px 33px",
            borderRadius: 9,
            background: "transparent",
            color: "#2348c1",
            fontWeight: 600,
            fontSize: 17,
            border: "2px solid #2348c1",
            cursor: "pointer",
            margin: "12px auto 0",
            display: "block",
            width: "100%",
          }}
        >
          Back to Services
        </button>
      </form>
    </div>
  );
}