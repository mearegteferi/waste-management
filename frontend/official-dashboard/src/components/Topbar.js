import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Topbar = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate()

  return (
    <Box
      className={`flex justify-between p-2 fixed right-0 top-0 z-50 transition-all duration-300 ${
        isCollapsed ? "left-[86px]" : "left-[238px]"
      }`}
      sx={{
        backdropFilter: "blur(10px)", // Blurs the background content
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Adds a shadow for separation
      }}
    >


      {/* ICONS */}
      <Box ClassName="flex" backgroundColor={colors.primary[400]}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate("/profile")}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
