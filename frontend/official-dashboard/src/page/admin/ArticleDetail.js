// ArticleDetail.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { tokens } from "../../theme";

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!article) {
    return (
      <Typography
        color="error"
        variant="h6"
        align="center"
        style={{ marginTop: "20px" }}
      >
        Article not found.
      </Typography>
    );
  }

  // Split content by sentences or approximate character count
  const splitContent = (text) => {
    const sentenceRegex = /[^.!?]+[.!?]/g;
    const sentences = text.match(sentenceRegex) || [text];
    return sentences.reduce((acc, sentence) => {
      if (acc.length && acc[acc.length - 1].length + sentence.length < 150) {
        acc[acc.length - 1] += ` ${sentence.trim()}`;
      } else {
        acc.push(sentence.trim());
      }
      return acc;
    }, []);
  };

  const handleApproval = async (status) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/article/${article.id}/approve/`,
        { status },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );
     toast.success(`Article ${status ? "approved" : "rejected"} successfully!`);
      navigate("/approve-articles");
    } catch (error) {
      toast.error(`Failed to ${status ? "approve" : "reject"} the article.`);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "40px",
        padding: "20px",
      }}
    >
      <Card
        sx={{
            backgroundColor: theme.palette.mode === "light" ? "#cccccc" : "#141b2d",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {article.image && (
          <CardMedia
            component="img"
            alt={article.title}
            height="200" // Smaller height for image
            image={`${process.env.REACT_APP_API_URL}${article.image}`}
            style={{
              objectFit: "cover",
              width: "auto",
              margin: "auto",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        )}
        <CardContent style={{ padding: "24px" }}>
          <Typography
            variant="h4"
            component="h1"
            color={colors.grey[200]}
            gutterBottom
            style={{ fontWeight: "bold"}}
          >
            {article.title}
          </Typography>
          <Divider style={{ margin: "16px 0" }} />
          <Typography
            variant="subtitle2"
            color={colors.grey[100]}
            style={{ marginBottom: "16px", fontStyle: "italic" }}
          >
            {`by: ${
              article.author_name
            }`}
          </Typography>
          <Typography
            variant="subtitle2"
            color={colors.grey[100]}
            style={{ marginBottom: "16px", fontStyle: "italic" }}
          >
            {`Published on: ${
              new Date(article.created_date).toLocaleDateString()
            }`}
          </Typography>
          {splitContent(article.content).map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              color={colors.grey[200]}
              paragraph
              style={{
                marginBottom: "12px",
                lineHeight: "1.7",
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              {paragraph}
            </Typography>
          ))}
          <Stack
            direction="row"
            spacing={2}
            style={{ marginTop: "24px", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApproval("APPROVED")}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleApproval("REJECTED")}
              style={{
                borderColor: "#f44336",
                color: "#f44336",
                fontWeight: "bold",
              }}
            >
              Reject
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ArticleDetail;
