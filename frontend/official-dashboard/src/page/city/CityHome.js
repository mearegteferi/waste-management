import Header from "../../components/Header";
import { FaCheckCircle, FaClipboardList, FaUsers, FaCalendarCheck } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg"; // Replace with actual image import
import ReportsImage from "../../assets/report.png"; // Similarly, replace this
import { useTheme, Box } from '@mui/material'
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

const CityHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  return (
    <Box 
    backgroundColor={colors.primary[400]}
    className="mt-16 px-4 py-[1px]">
      <Header
        title="CITY OFFICIAL DASHBOARD"
        subtitle="Waste Management System - Mekelle City"
      />

      {/* Hero Section */}
      <Box 
           sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
      className="py-4 px-2 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold  mb-4">
            Welcome, City Official!
          </h1>
          <p className="text-lg mb-8">
            Manage waste management activities in Mekelle City. Approve waste
            reports, organization requests, and monitor collection schedules to
            ensure efficient waste management.
          </p>
          <button onClick={() => navigate("/view-reports/approved")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
            View Waste Reports
          </button>
        </div>
        <div className="lg:w-1/2">
          <img
            src={WasteManagementImage}
            alt="Waste management in Mekelle"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </Box>

      {/* City Official Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            City Official Features
          </h2>

          <div className="flex flex-wrap justify-center gap-10">

          <Link to="/view-reports/approved">
            <Box 
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaCheckCircle className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">Approve Waste Reports</h3>
              <p className="mt-2">
                Review submitted waste management reports to ensure
                accuracy and compliance with city regulations.
              </p>
            </Box>
            </Link>

            <Link to="/approve-request">
            <Box 
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaUsers className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">Approve Organization Requests</h3>
              <p className="mt-2">
                Evaluate and approve requests from organizations involved in waste
                management and community engagement.
              </p>
            </Box>
            </Link>


            <Link to="/view-issues">
            <Box 
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaClipboardList className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold">View Resident Complaints</h3>
              <p className="mt-2">
              Review and manage resident complaints effectively to enhance
              waste management services and community satisfaction.
              </p>
            </Box>
            </Link>

            <Link to="/view-schedule">
            <Box 
           sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaCalendarCheck className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold">View Collection Schedules</h3>
              <p className="mt-2">
                Monitor and manage waste collection schedules to ensure timely
                service delivery across the city.
              </p>
            </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Waste Management Reports Section */}
      <Box 
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
      className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-12">
            Waste Management Reports
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={ReportsImage}
                alt="Waste Management Reports"
                className="rounded-lg shadow-lg w-[400px]"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
                Review and analyze reports submitted by waste management teams to
                enhance operational efficiency and environmental sustainability.
              </p>
              <button onClick={() => navigate("/view-reports/approved")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </Box>

    </Box>
  );
};

export default CityHome;
