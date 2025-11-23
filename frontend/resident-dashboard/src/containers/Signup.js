import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  MenuItem, 
  Typography, 
  IconButton, 
  InputAdornment, 
  Grid, 
  useMediaQuery, 
  CircularProgress,
  Link as MuiLink
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// --- CITY DATA ---
const city = {
  semen: ["dedebit", "yekatit", "meles", "mesfin", "industry"],
  hawelti: ["adi_shmdhun", "momona", "hayelom", "hidassie", "selam"],
  ayder: ["sertse", "gunbot 20", "marta", "adi ha", "may_dhan"],
  adi_haki: ["hayelom", "amora", "woyane", "hidassie", "debre"],
  hadnet: ["metkel", "smret", "werie", "aynalem", "debre"],
  kedemay_woyane: ["selam", "hareya", "walta", "zeslasse"],
  kuiha: ["abraha", "asmelash", "may_tsedo"],
};

// --- STYLING CONSTANTS ---
const darkInputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#e2e8f0", // Slate-200
    backgroundColor: "#1e293b", // Slate-800
    borderRadius: "12px",
    transition: "all 0.3s",
    "& fieldset": { borderColor: "#334155" }, // Slate-700
    "&:hover fieldset": { borderColor: "#22c55e" }, // Green-500
    "&.Mui-focused fieldset": { borderColor: "#22c55e", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { color: "#94a3b8" }, // Slate-400
  "& .MuiInputLabel-root.Mui-focused": { color: "#22c55e" },
  "& .MuiSelect-icon": { color: "#94a3b8" }, // Dropdown arrow
};

// Dropdown Menu Dark Theme Styling
const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#1e293b",
      color: "#e2e8f0",
      "& .MuiMenuItem-root": {
        "&:hover": { bgcolor: "#334155" },
        "&.Mui-selected": { bgcolor: "#166534", "&:hover": { bgcolor: "#15803d" } },
      },
    },
  },
};

const Signup = () => {
  const isNonMobile = useMediaQuery("(min-width:900px)");
  const [subCities] = useState(Object.keys(city));
  const [tabyas, setTabyas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    const formData = {
      full_name: values.fullName,
      email: values.email,
      password: values.password,
      re_password: values.confirmPassword,
      role: "RESIDENT",
      tabya: values.tabya,
      sub_city: values.sub_city,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/account/users/create/`,
        formData
      );
      toast.success("Account created successfully! Please log in.");
      navigate('/login');
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubCityChange = (event, setFieldValue) => {
    const selectedSubCity = event.target.value;
    setFieldValue("sub_city", selectedSubCity);
    setTabyas(city[selectedSubCity] || []);
    setFieldValue("tabya", "");
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#020617" }}>
      
      {/* LEFT SIDE: IMAGE (Fixed) */}
      <Grid
        item
        xs={false}
        md={5}
        lg={6}
        sx={{
          backgroundImage: "url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
         <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(2, 6, 23, 0.5)", // Dark Overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box p={4} textAlign="center">
            <Typography variant="h2" fontWeight="800" color="white" sx={{ textShadow: "0px 4px 10px rgba(0,0,0,0.5)"}}>
              Join the <br/> <span style={{color: "#4ade80"}}>Movement</span>
            </Typography>
            <Typography variant="h6" color="#cbd5e1" mt={2} sx={{ maxWidth: "400px", mx: "auto" }}>
              Create an account to report issues, track schedules, and build a cleaner Mekelle.
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SIDE: SCROLLABLE FORM */}
      <Grid
        item
        xs={12}
        md={7}
        lg={6}
        sx={{
          backgroundColor: "#0f172a", // Slate-900
          height: "100vh",
          overflowY: "auto", // Allow scrolling
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 8,
          px: 4
        }}
      >
        <Box width="100%" maxWidth="600px">
          
          {/* Header */}
          <Box mb={4}>
             <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginTop: '50px', marginBottom: '20px' }}>
                <ArrowBack sx={{ color: "#94a3b8", mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#94a3b8" sx={{ '&:hover': { color: 'white'} }}>
                    Back to Home
                </Typography>
            </Link>
            <Typography variant="h4" fontWeight="bold" color="white">
              Create Account
            </Typography>
            <Typography variant="body1" color="#94a3b8" mt={1}>
              Fill in your details to register as a Resident.
            </Typography>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  
                  {/* Full Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Full Name"
                      name="fullName"
                      value={values.fullName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                      sx={darkInputSx}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={darkInputSx}
                    />
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onBlur={handleBlur}
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
                  </Grid>

                  {/* Confirm Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      sx={darkInputSx}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: "#94a3b8" }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Sub City */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      label="Sub City"
                      name="sub_city"
                      value={values.sub_city}
                      onBlur={handleBlur}
                      onChange={(e) => handleSubCityChange(e, setFieldValue)}
                      error={touched.sub_city && Boolean(errors.sub_city)}
                      helperText={touched.sub_city && errors.sub_city}
                      sx={darkInputSx}
                      SelectProps={{ MenuProps: menuProps }}
                    >
                      <MenuItem value="">Select Sub City</MenuItem>
                      {subCities.map((subCity) => (
                        <MenuItem key={subCity} value={subCity} sx={{ textTransform: 'capitalize'}}>
                          {subCity.replace('_', ' ')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Tabya */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      label="Tabya"
                      name="tabya"
                      value={values.tabya}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.tabya && Boolean(errors.tabya)}
                      helperText={touched.tabya && errors.tabya}
                      sx={darkInputSx}
                      disabled={!values.sub_city}
                      SelectProps={{ MenuProps: menuProps }}
                    >
                      <MenuItem value="">Select Tabya</MenuItem>
                      {tabyas.map((tabya) => (
                        <MenuItem key={tabya} value={tabya} sx={{ textTransform: 'capitalize'}}>
                          {tabya.replace('_', ' ')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Box mt={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting || isLoading}
                    sx={{
                      height: 52,
                      backgroundColor: "#16a34a", // Green-600
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 14px 0 rgba(22, 163, 74, 0.39)",
                      "&:hover": { backgroundColor: "#15803d" },
                      "&:disabled": { backgroundColor: "#334155", color: "#94a3b8" }
                    }}
                  >
                     {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Create Account"}
                  </Button>
                </Box>

                {/* Footer Links */}
                <Box display="flex" justifyContent="center" mt={3}>
                    <Typography variant="body2" color="#94a3b8">
                      Already have an account?{" "}
                      <Link to="/login" style={{ color: "#4ade80", textDecoration: "none", fontWeight: "bold" }}>
                        Log in
                      </Link>
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

// --- VALIDATION & INITIAL VALUES ---
const getValidationSchema = () => {
  return yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
    sub_city: yup.string().required("Sub City is required"),
    tabya: yup.string().required("Tabya is required"),
  });
};

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  sub_city: "",
  tabya: "",
};

export default Signup;