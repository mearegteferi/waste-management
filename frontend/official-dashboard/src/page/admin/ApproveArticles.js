import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ApproveArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const fetchUnapprovedArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/article/unapproved/`,
          config
        );
        setArticles(response.data);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchUnapprovedArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  const handleCardClick = (article) => {
    navigate("/article-detail", { state: { article } }); // Navigate to article detail view
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="APPROVE ARTICLES" subtitle="approve pending articles" />
      <h2 className="text-3xl font-bold mb-6 text-center">
        Unapproved Articles
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {" "}
        {/* Adjusted grid columns and gap */}
        {articles.length === 0 ? (
          <Typography variant="h6" className="text-center col-span-full">
            No unapproved articles found.
          </Typography>
        ) : (
          articles.map((article) => (
            <Card
              sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
              }}
              key={article.id}
              className="shadow-lg rounded-lg overflow-hidden cursor-pointer" // Added cursor-pointer for hover effect
              onClick={() => handleCardClick(article)} // Added click handler
              style={{ maxWidth: 180 }} // Adjusted max width for smaller cards
            >
              {article.image && (
                <CardMedia
                  component="img"
                  alt={article.title}
                  height="140" // Reduced height
                  image={`${process.env.REACT_APP_API_URL}${article.image}`}
                  style={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  className="font-semibold"
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  className="font-semibold"
                >
                  {`by: ${article.author_name}`}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  className="font-semibold"
                >
                  {new Date(article.created_date).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="line-clamp-2"
                >
                  {" "}
                  {/* Use line-clamp for limiting lines */}
                  {article.content_preview ||
                    article.content.substring(0, 100) + "..."}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ApproveArticles;
