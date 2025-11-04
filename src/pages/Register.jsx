import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });

      setSuccess(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdfdfdff",
      }}
    >
      <Paper elevation={3} sx={{ px: 5, py: 5, borderRadius: 3, minWidth: 400, maxWidth: 450 }}>
        <Typography variant="h5" align="center" mb={2} fontWeight={700} color="#144372ff">
          Register Account Form
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 3,
            background: "#1976d2",
            mx: "auto",
            borderRadius: 2,
            mb: 3,
          }}
        />

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

        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your Username"
            label="Username"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            label="Email"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password (min 6 characters)"
            label="Password"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                disabled={loading}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AdminPanelSettingsIcon fontSize="small" />
                <Typography>Register as Admin</Typography>
              </Box>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              background: "#0e7edb",
              fontWeight: 600,
              fontSize: 17,
              textTransform: "none",
            }}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </Button>
        </form>

        <Typography align="center" mt={3} fontSize={15}>
          Already have an account?{" "}
          <Link href="/login" sx={{ fontWeight: 500, cursor: "pointer" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;