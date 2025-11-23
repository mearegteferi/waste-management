import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Menubar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="w-full flex">
      <Menubar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main 
        className="w-full" 
        style={{ 
          marginLeft: isCollapsed ? "80px" : "240px", 
          transition: "margin-left 0.3s ease",
          minHeight: "100vh" 
        }}
      >
        <Topbar isCollapsed={isCollapsed} />
        {/* Outlet renders the child route (e.g., Dashboard, Profile) */}
        <Box p={2}>
            <Outlet /> 
        </Box>
      </main>
    </div>
  );
};

export default MainLayout;