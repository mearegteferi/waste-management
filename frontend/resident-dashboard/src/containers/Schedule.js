import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";

function Schedule() {
  const [subcities, setSubcities] = useState([]);
  const [selectedSubcity, setSelectedSubcity] = useState("");
  const [schedule, setSchedule] = useState(null);

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
    <div className="p-6 mt-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-gray-800 font-semibold mb-4">
        <Typography variant="h4">Waste Collection Schedule</Typography>
      </div>
      <FormControl
        variant="outlined"
        className="mt-8 w-full md:w-1/2"
        size="small"
      >
        <InputLabel>Select Subcity</InputLabel>
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
        >
          <Table>
            <TableHead>
              <TableRow className="bg-gray-300">
                <TableCell className="font-bold text-gray-800">Day</TableCell>
                <TableCell className="font-bold text-gray-800">
                  Morning
                </TableCell>
                <TableCell className="font-bold text-gray-800">
                  Afternoon
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map(({ name, key }) => (
                <TableRow key={key}>
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
        <Typography variant="body1" className="text-gray-500 mt-6">
          Please select a subcity to view the schedule.
        </Typography>
      )}
    </div>
  );
}

export default Schedule;
