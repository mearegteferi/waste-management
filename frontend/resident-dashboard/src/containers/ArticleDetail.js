import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/article/article_detail/${id}/`,
        );
        const data = await res.json();
        setArticle(data);

        // Fetch related articles based on the category
        const relatedRes = await fetch(
          `${process.env.REACT_APP_API_URL}/article/related/?category=${data.category.id}`,
        );
        const relatedData = await relatedRes.json();
        setRelatedArticles(relatedData);
      } catch (err) {
        console.log("Error fetching article:", err);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const contentParagraphs = article.content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <div className="container mx-auto my-20 flex">
      <div className="w-3/4 mr-6">
        <h2 className="font-bold text-2xl text-gray-800 tracking-normal mb-6">
          {article.title}
        </h2>
        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
          <div>
            <img
              src={`${process.env.REACT_APP_API_URL}/${article.image}`}
              alt={article.title}
              className="w-full h-64 md:h-96 rounded-t-lg object-cover"
            />
          </div>
          <div className="px-8 py-6">
            <div className="text-gray-700 leading-relaxed font-serif">
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-sm tracking-tighter text-gray-900 mr-4">
                  {article.author_name}
                <span className="text-gray-600 ml-8">
                  {new Date(article.created_date).toLocaleDateString()}.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-center mt-12">
        <Link to='/article-form'>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6">
          Write Article
        </button>
        </Link>
        <h3 className="font-bold text-lg text-gray-800 tracking-normal mb-4">
          Related Articles
        </h3>
        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide p-4 w-full" style={{ marginTop: '50px' }}>
          {relatedArticles.map((relatedArticle) => (
            <Link to={`/article-detail/${relatedArticle.id}`}>
            <div
              key={relatedArticle.id}
              className="mb-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${relatedArticle.image}`}
                  alt={relatedArticle.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <a
                  href={`/article/${relatedArticle.id}`}
                  className="text-gray-800 hover:text-gray-600"
                >
                  {relatedArticle.title}
                </a>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
