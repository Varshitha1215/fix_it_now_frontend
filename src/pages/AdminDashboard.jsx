import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [completedDialogOpen, setCompletedDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [completedTab, setCompletedTab] = useState(0);

  // Service requests states
  const [scheduledRequests, setScheduledRequests] = useState([]);
  const [instantRequests, setInstantRequests] = useState([]);
  const [generalRequests, setGeneralRequests] = useState([]);

  useEffect(() => {
    // Check if user is logged in and is admin
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token || !user.isAdmin) {
      navigate("/login");
      return;
    }

    setAdminData(user);
    fetchUsers();
    fetchServiceRequests();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      // Filter out admin from the list
      const regularUsers = response.data.filter((user) => !user.isAdmin);
      setUsers(regularUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Fetch service requests from API
  const fetchServiceRequests = async () => {
    try {
      // Fetch scheduled services
      const scheduledResponse = await axios.get("http://localhost:5000/api/services/scheduled");
      setScheduledRequests(scheduledResponse.data);
      
      // Fetch instant services
      const instantResponse = await axios.get("http://localhost:5000/api/services/instant");
      setInstantRequests(instantResponse.data);
      
      // Fetch general services
      const generalResponse = await axios.get("http://localhost:5000/api/services/general");
      setGeneralRequests(generalResponse.data);
      
      console.log("Fetched all services:", {
        scheduled: scheduledResponse.data,
        instant: instantResponse.data,
        general: generalResponse.data
      });
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleServiceClick = () => {
    setServiceDialogOpen(true);
    fetchServiceRequests(); // Refresh data when opening dialog
  };

  const handleCompletedJobsClick = () => {
    setCompletedDialogOpen(true);
    fetchServiceRequests(); // Refresh data when opening dialog
  };

  const handleCloseServiceDialog = () => {
    setServiceDialogOpen(false);
    setSelectedTab(0);
  };

  const handleCloseCompletedDialog = () => {
    setCompletedDialogOpen(false);
    setCompletedTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCompletedTabChange = (event, newValue) => {
    setCompletedTab(newValue);
  };

  // Scheduled Service handlers
  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/scheduled/${id}`);
        console.log("Service deleted:", id);
        fetchServiceRequests(); // Refresh the list
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service request");
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/services/scheduled/${id}`, {
        status: newStatus
      });
      console.log("Status updated:", id, newStatus);
      fetchServiceRequests(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // Instant Service handlers
  const handleDeleteInstantService = async (id) => {
    if (window.confirm("Are you sure you want to delete this instant service request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/instant/${id}`);
        console.log("Instant service deleted:", id);
        fetchServiceRequests();
      } catch (error) {
        console.error("Error deleting instant service:", error);
        alert("Failed to delete instant service request");
      }
    }
  };

  const handleUpdateInstantStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/services/instant/${id}`, {
        status: newStatus
      });
      console.log("Instant status updated:", id, newStatus);
      fetchServiceRequests();
    } catch (error) {
      console.error("Error updating instant status:", error);
      alert("Failed to update status");
    }
  };

  // General Service handlers
  const handleDeleteGeneralService = async (id) => {
    if (window.confirm("Are you sure you want to delete this general service request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/general/${id}`);
        console.log("General service deleted:", id);
        fetchServiceRequests();
      } catch (error) {
        console.error("Error deleting general service:", error);
        alert("Failed to delete general service request");
      }
    }
  };

  const handleUpdateGeneralStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/services/general/${id}`, {
        status: newStatus
      });
      console.log("General status updated:", id, newStatus);
      fetchServiceRequests();
    } catch (error) {
      console.error("Error updating general status:", error);
      alert("Failed to update status");
    }
  };

  const totalServiceRequests =
    scheduledRequests.length + instantRequests.length + generalRequests.length;

  const completedScheduled = scheduledRequests.filter((req) => req.status === "Completed");
  const completedInstant = instantRequests.filter((req) => req.status === "Completed");
  const completedGeneral = generalRequests.filter((req) => req.status === "Completed");
  
  const completedJobs = completedScheduled.length + completedInstant.length + completedGeneral.length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      color: "#e3f2fd",
    },
    {
      title: "Service Requests",
      value: totalServiceRequests,
      icon: <BuildIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      color: "#e8f5e9",
      clickable: true,
      onClick: handleServiceClick,
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#ed6c02" }} />,
      color: "#fff3e0",
      clickable: true,
      onClick: handleCompletedJobsClick,
    },
  ];

  // Render Scheduled and Instant services (original layout)
  const renderServiceList = (requests, type) => {
    if (requests.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
            }}
          >
            {type === "Scheduled" && <ScheduleIcon sx={{ fontSize: 40, color: "#999" }} />}
            {type === "Instant" && <FlashOnIcon sx={{ fontSize: 40, color: "#999" }} />}
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No {type} Requests
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type} service requests will appear here once users submit them.
          </Typography>
        </Box>
      );
    }

    const deleteHandler = type === "Scheduled" ? handleDeleteService : handleDeleteInstantService;
    const statusHandler = type === "Scheduled" ? handleUpdateStatus : handleUpdateInstantStatus;

    return (
      <List>
        {requests.map((request, index) => (
          <React.Fragment key={request._id}>
            <ListItem
              sx={{
                borderRadius: 2,
                mb: 2,
                background: "#fafafa",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {request.serviceType}
                    </Typography>
                    <Chip
                      label={request.status}
                      size="small"
                      color={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "In Progress"
                          ? "warning"
                          : request.status === "Confirmed"
                          ? "info"
                          : "default"
                      }
                    />
                  </Box>
                  <IconButton 
                    edge="end" 
                    color="error"
                    onClick={() => deleteHandler(request._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Name:</strong> {request.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Contact:</strong> {request.contact}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>From:</strong> {request.fromDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>To:</strong> {request.toDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {request.address}
                    </Typography>
                  </Grid>
                  {request.extraInfo && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Extra Info:</strong> {request.extraInfo}
                      </Typography>
                    </Grid>
                  )}
                  {request.serviceFrequency && (
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Frequency:</strong> {request.serviceFrequency}
                      </Typography>
                    </Grid>
                  )}
                  {request.numLiters && (
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Liters:</strong> {request.numLiters}
                      </Typography>
                    </Grid>
                  )}
                  {request.numPeople && (
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>People:</strong> {request.numPeople}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                      Estimated Cost: ₹{request.estimatedCost}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Requested on: {new Date(request.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  {request.status !== "Confirmed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      onClick={() => statusHandler(request._id, "Confirmed")}
                    >
                      Confirm
                    </Button>
                  )}
                  {request.status !== "In Progress" && request.status !== "Completed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="warning"
                      onClick={() => statusHandler(request._id, "In Progress")}
                    >
                      Start
                    </Button>
                  )}
                  {request.status !== "Completed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => statusHandler(request._id, "Completed")}
                    >
                      Complete
                    </Button>
                  )}
                </Box>
              </Box>
            </ListItem>
            {index < requests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    );
  };

  // Render General services with action buttons
  const renderGeneralServiceList = () => {
    if (generalRequests.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
            }}
          >
            <HomeRepairServiceIcon sx={{ fontSize: 40, color: "#999" }} />
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No General Requests
          </Typography>
          <Typography variant="body2" color="text.secondary">
            General service requests will appear here once users submit them.
          </Typography>
        </Box>
      );
    }

    return (
      <List>
        {generalRequests.map((request, index) => (
          <React.Fragment key={request._id}>
            <ListItem
              sx={{
                borderRadius: 2,
                mb: 2,
                background: "#fafafa",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {request.serviceCategory} - {request.selectedService}
                    </Typography>
                    <Chip
                      label={request.status}
                      size="small"
                      color={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "In Progress"
                          ? "warning"
                          : request.status === "Confirmed"
                          ? "info"
                          : "default"
                      }
                    />
                  </Box>
                  <IconButton 
                    edge="end" 
                    color="error"
                    onClick={() => handleDeleteGeneralService(request._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Name:</strong> {request.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Contact:</strong> {request.contact}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Pincode:</strong> {request.pincode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Gender:</strong> {request.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {request.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Preferred Date:</strong> {request.preferredDate}
                    </Typography>
                  </Grid>
                  {request.instructions && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Instructions:</strong> {request.instructions}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Requested on: {new Date(request.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  {request.status !== "Confirmed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      onClick={() => handleUpdateGeneralStatus(request._id, "Confirmed")}
                    >
                      Confirm
                    </Button>
                  )}
                  {request.status !== "In Progress" && request.status !== "Completed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="warning"
                      onClick={() => handleUpdateGeneralStatus(request._id, "In Progress")}
                    >
                      Start
                    </Button>
                  )}
                  {request.status !== "Completed" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleUpdateGeneralStatus(request._id, "Completed")}
                    >
                      Complete
                    </Button>
                  )}
                </Box>
              </Box>
            </ListItem>
            {index < generalRequests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    );
  };

  // Render completed services (read-only view)
  const renderCompletedServices = (requests, type) => {
    if (requests.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40, color: "#999" }} />
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Completed {type} Services
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completed {type.toLowerCase()} services will appear here.
          </Typography>
        </Box>
      );
    }

    return (
      <List>
        {requests.map((request, index) => (
          <React.Fragment key={request._id}>
            <ListItem
              sx={{
                borderRadius: 2,
                mb: 2,
                background: "#f0fdf4",
                border: "2px solid #22c55e",
                "&:hover": {
                  background: "#dcfce7",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon sx={{ color: "#22c55e" }} />
                    <Typography variant="h6" fontWeight={600}>
                      {type === "General" 
                        ? `${request.serviceCategory} - ${request.selectedService}`
                        : request.serviceType
                      }
                    </Typography>
                    <Chip
                      label="Completed"
                      size="small"
                      color="success"
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Name:</strong> {request.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Contact:</strong> {request.contact}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {type !== "General" ? (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          <strong>From:</strong> {request.fromDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>To:</strong> {request.toDate}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Pincode:</strong> {request.pincode}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Preferred Date:</strong> {request.preferredDate}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {request.address}
                    </Typography>
                  </Grid>
                  {request.estimatedCost && (
                    <Grid item xs={12}>
                      <Typography variant="h6" color="success.main" fontWeight={600}>
                        Cost: ₹{request.estimatedCost}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Completed on: {new Date(request.updatedAt || request.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
            {index < requests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #144372ff 0%, #1976d2 100%)",
          color: "white",
          py: 3,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DashboardIcon sx={{ fontSize: 35 }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Welcome back, {adminData?.username}!
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
              background: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ p: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  background: stat.color,
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  cursor: stat.clickable ? "pointer" : "default",
                  "&:hover": {
                    transform: stat.clickable ? "translateY(-5px)" : "none",
                  },
                }}
                onClick={stat.clickable ? stat.onClick : undefined}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h3" fontWeight={700} color="text.primary">
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" mt={1}>
                        {stat.title}
                      </Typography>
                    </Box>
                    {stat.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Users List */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={700} mb={3} color="#144372ff">
            <PeopleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Registered Users
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Typography>Loading users...</Typography>
          ) : users.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <PeopleIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No users registered yet
              </Typography>
            </Box>
          ) : (
            <List>
              {users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <ListItem
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": {
                        background: "#f5f5f5",
                      },
                    }}
                    secondaryAction={
                      <IconButton edge="end" color="error">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {user.username}
                          </Typography>
                          <Chip label="User" size="small" color="primary" variant="outlined" />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            📧 {user.email}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="text.secondary">
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < users.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>

      {/* Service Requests Dialog */}
      <Dialog
        open={serviceDialogOpen}
        onClose={handleCloseServiceDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #144372ff 0%, #1976d2 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BuildIcon />
            <Typography variant="h6" fontWeight={600}>
              Service Requests
            </Typography>
          </Box>
          <IconButton onClick={handleCloseServiceDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<ScheduleIcon />}
              label={`Scheduled (${scheduledRequests.length})`}
              iconPosition="start"
            />
            <Tab
              icon={<FlashOnIcon />}
              label={`Instant (${instantRequests.length})`}
              iconPosition="start"
            />
            <Tab
              icon={<HomeRepairServiceIcon />}
              label={`General (${generalRequests.length})`}
              iconPosition="start"
            />
          </Tabs>
          <Box sx={{ p: 3, minHeight: 300, maxHeight: 600, overflow: "auto" }}>
            {selectedTab === 0 && renderServiceList(scheduledRequests, "Scheduled")}
            {selectedTab === 1 && renderServiceList(instantRequests, "Instant")}
            {selectedTab === 2 && renderGeneralServiceList()}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseServiceDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Completed Jobs Dialog */}
      <Dialog
        open={completedDialogOpen}
        onClose={handleCloseCompletedDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleIcon />
            <Typography variant="h6" fontWeight={600}>
              Completed Jobs
            </Typography>
          </Box>
          <IconButton onClick={handleCloseCompletedDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Tabs
            value={completedTab}
            onChange={handleCompletedTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<ScheduleIcon />}
              label={`Scheduled (${completedScheduled.length})`}
              iconPosition="start"
            />
            <Tab
              icon={<FlashOnIcon />}
              label={`Instant (${completedInstant.length})`}
              iconPosition="start"
            />
            <Tab
              icon={<HomeRepairServiceIcon />}
              label={`General (${completedGeneral.length})`}
              iconPosition="start"
            />
          </Tabs>
          <Box sx={{ p: 3, minHeight: 300, maxHeight: 600, overflow: "auto" }}>
            {completedTab === 0 && renderCompletedServices(completedScheduled, "Scheduled")}
            {completedTab === 1 && renderCompletedServices(completedInstant, "Instant")}
            {completedTab === 2 && renderCompletedServices(completedGeneral, "General")}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseCompletedDialog} variant="outlined" color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;