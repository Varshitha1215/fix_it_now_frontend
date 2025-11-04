import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

function AllOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/user/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Confirmed":
        return "info";
      default:
        return "default";
    }
  };

  const filterOrders = (type) => {
    if (type === "all") return orders;
    return orders.filter((order) => order.orderType === type);
  };

  const renderOrderCard = (order) => (
    <Card
      key={order._id}
      elevation={3}
      sx={{
        mb: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {order.orderType === "Scheduled" && <ScheduleIcon color="primary" />}
            {order.orderType === "Instant" && <FlashOnIcon color="warning" />}
            {order.orderType === "General" && <HomeRepairServiceIcon color="action" />}
            <Typography variant="h6" fontWeight={600}>
              {order.orderType === "General"
                ? `${order.serviceCategory} - ${order.selectedService}`
                : order.serviceType}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip label={order.orderType} size="small" color="primary" variant="outlined" />
            <Chip label={order.status} size="small" color={getStatusColor(order.status)} />
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Name:</strong> {order.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Contact:</strong> {order.contact}
            </Typography>
          </Grid>

          {order.orderType !== "General" && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>From:</strong> {order.fromDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>To:</strong> {order.toDate}
                </Typography>
              </Grid>
            </>
          )}

          {order.orderType === "General" && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Pincode:</strong> {order.pincode}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Preferred Date:</strong> {order.preferredDate}
                </Typography>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              <strong>Address:</strong> {order.address}
            </Typography>
          </Grid>

          {order.estimatedCost && (
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" fontWeight={600}>
                Estimated Cost: ₹{order.estimatedCost}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              Booked on: {new Date(order.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderOrders = () => {
    let filteredOrders = [];

    switch (selectedTab) {
      case 0:
        filteredOrders = filterOrders("all");
        break;
      case 1:
        filteredOrders = filterOrders("Scheduled");
        break;
      case 2:
        filteredOrders = filterOrders("Instant");
        break;
      case 3:
        filteredOrders = filterOrders("General");
        break;
      default:
        filteredOrders = orders;
    }

    if (filteredOrders.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Your orders will appear here once you book a service
          </Typography>
        </Box>
      );
    }

    return filteredOrders.map((order) => renderOrderCard(order));
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f7fa", pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #144372ff 0%, #1976d2 100%)",
          color: "white",
          py: 3,
          px: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/home")}
            sx={{ color: "white" }}
          >
            Back
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ShoppingBagIcon sx={{ fontSize: 35 }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              My Orders
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              View all your service bookings
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label={`All (${orders.length})`} />
            <Tab label={`Scheduled (${filterOrders("Scheduled").length})`} />
            <Tab label={`Instant (${filterOrders("Instant").length})`} />
            <Tab label={`General (${filterOrders("General").length})`} />
          </Tabs>

          <Box sx={{ p: 3 }}>{renderOrders()}</Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default AllOrders;