import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ArticleImage from "../assets/write_article.avif"; // Example image path

const ArticleForm = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/article/categories/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };


  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    formData.append("category", values.category);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/article/create/`, formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        console.log("article added successfully");
        toast.success('article submitted successfully');
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", err.response);
        const errorMessage = err.response.data?.error || "Failed to create article. Please try again.";
        toast.error(errorMessage);
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
        toast.error("No response from server. Please check your internet connection.");
      } else {
        // Other errors
        console.error("Error in setting up request:", err.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const getValidationSchema = () => {
    return yup.object().shape({
      title: yup.string().required("Title is required"),
      content: yup.string().required("Content is required"),
      image: yup.mixed().required("Image is required"),
      category: yup.string().required("Category is required"),
    });
  };

  // Initial Values
  const initialValues = {
    title: "",
    content: "",
    image: null,
    category: "",
  };

  return (
    <Box className="mt-20" display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f4f9">
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        width={{ xs: "90%", md: "70%" }}
        bgcolor="#ffffff"
        borderRadius="12px"
        boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
      >
        {/* Form Section */}
        <Box p={4} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Create Article
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
                <Box display="flex" flexDirection="column" gap="24px">
                  <TextField
                    variant="filled"
                    label="Title"
                    name="title"
                    fullWidth
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    InputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />

                  <TextField
                    variant="filled"
                    label="Content"
                    name="content"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.content}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.content && Boolean(errors.content)}
                    helperText={touched.content && errors.content}
                    InputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />

                  <Box>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      Upload Image
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="image-upload"
                      type="file"
                      onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                    />
                    <label htmlFor="image-upload">
                      <Button 
                        variant="contained" 
                        component="span" 
                        fullWidth 
                        sx={{ 
                          height: '56px', 
                          fontSize: '16px', 
                          fontWeight: 'bold', 
                          textTransform: 'none' 
                        }}
                      >
                        {values.image ? values.image.name : "Choose File"}
                      </Button>
                    </label>
                    {touched.image && errors.image && (
                      <Typography color="error">{errors.image}</Typography>
                    )}
                  </Box>

                  <TextField
                    variant="filled"
                    label="Category"
                    name="category"
                    fullWidth
                    select
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.category && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                    InputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      paddingY: "12px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      height: '56px', // Increased height for the button
                    }}
                  >
                    Create Article
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>

        {/* Image Section */}
        <Box
          display={{ xs: "none", md: "block" }}
          sx={{
            backgroundImage: `url(${ArticleImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default ArticleForm;
