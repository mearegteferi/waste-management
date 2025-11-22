import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { get_sub_city, get_kebele } from '../utilities/Provisions';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import YourImage from '../assets/complaint.jpg'; // Import your image here

const ReportIssue = () => {
  const subCityOptions = get_sub_city();
  const [selectedSubCity, setSelectedSubCity] = useState('');
  const [selectedTabya, setSelectedTabya] = useState('');
  const [formData, setFormData] = useState({
    description: "",
    image: null,
    urgency_level: 0,
  });

  const { description, image, urgency_level } = formData;

  const handleSubCityChange = (event) => {
    setSelectedSubCity(event.target.value);
    setSelectedTabya('');
  };

  const handleTabyaChange = (event) => {
    setSelectedTabya(event.target.value);
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () => {
    setFormData({
      description: '',
      image: null,
      urgency_level: 0,
    });
    setSelectedSubCity('');
    setSelectedTabya('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataSend = new FormData();
    formDataSend.append("description", description);
    formDataSend.append("sub_city", selectedSubCity);
    formDataSend.append("tabya", selectedTabya);
    formDataSend.append("image", image);
    formDataSend.append("urgency_level", urgency_level);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/issue/add/`,
        formDataSend,
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem("access")}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log("Issue created successfully");
        resetForm();
        toast.success('Issue reported successfully');
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", err.response);
        const errorMessage = err.response.data?.error || "Failed to report the issue. Please try again.";
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

  return (
    <Box className="mt-20 flex items-center justify-center min-h-screen bg-gray-100">
      <Box className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <form
          onSubmit={onSubmit}
          className="w-full p-8"
          encType="multipart/form-data"
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Report an Issue
          </Typography>

          <Box mb={4}>
            <TextField
              className="w-full"
              label="Description"
              name="description"
              type="text"
              placeholder="Enter issue description"
              value={description}
              onChange={onChange}
              required
              variant="filled"
              fullWidth
              margin="normal"
            />
          </Box>

          <FormControl fullWidth margin="normal" variant="filled">
            <InputLabel>Sub City</InputLabel>
            <Select
              name="sub_city"
              value={selectedSubCity}
              onChange={handleSubCityChange}
              required
            >
              <MenuItem value="">
                <em>Select Sub City</em>
              </MenuItem>
              {subCityOptions.map((subCity, index) => (
                <MenuItem key={index} value={subCity}>
                  {subCity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSubCity && (
            <FormControl fullWidth margin="normal" variant="filled">
              <InputLabel>Tabya</InputLabel>
              <Select
                name="tabya"
                value={selectedTabya}
                onChange={handleTabyaChange}
                required
              >
                <MenuItem value="">
                  <em>Select Tabya</em>
                </MenuItem>
                {get_kebele(selectedSubCity).map((tabya, index) => (
                  <MenuItem key={index} value={tabya}>
                    {tabya}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth margin="normal" variant="filled">
            <InputLabel>Urgency Level</InputLabel>
            <Select
              name="urgency_level"
              value={urgency_level}
              onChange={onChange}
              required
            >
              {[1, 2, 3, 4, 5].map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="image"
              type="file"
              accept="image/*"
              onChange={onChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit Issue
            </Button>
          </div>
        </form>

        <Box className="flex items-center justify-center w-1/2 p-4">
          <img src={YourImage} alt="Your Description" className="w-60 h-full rounded-lg" />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportIssue;
