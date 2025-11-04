import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
// ICON IMPORTS
import BrushIcon from "@mui/icons-material/Brush";
import LayersIcon from "@mui/icons-material/Layers";
import FlooringIcon from "@mui/icons-material/SpaceDashboard";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ChairIcon from "@mui/icons-material/Chair";
import HvacIcon from "@mui/icons-material/AcUnit";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import WifiIcon from "@mui/icons-material/Wifi";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PoolIcon from "@mui/icons-material/Pool";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import GrassIcon from "@mui/icons-material/Grass";
import SecurityIcon from "@mui/icons-material/Security";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import EcoIcon from "@mui/icons-material/Forest";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import RecyclingIcon from "@mui/icons-material/Recycling";
import InventoryIcon from "@mui/icons-material/Inventory";
import PublicIcon from "@mui/icons-material/Public";

// Styled card
const ServiceCard = styled(Paper)({
  minWidth: 220,
  maxWidth: 250,
  margin: "0 14px",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: 12,
  boxShadow: "9px 3px 10px rgba(45,60,230,0.09)",
  background: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(34,96,193,0.3)",
  },
});

const sections = [
  {
    title: "Interior Services",
    services: [
      {
        icon: <BrushIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Painting & Wallpapering",
        desc: "Interiors and ceilings, decorative finishes, wall repairs, and beautiful textures for fresh-looking spaces.",
      },
      {
        icon: <LayersIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "False Ceiling & POP Work",
        desc: "Gypsum ceilings, wooden panels, designer false ceilings, and acoustics for any room.",
      },
      {
        icon: <FlooringIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Flooring Solutions",
        desc: "Tiles, wood, vinyl, and marble flooring installation, polishing and repairs.",
      },
      {
        icon: <KitchenIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Modular Kitchen Design",
        desc: "Custom cabinets, chimneys, dishwashers, and wood fixture crafted to fit your functional kitchen.",
      },
      {
        icon: <PlumbingIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Plumbing & Sanitary",
        desc: "Repairs, installations, and solutions for best-in-class performance.",
      },
      {
        icon: <LightbulbIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Electrical & Lighting",
        desc: "Wiring, appliances, lighting systems, sockets, and fixture repairs for safe homes.",
      },
      {
        icon: <ChairIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Carpentry & Furniture",
        desc: "Custom furniture, wardrobes, partitions, and wood fixture crafted to your specifications.",
      },
      {
        icon: <HvacIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "HVAC Installation",
        desc: "Installation, maintenance of A/C systems, split units, and new options for optimal comfort.",
      },
      {
        icon: <ArtTrackIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Interior Décor & Furnishings",
        desc: "Style advisories and curtain, blinds, rugs, and décor parts to complete your home look.",
      },
      {
        icon: <WifiIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Smart Home Automation",
        desc: "Installation of smart switches, home security systems, and wireless monitoring for a modern, connected home.",
      },
    ],
  },
  {
    title: "Exterior Services",
    services: [
      {
        icon: <HomeWorkIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Exterior Painting",
        desc: "Weather protection and exterior beautification with vibrant paints, coatings, and sealants.",
      },
      {
        icon: <SecurityIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Roof Repair & Maintenance",
        desc: "Complete rooftop renovations, extensions, waterproofing, insulation, and leak repair.",
      },
      {
        icon: <WaterDropIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Gutter Cleaning & Installation",
        desc: "Professional gutter cleaning, repair, and installation services.",
      },
      {
        icon: <HomeWorkIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Window & Door Installation",
        desc: "Expert installation and repair of windows and doors for enhanced security and aesthetics.",
      },
      {
        icon: <InventoryIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Deck & Patio Construction",
        desc: "Custom deck and patio design and construction for outdoor living spaces.",
      },
      {
        icon: <GrassIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Landscaping & Garden Design",
        desc: "Professional designs for planters, hardscape, lawns, terrace farming, and outdoor spaces.",
      },
      {
        icon: <DeviceHubIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Driveway & Walkway Paving",
        desc: "Paving, interlocking, slab and decorative concrete work for driveway and paths.",
      },
      {
        icon: <LightbulbIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Outdoor Lighting",
        desc: "Garden, entrance, and security lighting for beautiful outdoor evenings and safety.",
      },
      {
        icon: <SecurityIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Fencing & Gate Installation",
        desc: "Installation of decorative fencing, concrete or brick boundaries for security and design.",
      },
      {
        icon: <PoolIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Pool Installation & Maintenance",
        desc: "Installation, cleaning, and maintenance for your pool and water features.",
      },
    ],
  },
  {
    title: "Eco-Friendly Services",
    services: [
      {
        icon: <EnergySavingsLeafIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Solar Energy Solutions",
        desc: "Harness the sun’s power with solar and solar lighting installation.",
      },
      {
        icon: <RecyclingIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Rainwater Harvesting & Water Recycling",
        desc: "Collect rainwater and reuse it through filtration systems, storage and conserving resources.",
      },
      {
        icon: <EcoIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Green Roofs & Vertical Gardens",
        desc: "Small spaces optimized and soil replaced; includes vertical garden systems to reduce carbon footprint.",
      },
      {
        icon: <LightbulbIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Energy-Efficient Lighting",
        desc: "Switch to LED lights and smart sensors for significant savings.",
      },
      {
        icon: <FlooringIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Eco-Friendly Flooring",
        desc: "Sustainable options including bamboo, cork, and recycled wood.",
      },
      {
        icon: <LayersIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Waste Management Solutions",
        desc: "Segregation and compost units for eco-friendly waste disposal at home.",
      },
      {
        icon: <KitchenIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Natural Ventilation & Daylighting",
        desc: "Design and installation of skylight and stack vents for natural airflow and light.",
      },
      {
        icon: <ArtTrackIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Non-Toxic Paints & Materials",
        desc: "Selection of low-VOC paints and adhesives for a healthier home.",
      },
      {
        icon: <WaterDropIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Water-Saving Fixtures",
        desc: "Installations of dual flush toilets, low-flow showers, and faucet options to conserve water.",
      },
      {
        icon: <GrassIcon color="primary" sx={{ fontSize: 32 }} />,
        title: "Sustainable Landscaping",
        desc: "Expert advice & installation using native species and water-smart design.",
      },
    ],
  },
];

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#222b39", fontWeight: 700 }}>
          FixItNow
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={Link} to="/Home" sx={{ color: "#222b39", fontWeight: 600 }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ color: "#222b39", fontWeight: 600 }}>
            ABOUT
          </Button>
          <Button component={Link} to="/contact" sx={{ color: "#222b39", fontWeight: 600 }}>
            CONTACT
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Services() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceTitle, sectionTitle) => {
    let route = "";
    if (sectionTitle === "Interior Services") {
      route = "/interior";
    } else if (sectionTitle === "Exterior Services") {
      route = "/exterior";
    } else if (sectionTitle === "Eco-Friendly Services") {
      route = "/eco";
    }
    
    navigate(route, { state: { selectedService: serviceTitle } });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#f6f6f8ff", minHeight: "100vh", pb: 6 }}>
        <Box sx={{ textAlign: "center", pt: 5, mb: 3 }}>
          <Typography variant="h4" fontWeight={700} mb={1} sx={{ color: "#000000ff" }}>
            Your Home, Our Expertise
          </Typography>
          <Typography sx={{ color: "#010101ff", fontSize: 15.5 }}>
            FixItNow is your trusted partner for all home improvement and repair needs.<br />
            We offer professional, reliable, and high-quality services to make your home shine.
          </Typography>
        </Box>
        {sections.map((section) => (
          <Box key={section.title} sx={{ mt: 6, maxWidth: "98vw", mx: "auto", mb: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
              sx={{ textAlign: "left", color: "#000000ff", pl: 3 }}
            >
              {section.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                py: 2,
                pl: 3,
                scrollbarWidth: "thin",
                gap: 2,
                "&::-webkit-scrollbar": {
                  height: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#2348c1",
                  borderRadius: "8px",
                },
              }}
            >
              {section.services.map((service) => (
                <ServiceCard 
                  key={service.title}
                  onClick={() => handleServiceClick(service.title, section.title)}
                >
                  {service.icon}
                  <Typography fontWeight={700} fontSize={17} mt={1} mb={0.5}>
                    {service.title}
                  </Typography>
                  <Typography color="GrayText" fontSize={14}>
                    {service.desc}
                  </Typography>
                </ServiceCard>
              ))}
            </Box>
            {/* Book Service Now Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              {section.title === "Interior Services" && (
                <Button
                  component={Link}
                  to="/interior"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#1a337de1",
                    px: 4,
                    py: 1.3,
                    borderRadius: 3,
                    fontSize: 17,
                  }}
                >
                  Book an Interior Service Now
                </Button>
              )}
              {section.title === "Exterior Services" && (
                <Button
                component={Link}
                to="/exterior"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#1a337de1",
                    px: 4,
                    py: 1.3,
                    borderRadius: 3,
                    fontSize: 17,
                  }}
                >
                  Book an Exterior Service Now
                </Button>
              )}
              {section.title === "Eco-Friendly Services" && (
                <Button
                  component={Link}
                  to="/eco"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#1a337de1",
                    px: 4,
                    py: 1.3,
                    borderRadius: 3,
                    fontSize: 17,
                  }}
                >
                  Book an Eco Service Now
                </Button>
              )}
            </Box>
          </Box>
        ))}
        <Box sx={{ bgcolor: "#222b39", color: "#fff", py: 2, textAlign: "center", mt: 6 }}>
          <Typography variant="caption">© 2025 FixItNow. All rights reserved.</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Services;
