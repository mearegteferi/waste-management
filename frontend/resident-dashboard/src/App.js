import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ArticleForm from "./containers/ArticleForm";
import Profile from "./containers/Profile";
import Layout from "./hocs/Layout";
import store from "./store";
import Blog from "./containers/Blog";
import ReportIssue from "./containers/ReportIssue";
import ArticleDetail from "./containers/ArticleDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Schedule from "./containers/Schedule";

const App = () => {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/article-detail/:id" element={<ArticleDetail />} />
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
          </Layout>
        </Router>
      </Provider>
    </>
  );
};

export default App;
