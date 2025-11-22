import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from 'react-hot-toast';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../state/authSlice"; // Adjust the path as necessary

const Activation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // State variables to manage password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userStatus = useSelector(state => state.auth.status); 

  const handleFormSubmit = async (values) => {
    const formData = {
      new_password: values.newPassword,
      re_new_password: values.confirmNewPassword,
    };

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    };

    try {
      // Post request to activate the account
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/user/activate/`,
        formData,
        config
      );
      toast.success(response.data.detail); // Success message
      console.log('before load', userStatus)
      await dispatch(loadUser());
      console.log('after load', userStatus)
      navigate("/"); 
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.detail);
    }
  };

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  return (
    <Box m="20px">
      <Header title="ACCOUNT ACTIVATION" subtitle="Activate your account" />

      <Formik
        initialValues={{ newPassword: "", confirmNewPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
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
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(prev => !prev)}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Confirm New Password"
                name="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmNewPassword}
                onChange={handleChange}
                error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                Activate Account
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Activation;
