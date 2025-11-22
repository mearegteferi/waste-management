import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser } from "../state/authSlice";
import { Navigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await dispatch(login(values));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success('logged in successfully');
        dispatch(loadUser());
      } else if (result.payload) {
        setFieldError("general", result.payload.detail);
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" >
      <Box width="40%" p={4} bgcolor="#f5f5f5" borderRadius="8px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)">
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {({ values, handleChange, errors, touched, isSubmitting }) => (
            <Form>
              <Box display="grid" gap="20px">
                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
                {errors.general && <Typography color="error" align="center">{errors.general}</Typography>}
              </Box>
              <Box mt={4}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || isLoading}
                  sx={{ height: 50 }}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
