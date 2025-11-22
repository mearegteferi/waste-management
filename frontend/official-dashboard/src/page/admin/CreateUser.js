import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from 'react-hot-toast';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CreateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [role, setRole] = useState("");
  const [subCities] = useState(Object.keys(city));
  const [tabyas, setTabyas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

 
 
  const handleFormSubmit = async (values) => {
    const formData = {
      full_name: values.fullName,
      email: values.email,
      password: values.password,
      re_password: values.confirmPassword,
      role: values.role,
    };
  
    if (
      ["CITY", "DATA_ENCODER", "TABYA", "SUB_CITY", "UNION"].includes(
        values.role
      )
    ) {
      formData.phone_number = values.phoneNumber;
    }
  
    if (
      values.role === "TABYA" ||
      values.role === "UNION" ||
      values.role === "SUB_CITY"
    ) {
      formData.sub_city = values.sub_city;
    }
  
    if (values.role === "TABYA") {
      formData.tabya = values.tabya;
    }
  
    if (values.role === "UNION") {
      formData.union_name = values.unionName;
      formData.bid_amount = values.bidAmount;
    }
  
    console.log(formData);
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/users/create/`,
        formData,
        config
      );
      console.log(res.data);
      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
  
      const errorMessage = error.response?.data?.message || "Failed to create user. Please try again.";
      toast.error(errorMessage);
    }
  };
  

  const handleRoleChange = (event, setFieldValue) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    setFieldValue("role", selectedRole);
  };

  const handleSubCityChange = (event, setFieldValue) => {
    const selectedSubCity = event.target.value;
    setFieldValue("sub_city", selectedSubCity);
    setTabyas(city[selectedSubCity] || []);
    setFieldValue("tabya", "");
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create new users" />

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(role)}
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
              {/* Common Fields */}
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
                        onClick={handleTogglePasswordVisibility}
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
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role Selection */}
              <TextField
                fullWidth
                select
                variant="filled"
                label="Role"
                name="role"
                value={values.role}
                onBlur={handleBlur}
                onChange={(e) => handleRoleChange(e, setFieldValue)}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="UNION">Union</MenuItem>
                <MenuItem value="SUB_CITY">Subcity</MenuItem>
                <MenuItem value="TABYA">Tabya</MenuItem>
                <MenuItem value="DATA_ENCODER">Data Encoder</MenuItem>
                <MenuItem value="CITY">City</MenuItem>
              </TextField>

              {/* Conditional Fields Based on Role */}
              {(role === "UNION" ||
                role === "SUB_CITY" ||
                role === "TABYA" ||
                role === "DATA_ENCODER" ||
                role === "CITY") && (
                <TextField
                  fullWidth
                  variant="filled"
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
              )}

              {role === "UNION" && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Union Name"
                    name="unionName"
                    value={values.unionName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.unionName && Boolean(errors.unionName)}
                    helperText={touched.unionName && errors.unionName}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    label="Bid Amount"
                    name="bidAmount"
                    type="number"
                    value={values.bidAmount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.bidAmount && Boolean(errors.bidAmount)}
                    helperText={touched.bidAmount && errors.bidAmount}
                    sx={{ gridColumn: "span 2" }}
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
                </>
              )}

              {role === "SUB_CITY" && (
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
              )}

              {role === "TABYA" && (
                <>
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
                </>
              )}
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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

// Phone Number Regex
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Validation Schema
const getValidationSchema = (role) => {
  let roleSpecificSchema = {};

  if (role === "union") {
    roleSpecificSchema = {
      unionName: yup.string().required("Union Name is required"),
      bidAmount: yup
        .number()
        .typeError("Bid Amount must be a number")
        .required("Bid Amount is required"),
      sub_city: yup.string().required("Sub City is required"),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    };
  } else if (role === "subcity") {
    roleSpecificSchema = {
      sub_city: yup.string().required("Sub City is required"),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    };
  } else if (role === "tabya") {
    roleSpecificSchema = {
      sub_city: yup.string().required("Sub City is required"),
      tabya: yup.string().required("Tabya is required"),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    };
  } else if (role === "data_encoder" || role === "city_official") {
    roleSpecificSchema = {
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    };
  }

  return yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: yup.string().required("Role is required"),
    ...roleSpecificSchema,
  });
};

// Initial Values
const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  phoneNumber: "",
  unionName: "",
  bidAmount: "",
  sub_city: "",
  tabya: "",
};

export default CreateUser;
