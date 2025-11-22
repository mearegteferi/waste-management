import Header from "../../components/Header";
import { FaRecycle, FaLeaf, FaTruck } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg"; // You can replace this with your actual image import
import ReportImage from "../../assets/report.png"; // Similarly, replace this
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

const DataEncoderHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  return (
    <Box backgroundColor={colors.primary[400]} className="mt-16 px-4 py-[1px]">
      <Header
        title="DATA ENCODER DASHBOARD"
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
           Mekelle City's Waste Management System
          </h1>
          <p className="text-lg mb-8">
            A platform to manage and monitor the waste collection
            services across Mekelle.
          </p>
          <button onClick={() => navigate("/write-report")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
            write Reports
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

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Waste Management features
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            <Link to="/view-reports/approved">
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
                className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <FaRecycle className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">
                  view Approved Reports
                </h3>
                <p className="mt-2">
                  View Waste collection Reports approved by tabya, union or city
                  waste management officials.
                </p>
              </Box>
            </Link>

            <Link to="/view-reports/rejected">
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                  color: colors.grey[100],
                }}
                className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <FaTruck className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold">View Rejected Reports</h3>
                <p className="mt-2">
                  View Waste collection Reports approved by tabya, union or city
                  waste management officials.
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
                <FaLeaf className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold ">
                  Waste collection schedule
                </h3>
                <p className="mt-2">
                  view the schedule of waste collection for the whole city based
                  on different subcities and tabya
                </p>
              </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Report Writing Section */}
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
            Write and Review Waste Management Reports
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={ReportImage}
                alt="Report writing"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
                Our platform enables city officials to write detailed reports on
                waste management activities. Analyze the efficiency of
                collection processes, recycling efforts, and other metrics to
                make informed decisions.
              </p>
              <button className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
                Write a Report
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DataEncoderHome;
