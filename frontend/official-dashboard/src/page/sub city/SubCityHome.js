import Header from "../../components/Header";
import { FaComments, FaCalendarAlt, FaFileAlt } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg"; // Replace with actual image import
import ComplaintsImage from "../../assets/complains.jpg"; // Similarly, replace this
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

const SubcityHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  return (
    <Box backgroundColor={colors.primary[400]} className="mt-16 px-4 py-[1px]">
      <Header
        title="SUBCITY OFFICIAL DASHBOARD"
        subtitle="Waste Management System - Mekelle City"
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color: colors.grey[100],
        }}
        className="py-4 px-2 lg:px-20 flex flex-col lg:flex-row items-center justify-between"
      >
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            Welcome, Subcity Official!
          </h1>
          <p className="text-lg mb-8">
            Manage waste-related activities in your subcity. Address resident
            complaints, view schedules, and reports.
          </p>
          <button onClick={() => navigate("/view-issues")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
            View Complaints
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

      {/* Subcity Official Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Subcity Official Features
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
                <h3 className="text-xl font-semibold ">
                  View Resident Complaints
                </h3>
                <p className="mt-2">
                  Access and address complaints submitted by residents regarding
                  waste management services in your subcity.
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
                  View Collection Schedules
                </h3>
                <p className="mt-2">
                  Monitor and manage waste collection schedules to ensure timely
                  service delivery.
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
                <FaFileAlt className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">View Reports</h3>
                <p className="mt-2">
                  Access reports on waste management activities to analyze
                  performance and identify areas for improvement.
                </p>
              </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Resident Complaints Section */}
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
            Resident Complaints
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={ComplaintsImage}
                alt="Resident Complaints"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
                Review and manage resident complaints effectively to enhance
                waste management services and community satisfaction.
              </p>
              <button onClick={() => navigate("/view-issues")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
                View Resident Complaints
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default SubcityHome;
