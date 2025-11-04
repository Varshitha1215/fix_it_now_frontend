import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#ffffffff", // blue background
        color: "white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold", color: "#0c2957ff" }}>
        Profile
      </Typography>

      <Stack spacing={2}>
        <Button variant="contained" color="primary" fullWidth>
          Settings
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          Address
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          Spare Contacts
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          Orders
        </Button>
        <Button variant="outlined" color="error" fullWidth>
          Delete Account / Deactivate Account
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
