import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";  // Import Button
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { columnsConfig } from "../../utils/columns";

const ViewReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { status } = useParams();
  const [contacts, setContacts] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/report/view-report/?status=${status}`, {
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
  }, [status]);

  const getColumns = () => {
    if (columnsConfig[role]) {
      if (columnsConfig[role][status]) {
        return columnsConfig[role][status];
      }
    }
  }

  const columns = getColumns();

  const handleRowClick = (params) => {
    navigate(`/report-detail/${params.row.id}`, { state: { report: params.row } }); // Pass report data to the detail page
  };

  // New function to navigate to the chart component
  const handleNavigateToChart = () => {
    navigate('/chart'); 
  };

  return (
    <Box m="20px" ml="0">
      <Header
        title="REPORTS"
        subtitle={`List of ${status} reports`}
      />
      {/* Add the button to navigate to the chart component */}
      <Box mb="20px">
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleNavigateToChart}
        >
          View Chart
        </Button>
      </Box>
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
        />
      </Box>
    </Box>
  );
};

export default ViewReport;
