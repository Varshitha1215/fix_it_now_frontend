import React from "react";
import { Box, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

function Contact() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 0, px: 0 }}>
      <Grid
        container
        component={Paper}
        elevation={3}
        sx={{
          width: "100vw",
          minHeight: "100vh",
          mx: 0,
          borderRadius: 0,
          boxShadow: "none",
          overflow: "hidden"
        }}
      >
        {/* Left Side - Info & Image */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            minHeight: { xs: 220, md: "100vh" },
            background: "linear-gradient(to bottom right, rgba(0,0,0,0.90), rgba(0,0,0,0.7))",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            p: { xs: 3, md: 5 },
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: "linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(0,0,0,0.7))",
              zIndex: 1
            }
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              <RoomIcon sx={{ mb: "-6px", mr: 1 }} fontSize="medium" /> Address
            </Typography>
            <Typography mb={3} fontSize={15} sx={{ opacity: 0.92 }}>
              Services Center,<br />
              Guntur, Andhra Pradesh, India<br />
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} mb={1}>
              <PhoneIcon sx={{ mb: "-5px", mr: 1 }} fontSize="medium" /> Lets Talk
            </Typography>
            <Typography mb={2} sx={{ color: "#52ff8d" }} fontSize={16}>
              +91 1234567890
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} mb={1}>
              <EmailIcon sx={{ mb: "-5px", mr: 1 }} fontSize="medium" /> General Support
            </Typography>
            <Typography fontSize={16} sx={{ color: "#52ff8d" }}>
              supportfixitnow@example.com
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Form */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            bgcolor: "#fff",
            minHeight: { xs: 330, md: "100vh" },
            py: { xs: 5, md: 10 },
            px: { xs: 2, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 4, textAlign: "center" }}>
              Send Us A Message
            </Typography>
            <Grid container spacing={2} component="form" autoComplete="off">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First name"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter your email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Eg. example@email.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter phone number"
                  variant="outlined"
                  fullWidth
                  placeholder="Eg. +1 800 000000"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  placeholder="Write us a message"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#2358aeff",
                    color: "#fff",
                    fontWeight: "bold",
                    py: 1.5,
                    mt: 1,
                    fontSize: 17,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: "#213491ff" }
                  }}
                >
                  SEND MESSAGE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;
