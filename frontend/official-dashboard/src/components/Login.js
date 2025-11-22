import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser, logout } from "../state/authSlice"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, status, role } = useSelector(
    (state) => state.auth
  );

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

 

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
        const result = await dispatch(login(values));
        
        console.log(result); // Check the result of the login action

        // Ensure result.meta.requestStatus is fulfilled
        if (result.meta.requestStatus === "fulfilled") {
            const userStatus = result.payload.status; // Assuming the status is in result.payload.status
            const userRole = result.payload.role;
            // Redirect based on the user status
            if(userRole === "RESIDENT") {
              setFieldError("general", "No active account found with the given credentials")
              dispatch(logout())
              navigate("/");
            }
            else if (userStatus === "PENDING") {
                navigate("/activation"); // Redirect to the activation page
            } else {
                navigate("/dashboard"); // Redirect to home for other statuses
            }

            await dispatch(loadUser()); // Load user data if needed
        } else {
            // Handle errors
            if (result.payload) {
                setFieldError("general", result.payload.detail);
            }
        }
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        setFieldError("general", "An unexpected error occurred. Please try again later.");
    }
    setSubmitting(false);
};



  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box
        backgroundColor="gray"
        className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[500px]"
      >
        <h2 className="text-2xl font-bold mb-10 text-center text-black">
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-10">
                <label className="block text-sm font-bold mb-1 text-black">
                  Email:
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.email && errors.email ? "border-red-800" : ""
                  }`}
                />
                {touched.email && errors.email && (
                  <div className="text-red-800">{errors.email}</div>
                )}
              </div>

              <div className="mb-10">
                <label className="block text-sm font-bold mb-1 text-black">
                  Password:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full p-2 text-black focus:outline-none ${
                      touched.password && errors.password
                        ? "border-red-800"
                        : ""
                    }`}
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                {touched.password && errors.password && (
                  <div className="text-red-800 font-medium">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* General error message */}
              {errors.general && (
                <div className="text-red-800 text-center mb-4 font-bold">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full p-2 text-white font-bold rounded-md ${
                  isLoading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                } focus:outline-none`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default LoginPage;
