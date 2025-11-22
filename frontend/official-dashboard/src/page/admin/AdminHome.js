import Header from "../../components/Header";
import { FaRecycle, FaLeaf, FaTruck, FaUserCheck, FaBook } from "react-icons/fa"; // For adding waste management related icons
import WasteManagementImage from "../../assets/2.jpg"; // Replace with actual image import
import writeArticle from "../../assets/write_article.webp"; // Similarly, replace this
import { useTheme, Box } from '@mui/material'
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";


const AdminHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  return (
    <Box 
    backgroundColor={colors.primary[400]}
    className="mt-16 px-4 py-[1px]">
      <Header
        title="ADMIN DASHBOARD"
        subtitle="Waste Management System - Mekelle City"
      />

      {/* Hero Section */}
      <Box 
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color:colors.grey[100]
        }}
      className={`py-4 px-2 lg:px-20 flex flex-col lg:flex-row items-center justify-between `}>
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Welcome, Admin!
          </h1>
          <p className="text-lg mb-8">
            Oversee the Waste Management System for Mekelle City. Approve waste
            management articles, manage users.
          </p>
          <button onClick={() => navigate("/manage-users")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
            Manage Users
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

      {/* Admin Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-12">
            Admin Features
          </h2>

          <div className="flex flex-wrap justify-center gap-10">  
          <Link to="/manage-users">
            <Box 
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          color:colors.grey[100]
        }}
            className="shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaUserCheck className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold ">Manage Users</h3>
              <p className="mt-2">
                manage user of different roles within the system to
                ensure smooth operations and secure access.
              </p>
            </Box>
            </ Link>

            <Link to="/approve-articles">
            <Box 
                    sx={{
                      backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                      color:colors.grey[100]
                    }}
            className="shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaBook className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold">Approve Articles</h3>
              <p className="mt-2">
                Review and approve articles on waste management practices,
                raising awareness and educating the community.
              </p>
            </Box>
            </Link>

            <Link to="/create-user">
            <Box
                   sx={{
                    backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
                    color:colors.grey[100]
                  }}
            className="shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300">
              <FaRecycle className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold">Add new Employees</h3>
              <p className="mt-2">
                Create accounts for Employees with different roles for the bureau of 
                Mekelle waste management
              </p>
            </Box>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Management Section */}
      <Box 
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
            color:colors.grey[100]
          }}
      className="py-16">
        <Box className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Waste Management Articles
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <img
                src={writeArticle}
                alt="Article Approval"
                className="rounded-lg shadow-lg w-[300px] ml-[100px]"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-lg mb-8">
                Review and publish articles focusing on environmental awareness,
                sustainable waste practices, and improving community engagement
                with waste management systems.
              </p>
              <button onClick={() => navigate("/approve-articles")} className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700">
                Review Articles
              </button>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
