import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box, MenuItem, FormControl, Select, InputLabel, TextField, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import { useSelector } from "react-redux"; // Access Redux state for user role

// Chart.js components registration
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [reportData, setReportData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedSubcity, setSelectedSubcity] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [subcities, setSubcities] = useState([]);

  // Retrieve the user's role and profile subcity from Redux state
  const userRole = useSelector(state => state.auth.role);
  const { user } = useSelector((state) => state.auth);
  const userSubcity = user.sub_city// Assuming subcity is stored in auth state

  useEffect(() => {
    const fetchSubcities = async () => {
      if (userRole === "CITY" || userRole === "DATA_ENCODER") {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/get_all_subcities/`);
          setSubcities(response.data);
        } catch (error) {
          console.error("Error fetching subcities:", error);
        }
      } else {
        setSelectedSubcity(userSubcity); // Set subcity automatically for limited roles
      }
    };
    fetchSubcities();
  }, [userRole, userSubcity]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/report/list_reports/`, {
        params: {
          subcity: userRole === "CITY" || userRole === "DATA_ENCODER" ? selectedSubcity : userSubcity,
          start_date: startDate.format('YYYY-MM-DD'),
          end_date: endDate.format('YYYY-MM-DD'),
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        }
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    if (reportData.length > 0) {
      const tabyaNames = reportData.map(report => report.tabya__name);
      const totalMetricTons = reportData.map(report => report.total_metric_tons);

      setChartData({
        labels: tabyaNames,
        datasets: [
          {
            label: 'Total Metric Tons of Waste',
            data: totalMetricTons,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [reportData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchReports();
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Waste Report Chart
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {(userRole === "CITY" || userRole === "DATA_ENCODER") && (
          <FormControl fullWidth>
            <InputLabel id="subcity-label">Select Subcity</InputLabel>
            <Select
              labelId="subcity-label"
              value={selectedSubcity}
              onChange={(e) => setSelectedSubcity(e.target.value)}
            >
              {subcities.map((subcity) => (
                <MenuItem key={subcity.name} value={subcity.name}>
                  {subcity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        
        <Box display="flex" gap={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Box>
        
        <Button variant="contained" color="secondary"  type="submit" sx={{ mt: 2, alignSelf: 'center' }}>
          Get Reports
        </Button>
      </Box>

      <Box mt={4}>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Total Metric Tons',
                  },
                },
              },
            }}
          />
        ) : (
          <Typography color="text.secondary" align="center" mt={2}>
            No data available for charting.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BarChart;
