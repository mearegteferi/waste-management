import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

// State & HOCs
import store from "./store";
import Layout from "./hocs/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// --- LAZY LOAD CONTAINERS (Performance Boost) ---
// These will only be downloaded when the user actually clicks the link.
const Home = lazy(() => import("./containers/Home"));
const Login = lazy(() => import("./containers/Login"));
const Signup = lazy(() => import("./containers/Signup"));
const ArticleForm = lazy(() => import("./containers/ArticleForm"));
const Profile = lazy(() => import("./containers/Profile"));
const Blog = lazy(() => import("./containers/Blog"));
const ReportIssue = lazy(() => import("./containers/ReportIssue"));
const ArticleDetail = lazy(() => import("./containers/ArticleDetail"));
const Schedule = lazy(() => import("./containers/Schedule"));

// --- 1. SCROLL TO TOP COMPONENT ---
// Ensures every time you change pages, the view resets to the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- 2. LOADING SPINNER (Themed) ---
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#020617]">
    <CircularProgress sx={{ color: "#22c55e" }} size={60} thickness={4} />
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      {/* 3. THEMED TOAST NOTIFICATIONS */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b", // Slate-800
            color: "#f1f5f9",      // Slate-100
            border: "1px solid #334155",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // Green-500
              secondary: "#f1f5f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // Red-500
              secondary: "#f1f5f9",
            },
          },
        }}
      />

      <Router>
        <ScrollToTop />
        <Layout>
          {/* Suspense handles the loading state while lazy pages are fetched */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/article-detail/:id" element={<ArticleDetail />} />

              {/* Protected Routes */}
              <Route
                path="/article-form"
                element={
                  <ProtectedRoute>
                    <ArticleForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ReportIssue />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;