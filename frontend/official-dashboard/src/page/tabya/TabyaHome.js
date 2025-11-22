import Header from "../../components/Header";
import { FaComments, FaCalendarAlt, FaCheckCircle } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg"; // Replace with actual image import
import ComplaintsImage from "../../assets/complains.jpg"; // Similarly, replace this
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

const TabyaHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Box backgroundColor={colors.primary[400]} className="mt-16 px-4 py-[1px]">
      <Header
        title="TABYA OFFICIAL DASHBOARD"
        subtitle="Waste Management System - Mekelle City"
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color: colors.grey[100],
        }}
        className="py4 px-2 lg:px-20 flex flex-col lg:flex-row items-center justify-between"
      >
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            Welcome, Tabya Official!
          </h1>
          <p className="text-lg mb-8">
            Manage waste management activities in your Tabya. View complaints,
            schedules, and approve reports for a cleaner and healthier
            community.
          </p>
          <button
            onClick={() => navigate("/view-reports/approved")}
            className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700"
          >
            View reports
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

      {/* Tabya Official Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center  mb-12">
            Tabya Official Features
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            <Link to="/view-issues">
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
                className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <FaComments className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">View Complaints</h3>
                <p className="mt-2">
                  Access and address complaints submitted by residents regarding
                  waste management services in your Tabya.
                </p>
              </Box>
            </Link>

            <Link to="/view-schedule">
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
                className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <FaCalendarAlt className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">
                  View Collection Schedule
                </h3>
                <p className="mt-2">
                  Monitor waste collection schedules to ensure timely service
                  delivery and efficiency in operations.
                </p>
              </Box>
            </Link>

            <Link to="/view-reports/approved">
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
                className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <FaCheckCircle className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">Approve Reports</h3>
                <p className="mt-2">
                  Review and approve submitted waste management reports to
                  maintain compliance and accountability.
                </p>
              </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Waste Management Section */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color: colors.grey[100],
        }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-12">
            Waste Management Oversight
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={ComplaintsImage}
                alt="Waste Management"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
                Oversee waste management activities in your Tabya. Ensure
                effective communication with residents.
              </p>
              <button
                onClick={() => navigate("/view-issues")}
                className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700"
              >
                view complaints
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TabyaHome;
