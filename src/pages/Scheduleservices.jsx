import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SpaIcon from "@mui/icons-material/Spa";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { useNavigate } from "react-router-dom";

const dailyServices = [
  {
    icon: <CleaningServicesIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Maid Services",
    desc: "Professional daily cleaning and home assistance for a sparkling house."
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Catering Services",
    desc: "Routine meal planning, home-cooked tiffin and catering delivered each day."
  },
  {
    icon: <LocalLaundryServiceIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Laundry Pickup",
    desc: "Daily laundry pickup and drop for fresh clothes, every morning."
  },
  {
    icon: <LocalFloristIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Gardening Services",
    desc: "Plants watered and garden tended by experts on a daily basis."
  },
  {
    icon: <LocalCafeIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Milk Delivery",
    desc: "Fresh dairy delivered every morning for your family's health."
  },
  {
    icon: <SpaIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Home Health Check",
    desc: "Daily health monitoring and support for residents or elderly."
  }
];

function Scheduleservices() {
  const navigate = useNavigate();

  const handleBookNow = (title) => {
    if (title === "Maid Services") {
      navigate("/maid-schedule");
    } 
    else if(title === "Catering Services") {
      navigate("/catering-schedule");

    } 
     else if(title === "Laundry Pickup") {
      navigate("/laundry-schedule");

    } 
    else if(title === "Milk Delivery") {
        navigate("/milk-schedule");
    }
    else if(title === "Home Health Check") {
        navigate("/home-health-check-schedule");
    }
    else if(title === "Gardening Services") {
        navigate("/gardening-schedule");
    }
    else {
      // Add handling or navigation for other services if needed
      alert(`Booking for ${title} is not yet implemented.`);
    }
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: "#f7f8fa", pb: 0 }}>
      <Box sx={{ pt: 7, pb: 2, textAlign: "center", bgcolor: "#fff" }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Scheduled Daily Services
        </Typography>
        <Typography color="GrayText" mb={2} fontSize={16}>
          FixItNow offers daily scheduled home services for convenience and peace of mind.<br />
          These recurring solutions keep your home running smoothly every day.
        </Typography>
      </Box>

      <Box sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {dailyServices.map(service => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  boxShadow: "0px 2px 8px rgba(100,100,100,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 180,
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                <Box>
                  {service.icon}
                  <Typography fontWeight={600} fontSize={21} color="#657080" mb={1} mt={1}>
                    {service.title}
                  </Typography>
                  <Typography color="#586173" fontSize={15} sx={{ mt: 0.5 }}>
                    {service.desc}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    mt: 5,
                    alignSelf: "stretch",
                    fontWeight: 400,
                    width: "40%",
                    alignItems: "center",
                    bgcolor: "#004089ff",
                    ':hover': { bgcolor: "#0d1c43ff" }
                  }}
                  onClick={() => handleBookNow(service.title)}
                >
                  Book Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box sx={{ bgcolor: "#222b39", color: "#fff", py: 3, textAlign: "center", mt: 8 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          © 2025 FixItNow. All rights reserved.
        </Typography>
        <Typography variant="caption" color="#b0b0b0">
          Your trusted partner for daily home services and maintenance.
        </Typography>
      </Box>
    </Box>
  );
}

export default Scheduleservices;
