import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import { menuItems } from "../utils/MenuItems";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/authSlice"; // Adjust the path based on your file structure
import pro from "../assets/channel-1.jpeg";

const SidebarItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
}) => {
  const theme = useTheme();
  const handleClick = () => setSelected(title);

  return (
    <Link to={to}>
      <li
        onClick={handleClick}
        className={`relative flex items-center p-3 my-2 rounded-lg group cursor-pointer transition-all duration-300 ${
          selected === title
            ? "bg-blue-500 text-white"
            : theme.palette.mode === "dark"
            ? "text-gray-200 hover:bg-gray-700"
            : "text-black hover:bg-gray-400"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-4">{icon}</div>
          {!isCollapsed ? (
            <Typography className="ml-8 text-sm font-semibold">
              {title}
            </Typography>
          ) : (
            <Typography
              className={`absolute left-full ml-2 whitespace-nowrap text-sm font-semibold ${
                theme.palette.mode === "dark" ? "bg-gray-700" : "bg-gray-400"
              } p-1 mr-20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{
                minWidth: "120px",
                zIndex: 1000,
                position: "absolute",
              }}
            >
              {title}
            </Typography>
          )}
        </div>
      </li>
    </Link>
  );
};

const Menubar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userRole = localStorage.getItem("role");
  const roleMenuItems = menuItems[userRole] || [];

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    window.location.href = "/login"; // Optionally navigate to login page after logout
  };

  return (
    <Box
      backgroundColor={colors.primary[400]}
      className={`flex flex-col bg-gray-800 transition-all duration-300`}
      style={{
        position: "fixed", 
        top: 0,
        left: 0,
        height: "100vh", 
        width: isCollapsed ? "60px" : "220px", 
        zIndex: 1000, 
      }}
    >
      {/* Logo and Collapse Button */}
      <div className="flex justify-between items-start p-4 mb-2">
        {!isCollapsed && (
          <div className="flex flex-col justify-center items-center">
            <img
              src={`${process.env.REACT_APP_API_URL}${user.image}`}
              alt="Profile"
              className="w-12 h-12 rounded-full border border-gray-500 mb-2"
            />
            <div className="text-center">
              <Typography
                variant="h6"
                color={colors.grey[100]}
                className="font-semibold"
              >
                {user.full_name}
              </Typography>
              <Typography variant="body2" color={colors.greenAccent[500]}>
                {user.role}
              </Typography>
            </div>
          </div>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white"
          aria-label="toggle menu"
        >
          <MenuOutlinedIcon />
        </IconButton>
      </div>

      {/* Menu Items */}
      <ul className={`p-4 ${isCollapsed ? "pl-2" : "pl-4"}`}>
        {roleMenuItems.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        ))}
        {/* Logout item */}
        <li
          className={`relative flex items-center p-3 my-2 rounded-lg group cursor-pointer transition-all duration-300 ${
            theme.palette.mode === "dark"
              ? "text-gray-200 hover:bg-gray-700"
              : "text-black hover:bg-gray-400"
          }`}
          onClick={handleLogout}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <LogoutOutlinedIcon className="" />
            </div>
            {!isCollapsed ? (
              <Typography className="ml-8 text-sm font-semibold">
                Logout
              </Typography>
            ) : (
              <Typography
                className={`absolute left-full ml-2 whitespace-nowrap text-sm font-semibold ${
                  theme.palette.mode === "dark" ? "bg-gray-700" : "bg-gray-400"
                } p-1 mr-20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ minWidth: "120px" }}
              >
                Logout
              </Typography>
            )}
          </div>
        </li>
      </ul>
    </Box>
  );
};

export default Menubar;
