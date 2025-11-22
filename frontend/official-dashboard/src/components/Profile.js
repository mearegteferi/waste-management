import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Box,
} from "@mui/material";
import { toast } from 'react-hot-toast';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({
    email: "",
    full_name: "",
    image: null, // Initialize as null for file upload
    phone_number: "",
    sub_city: "",
    tabya: "",
    bid_amount: "",
    union_name: "",
  });
  const [originalImage, setOriginalImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();


  const handleChangePassword = () => {
    navigate("/change-password"); // Replace with your actual change password route
  };
  

  useEffect(() => {
    if (user) {
      const initialImage = `${process.env.REACT_APP_API_URL}${user.image}`;
      setProfileData((prev) => ({ ...prev, ...user, image: initialImage }));
      setOriginalImage(initialImage);
    }
  }, [user]);

  const [imagePreview, setImagePreview] = useState(""); // Separate state for the image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const newImage = files[0];
      setProfileData((prev) => ({ ...prev, image: newImage })); // Set the file itself to profileData.image
      const imageUrl = URL.createObjectURL(newImage);
      setImagePreview(imageUrl); // Set the image URL only for display
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handleRemoveImage = () => {
    setProfileData((prev) => ({ ...prev, image: null })); // Reset image to null
    setImagePreview(""); // Clear the image preview
    document.getElementById("upload-button").value = ""; // Clear the file input
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/account/user/update/`,
        formData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, value, placeholder, disabled) => (
    <TextField
      label={label}
      name={name}
      value={value || ""}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      margin="normal"
      disabled={disabled}
    />
  );

  return (
    <Box mt={10} minHeight="100vh" px={2}>
      <Header title="Profile" subtitle="Manage your profile details" />

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
            onChange={handleChange}
            style={{ display: "none" }}
            accept="image/*"
          />

          <Box flex={1} ml={3}>
            {renderField(
              "Full Name",
              "full_name",
              profileData.full_name,
              "Full Name",
              !editMode
            )}
            {renderField(
              "Email",
              "email",
              profileData.email,
              "Email",
              !editMode
            )}
          </Box>
        </Box>

        {profileData.image && (
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "16px" }}
        >
          {renderField(
            "Phone Number",
            "phone_number",
            profileData.phone_number,
            "Phone Number",
            !editMode
          )}

          {["SUB_CITY", "TABYA"].includes(user.role) &&
            renderField(
              "Sub City",
              "sub_city",
              profileData.sub_city,
              "Sub City",
              true
            )}

          {user.role === "TABYA" &&
            renderField("Tabya", "tabya", profileData.tabya, "Tabya", true)}

          {user.role === "UNION" && (
            <>
              {renderField(
                "Union Name",
                "union_name",
                profileData.union_name,
                "Union Name",
                !editMode
              )}
              {renderField(
                "Bid Amount",
                "bid_amount",
                profileData.bid_amount,
                "Bid Amount",
                true
              )}
            </>
          )}

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{
                padding: "10px",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit All Changes"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
