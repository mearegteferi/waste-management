import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/article/list/?page=${currentPage}`,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`,
            },
          }
        );
        const data = await res.json();
        setArticles(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err) {
        console.log("this is from the catch, ", err);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="dark:bg-gray-100  text-gray-200 mt-32">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              rel="noopener noreferrer"
              to={`/article-detail/${article.id}`}
              className="bg-gray-800 max-w-sm mx-auto group transition-transform transform hover:scale-105 dark:bg-gray-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-44 dark:bg-gray-500"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
                  {article.title}
                </h3>
                <span className="text-sm te dark:text-gray-600">
                  {new Date(article.created_date).toLocaleDateString()}
                </span>
                <p className="text-gray-400 ">
                  {article.content_preview}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`px-4 py-2 rounded-md hover:underline transition-colors duration-200 ${
                page === currentPage
                  ? "bg-gray-200 dark:bg-gray-400 text-gray-800 dark:text-gray-100"
                  : "bg-gray-50 dark:bg-gray-200 text-gray-600"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
