import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function About() {
  return (
    <Box sx={{ bgcolor: "#eaeaea", minHeight: "100vh", width: "100vw", p: 0 }}>
      {/* Top header bar, can be replaced by your Navbar */}
      <Box sx={{
        width: "100vw", height: 70, bgcolor: "#6775a1ff", display: "flex", alignItems: "center"
      }}>
        <Box sx={{ mx: "auto", display: "flex", gap: 6}}>
          <Typography component={Link} to="/Home" sx={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>Home</Typography>
          <Typography component={Link} to="/services" sx={{ color: "#fff", fontWeight: 600 , textDecoration: "none"}}>Services</Typography>
          <Typography component={Link} to="/contact" sx={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>Contact</Typography>
        </Box>
      </Box>
      <Grid container sx={{ maxWidth: 1400, mx: "auto", minHeight: "calc(100vh - 70px)", alignItems: "center" }}>
        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Box sx={{
            width: "94%",
            height: 430,
            bgcolor: "#8da1e3ff",
            borderTopRightRadius: 420,
            borderBottomRightRadius: 420,
            p: 7,
            color: "#0b0b0bff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
              ABOUT PAGE
            </Typography>
            <Typography sx={{ mb: 2, lineHeight: 1.7 }}>
                Welcome to FixItNow, your trusted partner for all your home, office, and community repair needs. We are dedicated to connecting you with skilled professionals who can handle everything from minor fixes to major projects. Our mission is to provide reliable, efficient, and affordable services that make your life easier and your spaces better.
                Our platform is designed to be user-friendly, allowing you to quickly find and book the services you need. Whether you're dealing with a leaky faucet, a broken appliance, or planning a renovation, FixItNow has got you covered.
                We believe in transparency and quality, which is why we vet all our service providers to ensure they meet our high standards. Customer satisfaction is our top priority, and we strive to exceed your expectations with every job we undertake.
            </Typography>
            <Box sx={{ mt: 3 }}>
                            <Button
                component={Link}
                to="/home"
                variant="contained"
                sx={{
                    mr: 2,
                    bgcolor: "#222b39",
                    color: "#fff",
                    px: 4,
                    py: 1,
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none"
                }}
                >
                Get Started
                </Button>
            </Box>
          </Box>
        </Grid>
        {/* Right: Profile/image */}
        <Grid item xs={12} md={6} sx={{
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
