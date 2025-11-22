import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";

const RejectedReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to store user data
  const [contacts, setContacts] = useState([]);

  // Fetch the data from your Django API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/report/users/all/?status=Approved`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}` // Include JWT token if required
          }
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "truck_number", headerName: "Truck", flex: 1 },
    { field: "metric_ton", headerName: "Ton", flex: 0.5 },
    { field: "sub_city", headerName: "Sub City", flex: 1 },
    { field: "tabya", headerName: "Tabya", flex: 1 },
    { field: "delivering_union_id", headerName: "Delivering", flex: 1 },
    { field: "Recieving_data_encoder_id", headerName: "Reciever", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "tabya_approval_status", headerName: "Tabya Approval", flex: 1 },
    { field: "union_approval_status", headerName: "Union Approval", flex: 1 },

    // Add more fields based on your data structure
  ];

  return (
    <Box m="20px" ml="0">
      <Header
        title="Rejected Reports"
        subtitle="List of all rejected reports"
      />
      <Box
        m="30px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default RejectedReport;
