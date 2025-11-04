import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BrushIcon from '@mui/icons-material/Brush';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import EcoIcon from '@mui/icons-material/Forest';


const services = [
  { icon: <CleaningServicesIcon sx={{ fontSize: 32 }} />, title: 'Maids', desc: 'Professional cleaning for your home, office, or restaurant' },
  { icon: <BrushIcon sx={{ fontSize: 32 }} />, title: 'Painters', desc: 'Bringing life to your walls with expert painting services' },
  { icon: <PlumbingIcon sx={{ fontSize: 32 }} />, title: 'Plumbers', desc: 'Leak repair, installation, and plumbing maintenance' },
  { icon: <ElectricalServicesIcon sx={{ fontSize: 32 }} />, title: 'Electricians', desc: 'Safe electrical repairs and wiring' },
  { icon: <HouseSidingIcon sx={{ fontSize: 32 }} />, title: 'Interior & Exterior', desc: 'Comprehensive renovations and refurbishments' },
  { icon: <EcoIcon sx={{ fontSize: 32 }} />, title: 'Eco-Friendly Solutions', desc: 'Green cleaning services and smart installations' },
];

function Landing() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          width: '100vw',
          minHeight: '60vh',
          background: 'linear-gradient(180deg, #0c3e8fff 0%, #0c3b8cff 100%)',
          color: '#fff',
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          m: 'auto',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Your Home, Office, and Community, Fixed.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Connect with trusted professionals for your on-demand service needs.
        </Typography>
        <Button
  variant="contained"
  component={Link}
  to="/login"
  sx={{
    mt: 2,
    backgroundColor: '#fff',
    color: '#103877ff',
    fontWeight: 'bold',
    borderRadius: '8px',
    '&:hover': { backgroundColor: '#e3e3e3' },
  }}
>
  GET SERVICE!
</Button>
      </Box>
      <Box sx={{ px: 2, py: 6, backgroundColor: '#f7f7f7' }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Services
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={4}>
          From a quick fix to a major project, we've got you covered.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {services.map((svc) => (
            <Grid item xs={12} sm={6} md={4} key={svc.title}>
              <ServiceCard {...svc} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Section */}
      <Box sx={{ px: 2, py: 5, backgroundColor: '#eef4fd', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About FixItNow
        </Typography>
        <Typography variant="body1" maxWidth="md" mx="auto">
          FixItNow is a platform built to simplify your life by connecting you with certified and reliable service providers. We provide transparent, efficient, and high-quality on-demand services for households, offices, restaurants, and communities.
        </Typography>
      </Box>

      {/* Get in Touch Section */}
      <Box sx={{ px: 2, py: 5, backgroundColor: '#f7f7f7', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" mb={2}>
          Ready to get started? Contact us or book a service.
        </Typography>
        <Button
            component="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=supportfixitnow@example.com"
            target="_blank" 
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              background: "#193388ff",
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
      <Box sx={{ backgroundColor: '#344453ff', color: '#fff', py: 2, textAlign: 'center' }}>
        <Typography variant="caption">© 2025 FixItNow. All rights reserved.</Typography>
      </Box>
    </>
  );
}

export default Landing;
