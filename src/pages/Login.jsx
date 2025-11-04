import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userName.trim() || !userPassword.trim()) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: userName,
        password: userPassword,
        isAdmin: false,
      });

      setSuccess("Login successful!");
      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!adminName.trim() || !adminPassword.trim()) {
      setError("Please enter admin username and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: adminName,
        password: adminPassword,
        isAdmin: true,
      });

      setSuccess("Admin login successful!");
      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fafbff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          px: 5,
          py: 6,
          borderRadius: 3,
          minWidth: 400,
          maxWidth: 430,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          mb={1}
          fontWeight={700}
          color="#144372ff"
          sx={{ letterSpacing: ".5px" }}
        >
          {isAdmin ? "Admin Login" : "User Login"}
        </Typography>
        <Typography
          align="center"
          mb={3}
          fontSize={17}
          sx={{ color: "#666", fontWeight: 500 }}
        >
          {isAdmin
            ? "Hey, enter your details to sign in to your Admin account."
            : "Hey, enter your details to sign in to your User account."}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={isAdmin ? handleAdminLogin : handleUserLogin}>
          <TextField
            margin="normal"
            fullWidth
            placeholder={
              isAdmin
                ? "Enter your admin username/email"
                : "Enter your username/email"
            }
            label="Username/Email"
            value={isAdmin ? adminName : userName}
            onChange={(e) =>
              isAdmin
                ? setAdminName(e.target.value)
                : setUserName(e.target.value)
            }
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isAdmin ? (
                    <AdminPanelSettingsIcon color="action" />
                  ) : (
                    <PersonIcon color="action" />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            type="password"
            fullWidth
            placeholder="Enter your password"
            label="Password"
            value={isAdmin ? adminPassword : userPassword}
            onChange={(e) =>
              isAdmin
                ? setAdminPassword(e.target.value)
                : setUserPassword(e.target.value)
            }
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 1,
              background: "#133e66ff",
              fontWeight: 600,
              fontSize: 18,
              boxShadow: "0 2px 8px rgba(38, 57, 234, 0.13)",
              textTransform: "none",
            }}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : isAdmin ? (
                <AdminPanelSettingsIcon />
              ) : (
                <AccountCircleIcon />
              )
            }
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </form>

        <Typography align="center" mt={2} fontSize={15}>
          Don't have an account?{" "}
          <Link href="/register" sx={{ fontWeight: 500 }}>
            Signup Now
          </Link>
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            color: "#20a064",
            border: "1.5px solid #20a064",
            fontWeight: 600,
            textTransform: "none",
            fontSize: 16,
          }}
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => {
            setIsAdmin((prev) => !prev);
            setError("");
            setSuccess("");
          }}
          disabled={loading}
        >
          {isAdmin ? "SWITCH TO USER LOGIN" : "SWITCH TO ADMIN LOGIN"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;