import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [subCities] = useState(Object.keys(city));
  const [tabyas, setTabyas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleFormSubmit = async (values) => {
    const formData = {
      full_name: values.fullName,
      email: values.email,
      password: values.password,
      re_password: values.confirmPassword,
      role: "RESIDENT",
      tabya: values.tabya,
      sub_city: values.sub_city,
    };

    console.log(formData);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/users/create/`,
        formData
      );
      console.log(res.data);
      navigate('/login')
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSubCityChange = (event, setFieldValue) => {
    const selectedSubCity = event.target.value;
    setFieldValue("sub_city", selectedSubCity);
    setTabyas(city[selectedSubCity] || []);
    setFieldValue("tabya", "");
  };

  return (
    <Box className="mt-20" display="flex" justifyContent="center">
      <Box
        width={isNonMobile ? "40%" : "90%"}
        p={4}
        bgcolor="#f5f5f5"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
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
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Sub City"
                  name="sub_city"
                  value={values.sub_city}
                  onBlur={handleBlur}
                  onChange={(e) => handleSubCityChange(e, setFieldValue)}
                  error={touched.sub_city && Boolean(errors.sub_city)}
                  helperText={touched.sub_city && errors.sub_city}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="">Select Sub City</MenuItem>
                  {subCities.map((subCity) => (
                    <MenuItem key={subCity} value={subCity}>
                      {subCity}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Tabya"
                  name="tabya"
                  value={values.tabya}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.tabya && Boolean(errors.tabya)}
                  helperText={touched.tabya && errors.tabya}
                  sx={{ gridColumn: "span 4" }}
                  disabled={!values.sub_city}
                >
                  <MenuItem value="">Select Tabya</MenuItem>
                  {tabyas.map((tabya) => (
                    <MenuItem key={tabya} value={tabya}>
                      {tabya}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" variant="contained" color="primary" sx={{ width: "100%" }}>
                  Sign Up
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

// City Data Structure
const city = {
  semen: ["dedebit", "yekatit", "meles", "mesfin", "industry"],
  hawelti: ["adi_shmdhun", "momona", "hayelom", "hidassie", "selam"],
  ayder: ["sertse", "gunbot 20", "marta", "adi ha", "may_dhan"],
  adi_haki: ["hayelom", "amora", "woyane", "hidassie", "debre"],
  hadnet: ["metkel", "smret", "werie", "aynalem", "debre"],
  kedemay_woyane: ["selam", "hareya", "walta", "zeslasse"],
  kuiha: ["abraha", "asmelash", "may_tsedo"],
};

const getValidationSchema = () => {
  let roleSpecificSchema = {
    sub_city: yup.string().required("Sub City is required"),
    tabya: yup.string().required("Tabya is required"),
  };

  return yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
    ...roleSpecificSchema,
  });
};

// Initial Values
const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  sub_city: "",
  tabya: "",
};

export default Signup;
