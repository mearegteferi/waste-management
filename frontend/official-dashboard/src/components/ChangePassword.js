import React, { useState } from 'react'; 
import { Box, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from 'react-hot-toast';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  // State variables to manage password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleFormSubmit = async (values) => {
    const formData = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
      re_new_password: values.confirmNewPassword,
    };

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/set_password/`,
        formData,
        config
      );
      toast.success("password changed successfully")
      navigate("/dashboard")
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.detail)
      console.error("Error changing password:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CHANGE PASSWORD" subtitle="Change your password" />

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={yup.object().shape({
          currentPassword: yup.string().required("Current Password is required"),
          newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New Password is required"),
          confirmNewPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match").required("Confirm Password is required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="Current Password"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={values.currentPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.currentPassword && Boolean(errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCurrentPassword(prev => !prev)}>
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={values.newPassword}
                onBlur={handleBlur}
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
                  )
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
                onBlur={handleBlur}
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
                  )
                }}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                Change Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
