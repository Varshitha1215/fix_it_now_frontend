import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BrushIcon from "@mui/icons-material/Brush";
import EcoIcon from "@mui/icons-material/Nature";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ConstructionIcon from "@mui/icons-material/Construction";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const services = [
  {
    icon: <HomeRepairServiceIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Interior",
    subtitle: "Interior Fixes",
    desc: "From minor wall cracks to full room renovations, our experts handle all your interior needs.",
  },
  {
    icon: <BrushIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Exterior",
    subtitle: "Exterior Upgrades",
    desc: "Weatherproof your home with our repairs, roofing, and siding repair services.",
  },
  {
    icon: <EcoIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Eco-Friendly",
    subtitle: "Eco-Friendly Solutions",
    desc: "Install energy-efficient windows, solar panels, and water-saving fixtures for a greener home.",
  },
  {
    icon: <PlumbingIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Plumbing",
    subtitle: "Plumbing & Electrical",
    desc: "Certified professionals for all your plumbing and electrical repair needs.",
  },
  {
    icon: <ConstructionIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Handyman",
    subtitle: "General Handyman",
    desc: "Need an odd job done? We're here to help you with your to-do list.",
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40, color: "#2348c1" }} />,
    title: "Installments",
    subtitle: "Custom Installments",
    desc: "Have a unique idea? We specialize in bringing you new installments for home to life.",
  },
];

function Navbar({ onProfileClick }) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#222b39", fontWeight: 700 }}>
          FixItNow
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            to="/services"
            sx={{ color: "#222b39", fontWeight: 600 }}
          >
            SERVICES
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{ color: "#222b39", fontWeight: 600 }}
          >
            ABOUT
          </Button>
          <Button
            component={Link}
            to="/contact"
            sx={{ color: "#222b39", fontWeight: 600 }}
          >
            CONTACT
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#2348c1",
              color: "#fff",
              boxShadow: 2,
              borderRadius: "8px",
              fontWeight: 600,
            }}
            onClick={onProfileClick}
          >
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Home() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // adjust key as needed
    sessionStorage.clear();
    navigate("/login");
  };

  const handleFastService = () => {
    navigate("/fastservice");
  };

  const handleScheduleServices = () => {
    navigate("/schedule");
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const menuItems = [
    {
      icon: <DashboardIcon sx={{ color: "#2348c1" }} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <ShoppingBagIcon sx={{ color: "#2348c1" }} />,
      label: "All Orders",
      path: "/orders/all",
    },
    {
      icon: <ShoppingBagIcon sx={{ color: "#2348c1" }} />,
      label: "Orders Ongoing",
      path: "/orders/ongoing",
    },
    {
      icon: <CheckCircleIcon sx={{ color: "#4caf50" }} />,
      label: "Orders Completed",
      path: "/orders/completed",
    },
    {
      icon: <EmojiEventsIcon sx={{ color: "#ffd700" }} />,
      label: "Badges & Awards",
      path: "/badges-awards",
    },
    {
      icon: <StarIcon sx={{ color: "#ff9800" }} />,
      label: "Ratings & Reviews",
      path: "/ratings-reviews",
    },
    {
      icon: <LocationOnIcon sx={{ color: "#f44336" }} />,
      label: "Manage Addresses",
      path: "/addresses",
    },
  ];

  return (
    <>
      <Navbar onProfileClick={toggleProfileMenu} />
      <Box sx={{ width: "100vw", bgcolor: "#f7f8fa", minHeight: "100vh", pb: 8 }}>
        {/* Hero Section */}
        <Box sx={{ pt: 7, pb: 2, textAlign: "center", bgcolor: "#fff" }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Your Home, Our Expertise
          </Typography>
          <Typography color="GrayText" mb={2} fontSize={16}>
            FixItNow is your trusted partner for all home improvement and repair
            needs.
            <br />
            We offer professional, reliable, and high-quality services to make your
            home shine.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#2348c1",
                color: "#2348c1",
                px: 3,
                py: 1,
                borderRadius: "22px",
                fontWeight: 600,
                textTransform: "none",
              }}
              onClick={handleScheduleServices}
            >
              Schedule Service Now
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#2348c1",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: "22px",
                fontWeight: 600,
                textTransform: "none",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#2348c1",
                color: "#2348c1",
                px: 3,
                py: 1,
                borderRadius: "22px",
                fontWeight: 600,
                textTransform: "none",
              }}
              onClick={handleFastService}
            >
              Book an instant service now
            </Button>
          </Box>
        </Box>

        {/* Profile dropdown menu */}
        {profileMenuOpen && (
          <>
            {/* Backdrop */}
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0, 0, 0, 0.3)",
                zIndex: 999,
              }}
              onClick={toggleProfileMenu}
            />

            {/* Settings Menu */}
            <Paper
              elevation={8}
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                borderRadius: 3,
                p: 3,
                zIndex: 1000,
                width: { xs: "90%", sm: 420 },
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <AccountCircleIcon sx={{ fontSize: 32, color: "#2348c1" }} />
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    Account Settings
                  </Typography>
                </Box>
                <IconButton onClick={toggleProfileMenu} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Menu Items */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="outlined"
                    fullWidth
                    startIcon={item.icon}
                    onClick={() => {
                      navigate(item.path);
                      setProfileMenuOpen(false);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      py: 1.5,
                      px: 2,
                      borderColor: "#e0e0e0",
                      color: "text.primary",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "#2348c1",
                        bgcolor: "#f0f4ff",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Danger Zone */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1.5} fontWeight={600}>
                  Account Actions
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    navigate("/account/delete");
                    setProfileMenuOpen(false);
                  }}
                  sx={{
                    bgcolor: "#f44336",
                    color: "#fff",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#d32f2f",
                    },
                  }}
                >
                  Delete / Deactivate Account
                </Button>
              </Box>
            </Paper>
          </>
        )}

        {/* Services Section */}
        <Box sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h5" align="center" fontWeight={700} mb={3}>
            Our Services
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {services.map((service) => (
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
                    minHeight: 160,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {service.icon}
                  <Typography
                    fontWeight={600}
                    fontSize={22}
                    color="#657080"
                    mb={1}
                    mt={1}
                  >
                    {service.title}
                  </Typography>
                  <Typography fontWeight={700} fontSize={15} color="text.primary">
                    {service.subtitle}
                  </Typography>
                  <Typography color="#586173" fontSize={14} sx={{ mt: 0.5 }}>
                    {service.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* About Section */}
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            bgcolor: "#fafbff",
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            mb: 5,
            boxShadow: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={1} color="text.primary">
            About Us
          </Typography>
          <Typography color="GrayText" fontSize={15}>
            FixItNow was founded with a simple mission: to provide fast, reliable,
            and professional home repair services to our community. Our team of
            certified and experienced technicians is committed to excellence,
            ensuring quality for every job, big or small. We believe in
            transparency, fair pricing, and building lasting relationships with our
            clients.
          </Typography>
        </Box>

        {/* Contact Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Contact Us
          </Typography>
          <Typography mb={2} color="GrayText">
            Ready to start your project? Get in touch with us today!
          </Typography>
          <Button
            component="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=supportfixitnow@example.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              background: "#2348c1",
              color: "#fff",
              px: 3,
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Email Us
          </Button>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "#222b39",
            color: "#fff",
            py: 2,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          <Typography variant="caption">© 2025 FixItNow. All rights reserved.</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;
