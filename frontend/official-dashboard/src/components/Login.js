import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  CircularProgress,
  InputBase,
  Grid,
  useMediaQuery
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser, logout } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { tokens } from "../theme";

// Validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:900px)"); // Breakpoint for split screen

  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await dispatch(login(values));

      if (result.meta.requestStatus === "fulfilled") {
        const userStatus = result.payload.status;
        const userRole = result.payload.role;

        if (userRole === "RESIDENT") {
          setFieldError("general", "No active account found with the given credentials");
          dispatch(logout());
          navigate("/");
        } else if (userStatus === "PENDING") {
          navigate("/activation");
        } else {
          navigate("/dashboard");
        }
        await dispatch(loadUser());
      } else {
        setFieldError("general", result.payload?.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFieldError("general", "An unexpected error occurred.");
    }
    setSubmitting(false);
  };

  // Reusable Input Styles (Theme Aware)
  const inputStyles = {
    width: "100%",
    backgroundColor: colors.primary[400],
    borderRadius: "8px",
    padding: "12px 16px",
    border: `1px solid ${colors.grey[700]}`,
    color: colors.grey[100],
    fontSize: "14px",
    transition: "all 0.2s ease",
    "&.Mui-focused": {
      border: `1px solid ${colors.blueAccent[500]}`,
      boxShadow: `0 0 0 4px ${colors.blueAccent[500]}20`, // Smooth glow
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      
      {/* LEFT SIDE: IMAGE (Hidden on Mobile) */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay to make text/logo pop (optional) */}
        <Box 
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: colors.primary[500],
                opacity: 0.4, // Adjust based on how much you want to tint the image
            }} 
        />
        
        {/* Optional: Branding on the Image Side */}
      </Grid>

      {/* RIGHT SIDE: LOGIN FORM */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Box}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.background.default}
        boxShadow={isNonMobile ? "-10px 0px 30px rgba(0,0,0,0.2)" : "none"}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Form Header */}
          <Box mb="2rem">
            <Typography component="h1" variant="h2" fontWeight="bold" color={colors.grey[100]}>
              Welcome Back
            </Typography>
            <Typography variant="h5" color={colors.grey[300]} mt="8px">
              Please enter your details to sign in.
            </Typography>
          </Box>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap="24px">
                  
                  {/* Email */}
                  <Box>
                    <Typography 
                        variant="h6" 
                        fontWeight="600" 
                        color={colors.grey[300]} 
                        mb="8px"
                    >
                        Email
                    </Typography>
                    <InputBase
                      fullWidth
                      name="email"
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Enter your email"
                      sx={{
                        ...inputStyles,
                        border: touched.email && errors.email 
                          ? `1px solid ${colors.redAccent[500]}` 
                          : inputStyles.border,
                      }}
                    />
                    {touched.email && errors.email && (
                      <Typography variant="caption" color={colors.redAccent[500]} mt="4px">
                        {errors.email}
                      </Typography>
                    )}
                  </Box>

                  {/* Password */}
                  <Box>
                    <Typography 
                        variant="h6" 
                        fontWeight="600" 
                        color={colors.grey[300]} 
                        mb="8px"
                    >
                        Password
                    </Typography>
                    <Box position="relative">
                      <InputBase
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Enter your password"
                        sx={{
                            ...inputStyles,
                            paddingRight: "45px", // space for eye icon
                            border: touched.password && errors.password 
                              ? `1px solid ${colors.redAccent[500]}` 
                              : inputStyles.border,
                        }}
                      />
                      <Box
                        position="absolute"
                        right="10px"
                        top="50%"
                        sx={{ transform: "translateY(-50%)" }}
                      >
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          size="small"
                          sx={{ color: colors.grey[400] }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </Box>
                    </Box>
                    {touched.password && errors.password && (
                      <Typography variant="caption" color={colors.redAccent[500]} mt="4px">
                        {errors.password}
                      </Typography>
                    )}
                  </Box>

                  {/* General Error Alert */}
                  {errors.general && (
                    <Box 
                      p="12px" 
                      borderRadius="8px" 
                      bgcolor={`${colors.redAccent[500]}15`} 
                      border={`1px solid ${colors.redAccent[500]}40`}
                    >
                      <Typography color={colors.redAccent[500]} variant="body2" textAlign="center">
                        {errors.general}
                      </Typography>
                    </Box>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "14px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: isLoading ? colors.primary[600] : colors.blueAccent[600],
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: `0 4px 14px ${colors.blueAccent[500]}50` // Nice glowing shadow
                    }}
                    onMouseOver={(e) => {
                       if(!isLoading) {
                           e.currentTarget.style.backgroundColor = colors.blueAccent[500];
                           e.currentTarget.style.transform = "translateY(-1px)";
                       }
                    }}
                    onMouseOut={(e) => {
                       if(!isLoading) {
                           e.currentTarget.style.backgroundColor = colors.blueAccent[600];
                           e.currentTarget.style.transform = "translateY(0)";
                       }
                    }}
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Optional Footer Text */}
                  <Typography variant="h6" color={colors.grey[300]} textAlign="center">
                      Don't have an account? Contact Admin
                  </Typography>

                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;