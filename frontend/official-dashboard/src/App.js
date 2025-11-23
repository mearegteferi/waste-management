import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { CssBaseline, ThemeProvider, CircularProgress, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import store from './store';

// Layouts & Wrappers
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

// Non-Lazy Components (First Paint)
import Login from "./components/Login";
import Activation from "./components/Activation";

// --- LAZY LOAD PAGES (Performance Boost) ---
// These only load when the user visits the specific URL
const Profile = lazy(() => import("./components/Profile"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const ViewIssue = lazy(() => import("./page/global/ViewIssue"));
const Schedule = lazy(() => import("./page/global/Schedule"));
const AdminHome = lazy(() => import("./page/admin/AdminHome"));
const CreateUser = lazy(() => import("./page/admin/CreateUser"));
const ManageUser = lazy(() => import("./page/admin/ManageUser"));
const UserDetail = lazy(() => import("./page/admin/UserDetail"));
const ApproveArticles = lazy(() => import("./page/admin/ApproveArticles"));
const ArticleDetail = lazy(() => import("./page/admin/ArticleDetail"));
const DataEncoderHome = lazy(() => import("./page/data_encoder/DataEncoderHome"));
const WriteReport = lazy(() => import("./page/data_encoder/WriteReport"));
const ViewReport = lazy(() => import("./page/global/ViewReport"));
const ReportDetail = lazy(() => import("./page/global/ReportDetail"));
const ApprovedRequest = lazy(() => import("./page/data_encoder/ApprovedRequest"));
const UnionHome = lazy(() => import("./page/union/UnionHome"));
const TabyaHome = lazy(() => import("./page/tabya/TabyaHome"));
const SubCityHome = lazy(() => import("./page/sub city/SubCityHome"));
const CityHome = lazy(() => import("./page/city/CityHome"));
const ApproveRequest = lazy(() => import("./page/city/ApproveRequest"));
const BarChart = lazy(() => import("./page/global/BarChart"));

// Helper for Role Based Redirect
const RoleBasedHome = () => {
  const userRole = localStorage.getItem("role"); // Ideally, get this from Redux
  
  const roleMap = {
    'ADMIN': <AdminHome />,
    'DATA_ENCODER': <DataEncoderHome />,
    'TABYA': <TabyaHome />,
    'SUB_CITY': <SubCityHome />,
    'UNION': <UnionHome />,
    'CITY': <CityHome />
  };

  return roleMap[userRole] || <Navigate to="/login" />;
};

// Loading Spinner Component
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

function AppContent() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />

            {/* Pending User Route */}
            <Route path="/activation" element={<Activation />} />

            {/* Protected Routes (Must be Logged In & Active) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                
                {/* Dashboard handles dynamic role loading */}
                <Route path="/dashboard" element={<RoleBasedHome />} />
                
                {/* Global Pages */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/view-reports/:status" element={<ViewReport />} />
                <Route path="/report-detail/:id" element={<ReportDetail />} />
                <Route path="/view-issues" element={<ViewIssue />} />
                <Route path="/view-schedule" element={<Schedule />} />
                <Route path="/chart" element={<BarChart />} />

                {/* Admin Pages */}
                <Route path="/manage-users" element={<ManageUser />} />
                <Route path="/manage-user/:id" element={<UserDetail />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/approve-articles" element={<ApproveArticles />} />
                <Route path="/article-detail" element={<ArticleDetail />} />

                {/* Data Encoder Pages */}
                <Route path="/write-report" element={<WriteReport />} />
                <Route path="/approved-requests" element={<ApprovedRequest />} />

                {/* City Pages */}
                <Route path="/approve-request" element={<ApproveRequest />} />
                
                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
                
              </Route>
            </Route>
          </Routes>
        </Suspense>
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