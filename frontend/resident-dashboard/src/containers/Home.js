import React, { useState, useEffect } from "react";
import hero from "../assets/hero-9.jfif";
import { Link } from "react-router-dom";
import reportImage from "../assets/complaints.jfif"; // Image for reporting complaints
import writeArticleImage from "../assets/write_article.jfif"; // Image for writing articles
import readArticleImage from "../assets/read_article.jfif"; // Image for reading articles
import viewScheduleImage from "../assets/schedule.jfif"; // Image for viewing schedules
import { useSelector } from "react-redux";

function Home() {
  const [articles, setArticles] = useState([]);

  const state = useSelector((state) => state.auth.isAuthenticated);
  console.log("state", state);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/article/random/`
        );
        const data = await res.json();
        setArticles(data.results);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="mt-16  text-gray-200">
      {/* Hero Section */}
      <div className="flex bg-gray-900 flex-col md:flex-row items-center">
        <div className="flex-1 p-8 md:p-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transforming Waste into Opportunity
          </h1>
          <p className="text-lg md:text-2xl mb-4">
            Mekelle City's Sustainable Waste Management System
          </p>
          <p className="text-lg md:text-xl mb-8">
            Empowering a Greener Future for All
          </p>
          <Link
            to="/learn-more"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-500 transition duration-300"
          >
            Learn More
          </Link>
        </div>
        <div className="flex-1 p-4 md:p-8">
          <img
            src={hero}
            className="w-full h-[50vh] md:h-[60vh] lg:h-[65vh] object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            alt="Waste Management"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl bg-gray-900 mx-auto p-12 mt-16">
        <h2 className="text-4xl font-bold text-center mb-8">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link
            to="/report"
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 flex flex-col items-center justify-center h-48 p-6 text-center"
          >
            <img
              src={reportImage}
              alt="Report Complaints"
              className="h-16 mb-2"
            />
            <h3 className="text-xl font-semibold">Report Complaints</h3>
          </Link>
          <Link
            to="/article-form"
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 flex flex-col items-center justify-center h-48 p-6 text-center"
          >
            <img
              src={writeArticleImage}
              alt="Write Articles"
              className="h-16 mb-2"
            />
            <h3 className="text-xl font-semibold">Write Articles</h3>
          </Link>
          <Link
            to="/blog"
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 flex flex-col items-center justify-center h-48 p-6 text-center"
          >
            <img
              src={readArticleImage}
              alt="Read Articles"
              className="h-16 mb-2"
            />
            <h3 className="text-xl font-semibold">Read Articles</h3>
          </Link>
          <Link
            to="/schedule"
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 flex flex-col items-center justify-center h-48 p-6 text-center"
          >
            <img
              src={viewScheduleImage}
              alt="View Schedule"
              className="h-16 mb-2"
            />
            <h3 className="text-xl font-semibold">View Schedule</h3>
          </Link>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="max-w-7xl bg-gray-900 mx-auto py-8 sm:px-0 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              rel="noopener noreferrer"
              to={`/article-detail/${article.id}`}
              className="group"
            >
              <div
                className={`bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 h-[450px]`}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/${article.image}`}
                  alt={article.title}
                  className="object-cover w-full h-44"
                />
                <div className="p-6 space-y-2 h-[calc(450px-11rem)]">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article.title}
                  </h3>
                  <span className="text-xs">
                    {`by: ${article.author_name}`}
                  </span>
                  <span className="text-xs">
                    {new Date(article.created_date).toLocaleDateString()}
                  </span>
                  <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    {article.content_preview}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
