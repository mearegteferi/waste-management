import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State to store user data
  const [contacts, setContacts] = useState([]);

  // Fetch the data from your Django API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/account/users/all/`, {
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

  const handleRowClick = (params) => {
    navigate(`/manage-user/${params.id}`);
  }

  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "date_joined", headerName: "Date Joined", flex: 1 },
    // Add more fields based on your data structure
  ];

  return (
    <Box m="20px" ml="0">
      <Header
        title="USERS"
        subtitle="List of Users"
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
          onRowClick={handleRowClick}
          style={{cursor: "pointer"}}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
