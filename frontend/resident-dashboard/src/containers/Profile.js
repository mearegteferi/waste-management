import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";

const city = {
  semen: ["dedebit", "yekatit", "meles", "mesfin", "industry"],
  hawelti: ["adi_shmdhun", "momona", "hayelom", "hidassie", "selam"],
  ayder: ["sertse", "gunbot 20", "marta", "adi ha", "may_dhan"],
  adi_haki: ["hayelom", "amora", "woyane", "hidassie", "debre"],
  hadnet: ["metkel", "smret", "werie", "aynalem", "debre"],
  kedemay_woyane: ["selam", "hareya", "walta", "zeslasse"],
  kuiha: ["abraha", "asmelash", "may_tsedo"],
};

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [originalImage, setOriginalImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); 

  const cityOptions = Object.keys(city);
  const [filteredTabya, setFilteredTabya] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      full_name: user?.full_name || "",
      image: null,
      sub_city: user?.sub_city || "",
      tabya: user?.tabya || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      full_name: Yup.string().required("Full name is required"),
      sub_city: Yup.string().required("Sub City is required"),
      tabya: Yup.string().required("Tabya is required")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/account/user/update/`,
          formData,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Profile updated successfully!");
        setEditMode(false);
      } catch (error) {
        console.error(error);
        alert("Error updating profile!");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      const initialImage = `${process.env.REACT_APP_API_URL}${user.image}`;
      formik.setFieldValue("image", initialImage);
      setOriginalImage(initialImage);
    }
  }, [user]);

  useEffect(() => {
    if (formik.values.sub_city) {
      setFilteredTabya(city[formik.values.sub_city] || []);
    }
  }, [formik.values.sub_city]);

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const newImage = files[0];
      formik.setFieldValue("image", newImage);
      const imageUrl = URL.createObjectURL(newImage);
      setImagePreview(imageUrl); 
    }
  };

  const handleRemoveImage = () => {// Reset image to null
    setImagePreview(""); // Clear the image preview
    document.getElementById("upload-button").value = ""; // Clear the file input
};

  const renderDropdown = (label, name, options, disabled) => (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        disabled={disabled}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <Typography color="error" variant="caption">
          {formik.errors[name]}
        </Typography>
      )}
    </FormControl>
  );

  return (
    <Box mt={10} minHeight="100vh" px={2}>
      <Box mb="30px">
        <Typography variant="h2" fontWeight="bold" sx={{ m: "50px 0 5px 0" }}>
          Profile
        </Typography>
        <Typography variant="h5">View and edit your Profile</Typography>
      </Box>

      <Box
        maxWidth="lg"
        mx="auto"
        p={3}
        boxShadow={3}
        borderRadius={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" mb={3}>
          <label htmlFor="upload-button" style={{ position: "relative" }}>
            <Avatar
              src={imagePreview || originalImage}
              alt="Profile"
              sx={{ width: 120, height: 120, cursor: "pointer" }}
            />
            <CameraAltIcon
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                color: "primary.main",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
          </label>
          <input
            id="upload-button"
            type="file"
            name="image"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Box flex={1} ml={3}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              margin="normal"
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
              disabled={!editMode}
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              margin="normal"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={!editMode}
            />
          </Box>
        </Box>

        {originalImage && (
          <Box mb={2}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          </Box>
        )}

        <Box mt={2} display="flex" justifyContent="space-between" width="100%">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(!editMode)}
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          >
            {editMode ? "Save Changes" : "Edit"}
          </Button>
        </Box>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%", marginTop: "16px" }}>
          {editMode
            ? renderDropdown("Sub City", "sub_city", cityOptions, !editMode)
            : <TextField label="Sub City" value={formik.values.sub_city || ""} fullWidth disabled sx={{ marginBottom: 2 }} />}
          {editMode
            ? renderDropdown("Tabya", "tabya", filteredTabya, !editMode)
            : <TextField label="Tabya" value={formik.values.tabya || ""} fullWidth disabled sx={{ marginBottom: 2 }} />}
        
        <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{
                padding: "10px",
                "&:hover": { backgroundColor: "#388e3c" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit All Changes"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
