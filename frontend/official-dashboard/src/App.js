import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from './store';
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Menubar from './components/Sidebar';
import Topbar from './components/Topbar';
import ChangePassword from './components/ChangePassword'
import Activation from "./components/Activation";
import ViewIssue from "./page/global/ViewIssue";
import Schedule from "./page/global/Schedule";

import AdminHome from "./page/admin/AdminHome";
import CreateUser from "./page/admin/CreateUser";
import ManageUser from "./page/admin/ManageUser";
import UserDetail from "./page/admin/UserDetail";
import ApproveArticles from "./page/admin/ApproveArticles";
import ArticleDetail from "./page/admin/ArticleDetail"

import DataEncoderHome from "./page/data_encoder/DataEncoderHome";
import WriteReport from "./page/data_encoder/WriteReport";
import ViewReport from "./page/global/ViewReport";
import ReportDetail from "./page/global/ReportDetail";
import ApprovedRequest from "./page/data_encoder/ApprovedRequest";

import UnionHome from "./page/union/UnionHome"
import TabyaHome from "./page/tabya/TabyaHome"
import SubCityHome from "./page/sub city/SubCityHome"
import CityHome from "./page/city/CityHome"
import ApproveRequest from "./page/city/ApproveRequest";
import BarChart from "./page/global/BarChart"

function AppContent() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userStatus = useSelector(state => state.auth.status); // Assuming user status is stored in Redux state
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();


  useEffect(() => {
    // Redirect to dashboard after successful login if authenticated and not in pending status
    if (isAuthenticated && userStatus !== "PENDING") {
      navigate('/dashboard');
    }
  }, [isAuthenticated, userStatus]);


  const getHomeComponent = () => {
    switch (userRole) {
      case 'ADMIN':
        return <AdminHome />;
      case 'DATA_ENCODER':
        return <DataEncoderHome />;
      case 'TABYA':
        return <TabyaHome />;
      case 'SUB_CITY':
        return <SubCityHome />;
      case 'UNION':
        return <UnionHome />;
      case 'CITY':
        return <CityHome />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="w-full flex justify-center">
          {isAuthenticated ? (
            userStatus === "PENDING" ? ( 
              <Routes>
                <Route path="/activation" element={<Activation />} />{/* Redirect all other routes to Activation */}
              </Routes>
            ) : (
              <>
                <Menubar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <main className="w-full" style={{ marginLeft: isCollapsed ? "80px" : "240px", transition: 'margin-left 0.3s ease' }}>
                  <Topbar isCollapsed={isCollapsed} />
                  <Routes>
                    <Route path="/dashboard" element={getHomeComponent()} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                    <Route path="/manage-users" element={<ManageUser />} />
                    <Route path="/manage-user/:id" element={<UserDetail />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/approve-articles" element={<ApproveArticles />} />
                    <Route path="/article-detail" element={<ArticleDetail />} />
                    <Route path="/write-report" element={<WriteReport />} />
                    <Route path="/view-reports/:status" element={<ViewReport />} />
                    <Route path="/chart" element={<BarChart />} />
                    <Route path="/report-detail/:id" element={<ReportDetail />} />
                    <Route path="/approved-requests" element={<ApprovedRequest />} />
                    <Route path="/view-issues" element={<ViewIssue />} />
                    <Route path="/view-schedule" element={<Schedule />} />
                    <Route path="/approve-request" element={<ApproveRequest />} />
                  </Routes>
                </main>
              </>
            )
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <>
    <Toaster />
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
    </>
  );
}

export default App;
