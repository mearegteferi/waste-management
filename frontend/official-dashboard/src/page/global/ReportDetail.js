import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";

const ReportDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const { report } = location.state || {};
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionAlert, setShowRejectionAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  if (!report) {
    return <Typography variant="h6">No report data available</Typography>;
  }

  const handleApprovalOrRejection = async (approvalStatus) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    // Construct the request data
    const requestData = {
      approval_status: approvalStatus,
      rejection_reason: approvalStatus === "rejected" ? rejectionReason : "",
    };

    console.log("request data", requestData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/report/approve-report/${report.id}/`,
        requestData,
        config
      );
      setSnackbarMessage(res.data.message || "Operation successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/view-reports/pending");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An error occurred.";
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error:", error);
    }
  };

  const handleApprove = () => {
    handleApprovalOrRejection("approved");
  };

  const handleReject = () => {
    if (!rejectionReason) {
      setShowRejectionAlert(true);
      return;
    }
    handleApprovalOrRejection("rejected");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box className="p-6 min-h-screen">
      <Header
        title="REPORT DETAILS"
        subtitle={`Detailed view of report ${report.id}`}
      />
      <Paper
        elevation={3}
        sx={{
          padding: "24px",
          marginTop: "24px",
          backgroundColor:
            theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color: colors.grey[100],
          borderRadius: "12px",
        }}
      >
        {/* Information Section */}
        <Stack spacing={2} direction="column">
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Truck Number:
            </strong>{" "}
            {report.truck_number}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Delivering Union:
            </strong>{" "}
            {report.delivering_union_name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Receiver Data Encoder:
            </strong>{" "}
            {report.receiver_data_encoder_name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Metric Ton:
            </strong>{" "}
            {report.metric_ton}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Subcity:
            </strong>{" "}
            {report.sub_city_name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Tabya:
            </strong>{" "}
            {report.tabya_name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Description:
            </strong>{" "}
            {report.description}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
          >
            <strong style={{ fontFamily: "Courier New, monospace" }}>
              Date:
            </strong>{" "}
            {new Date(report.date).toLocaleDateString()}
          </Typography>
          {report.report_status === "rejected" && (
            <Typography
              variant="body1"
              sx={{ color: colors.grey[200], fontFamily: "Arial, sans-serif" }}
            >
              <strong style={{ fontFamily: "Courier New, monospace" }}>
                Rejection Reason:
              </strong>{" "}
              {report.rejection_reason}
            </Typography>
          )}
        </Stack>

        {report.report_status === "pending" && (
          <Box>
            {/* Rejection Reason Section */}
            <Box mt={4}>
              <TextField
                label="Rejection Reason"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  setShowRejectionAlert(false); // Hide the alert when the user starts typing
                }}
                sx={{
                  backgroundColor: colors.grey[900],
                  "& .MuiInputLabel-root": {
                    color: colors.grey[200],
                    fontFamily: "Arial, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: colors.grey[100],
                    fontFamily: "Arial, sans-serif",
                  },
                }}
              />
              {showRejectionAlert && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  Please provide a reason for rejection.
                </Alert>
              )}
            </Box>

            {/* Button Section */}
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApprove}
                sx={{
                  backgroundColor: "#1e88e5",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReject}
                sx={{
                  borderColor: "#e53935",
                  color: "#e53935",
                  "&:hover": {
                    backgroundColor: "#e53935",
                    color: "#fff",
                    borderColor: "#e53935",
                  },
                }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        )}

        {/* Snackbar for notifications */}
        {openSnackbar && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ReportDetail;
