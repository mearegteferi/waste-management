import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  InputAdornment, 
  Grid, 
  useMediaQuery, 
  CircularProgress,
  Link as MuiLink
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser } from "../state/authSlice";
import { Navigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Formik, Form } from "formik";
import * as yup from "yup";

// Validation
const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// Custom Style for Dark Inputs to match the "Slate" theme
const darkInputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#e2e8f0", // Slate-200
    backgroundColor: "#1e293b", // Slate-800
    borderRadius: "12px",
    transition: "all 0.3s",
    "& fieldset": {
      borderColor: "#334155", // Slate-700
    },
    "&:hover fieldset": {
      borderColor: "#22c55e", // Green-500
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8", // Slate-400
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#22c55e", // Green-500
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const isNonMobile = useMediaQuery("(min-width:900px)");
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await dispatch(login(values));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success('Welcome back!');
        dispatch(loadUser());
      } else if (result.payload) {
        setFieldError("general", result.payload.detail || "Login failed");
      }
    } catch (error) {
      setFieldError("general", "An unexpected error occurred.");
    }
    setSubmitting(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#020617" }}> {/* Slate-950 */}
      
      {/* LEFT SIDE: IMAGE */}
      <Grid
        item
        xs={false}
        md={7}
        sx={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(2, 6, 23, 0.6)", // Dark tint
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 6,
          }}
        >
          <Box mb={4}>
            <Typography variant="h2" fontWeight="bold" color="white" gutterBottom>
              Empowering a <br />
              <span style={{ color: "#4ade80" }}>Greener Future</span>
            </Typography>
            <Typography variant="h6" color="#cbd5e1">
              Secure access for Residents, Data Encoders, and City Admins.
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SIDE: FORM */}
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#0f172a" }} // Slate-900
      >
        <Box width={isNonMobile ? "60%" : "85%"} maxWidth="450px">
          
          {/* Header */}
          <Box mb={5}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <ArrowBack sx={{ color: "#94a3b8", mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#94a3b8" sx={{ '&:hover': { color: 'white'} }}>
                    Back to Home
                </Typography>
            </Link>
            <Typography variant="h4" fontWeight="bold" color="white">
              Log In
            </Typography>
            <Typography variant="body1" color="#94a3b8" mt={1}>
              Enter your credentials to access your account.
            </Typography>
          </Box>

          <Formik 
            initialValues={{ email: "", password: "" }} 
            validationSchema={validationSchema} 
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange, errors, touched, isSubmitting }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap="24px">
                  
                  {/* Email Input */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={darkInputSx}
                  />

                  {/* Password Input */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={darkInputSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "#94a3b8" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* General Error */}
                  {errors.general && (
                    <Box 
                        p={2} 
                        bgcolor="rgba(239, 68, 68, 0.1)" 
                        border="1px solid #ef4444" 
                        borderRadius="8px"
                    >
                        <Typography color="#ef4444" align="center" variant="body2">
                            {errors.general}
                        </Typography>
                    </Box>
                  )}

                  {/* Submit Button */}
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || isLoading}
                    sx={{
                      height: 52,
                      marginTop: 1,
                      backgroundColor: "#16a34a", // Green-600
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 14px 0 rgba(22, 163, 74, 0.39)",
                      "&:hover": {
                        backgroundColor: "#15803d", // Green-700
                      },
                      "&:disabled": {
                        backgroundColor: "#334155",
                        color: "#94a3b8"
                      }
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Log In"}
                  </Button>

                  {/* Footer Links */}
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography variant="body2" color="#94a3b8">
                      Don't have an account?{" "}
                      <Link to="/signup" style={{ color: "#4ade80", textDecoration: "none", fontWeight: "bold" }}>
                        Sign up
                      </Link>
                    </Typography>
                  </Box>

                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;