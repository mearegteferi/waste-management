import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography, Divider } from "@mui/material";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Get user ID from URL params

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/account/user_detail/${id}/`,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (!user) return <Typography variant="body1">Loading...</Typography>;

  return (
    <Box mt={10} minHeight="100vh" px={2}>
      <Header title="User Detail" subtitle="User's profile detail" />

      <Box
        maxWidth="lg"
        mx="auto"
        p={3}
        boxShadow={3}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            alt={user.full_name}
            src={`${process.env.REACT_APP_API_URL}${user.image}`}
            sx={{ width: 120, height: 120, border: '2px solid #3f51b5' }}
          />
          <Box flex={1} ml={3}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#3f51b5" }}>
              {user.full_name || "Full Name"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ width: '100%', marginY: 2 }} />

        <Box textAlign="left" sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: "#1976d2", marginBottom: 1 }}>
            Profile Details
          </Typography>
          <Typography variant="body1"><strong>Phone:</strong> {user.phone_number || "N/A"}</Typography>
          <Typography variant="body1"><strong>Status:</strong> {user.status || "N/A"}</Typography>
          <Typography variant="body1"><strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}</Typography>

          {["SUB_CITY", "TABYA"].includes(user.role) && (
            <Typography variant="body1"><strong>Sub City:</strong> {user.sub_city || "N/A"}</Typography>
          )}

          {user.role === "TABYA" && (
            <Typography variant="body1"><strong>Tabya:</strong> {user.tabya || "N/A"}</Typography>
          )}
        </Box>

        <Divider sx={{ width: '100%', marginY: 4 }} />

        <Box textAlign="left" sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: "#1976d2", marginBottom: 2 }}>
            Additional Information
          </Typography>
          {user.role === "UNION" && (
            <>
              <Typography variant="body1"><strong>Union Name:</strong> {user.union_name || "N/A"}</Typography>
              <Typography variant="body1"><strong>Bid Amount:</strong> {user.bid_amount || "N/A"}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetail;
