import Header from "../../components/Header";
import { FaCalendarCheck, FaCheckCircle, FaTrash } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg";
import ReportsImage from "../../assets/report.png";
import { useTheme, Box } from '@mui/material'
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

const UnionHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  return (
    <Box 
    backgroundColor={colors.primary[400]}
    className="mt-16 px-4 py-[1px]">
      <Header
        title="UNION OFFICIAL DASHBOARD"
        subtitle="Waste Management System - Mekelle City"
      />

      {/* Hero Section */}
      <Box 
           sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color: colors.grey[100],
          }}
      className="4py-12 px-2 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            Welcome, Union Official!
          </h1>
          <p className="text-lg mb-8">
            manage collection of waste from the Tabya's of assigned Sub-city and View schedules,
            approve reports.
          </p>
          <button onClick={() => navigate("/view-schedule")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
            View Collection Schedules
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

      {/* Union Official Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Union Official Features
          </h2>

          <div className="flex flex-wrap justify-center gap-10">

          <Link to="/view-schedule">
            <Box 
               sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                color: colors.grey[100],
              }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaCalendarCheck className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">View Collection Schedules</h3>
              <p className="mt-2">
                Monitor waste collection schedules to ensure timely service
                delivery and efficiency in operations.
              </p>
            </Box>
            </Link>

            <Link to="/view-reports/pending">
            <Box 
                 sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaCheckCircle className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">Approve Reports</h3>
              <p className="mt-2">
                Review and approve submitted waste management reports to maintain
                compliance and accountability.
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
            className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaTrash className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">Waste Collection Schedule</h3>
              <p className="mt-2">
              Monitor waste collection schedules to ensure timely service
              delivery and efficiency in operations.
              </p>
            </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Waste Collection Management Section */}
      <Box 
           sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color: colors.grey[100],
          }}
      className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-12">
            Waste Collection Management
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={ReportsImage}
                alt="Waste Collection"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
              Access reports on waste management activities to analyze
              performance and identify areas for improvement.
              </p>
              <button onClick={() => navigate("/view-reports")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
                view reports
              </button>
            </div>
          </div>
        </div>
      </Box>

    </Box>
  );
};

export default UnionHome;
