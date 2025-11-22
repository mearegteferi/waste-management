import React, { useState, useEffect } from "react";
import axios from "axios";
import { tokens } from "../../theme";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Box,
} from "@mui/material";

function Schedule() {
  const [subcities, setSubcities] = useState([]);
  const [selectedSubcity, setSelectedSubcity] = useState("");
  const [schedule, setSchedule] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch subcities on initial render
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedule/get_all_subcities/`)
      .then((response) => setSubcities(response.data))
      .catch((error) => console.error("Error fetching subcities:", error));
  }, []);

  useEffect(() => {
    if (selectedSubcity) {
      // Fetch schedule for the selected subcity
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/schedule/get_schedule/${selectedSubcity}/`
        )
        .then((response) => setSchedule(response.data))
        .catch((error) => console.error("Error fetching schedule:", error));
    } else {
      setSchedule(null); // Reset schedule if no subcity is selected
    }
  }, [selectedSubcity]);

  const handleChange = (event) => {
    setSelectedSubcity(event.target.value);
  };

  const days = [
    { name: "Monday", key: "monday" },
    { name: "Tuesday", key: "tuesday" },
    { name: "Wednesday", key: "wednesday" },
    { name: "Thursday", key: "thursday" },
    { name: "Friday", key: "friday" },
    { name: "Saturday", key: "saturday" },
  ];

  const formatTabya = (tabyaList) =>
    tabyaList
      ? tabyaList.map((tabya) => tabya.name).join(", ")
      : "No Collection";

  return (
    <Box backgroundColor={colors.primary[400]}>
      <div className="p-6 mt-12 min-h-screen flex flex-col items-center">
        <div className="font-semibold mb-4">
          <Typography variant="h4">Waste Collection Schedule</Typography>
        </div>
        <FormControl
          variant="outlined"
          className="mt-8 w-full md:w-1/2"
          size="small"
        >
          <InputLabel backgroundColor={colors.primary[400]}>Select Subcity</InputLabel>
          <Select
            label="Select Subcity"
            value={selectedSubcity}
            onChange={handleChange}
          >
            {subcities.map((subcity) => (
              <MenuItem key={subcity.id} value={subcity.id}>
                {subcity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {schedule ? (
          <TableContainer
            component={Paper}
            className="w-full mt-6 md:w-3/4 lg:w-2/3 shadow-lg"
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            }}
          >
            <Table
              sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "#ffffff" : "#1a1a1a",
              }}
            >
              {" "}
              {/* Set the background color for the table */}
              <TableHead>
                <TableRow className="bg-blue-500">
                  <TableCell className="font-bold">Day</TableCell>
                  <TableCell className="font-bold">Morning</TableCell>
                  <TableCell className="font-bold">Afternoon</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {days.map(({ name, key }) => (
                  <TableRow
                    key={key}
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                    }}
                  >
                    {" "}
                    {/* Set the background color for each table row */}
                    <TableCell className="border border-gray-300">
                      {name}
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      {formatTabya(schedule[`${key}_morning`])}
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      {formatTabya(schedule[`${key}_afternoon`])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" className="mt-6">
            Please select a subcity to view the schedule.
          </Typography>
        )}
      </div>
    </Box>
  );
}

export default Schedule;
