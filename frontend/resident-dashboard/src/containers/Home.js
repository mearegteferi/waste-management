import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock } from "lucide-react"; // I used lucide-react for small icons, standard in modern react
import { useSelector } from "react-redux";

// Images
import hero from "../assets/hero-9.jfif";
import reportImage from "../assets/complaints.jfif";
import writeArticleImage from "../assets/write_article.jfif";
import readArticleImage from "../assets/read_article.jfif";
import viewScheduleImage from "../assets/schedule.jfif";

function Home() {
  const [articles, setArticles] = useState([]);
  const state = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/article/random/`
        );
        const data = await res.json();
        setArticles(data.results || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-green-500 selection:text-white">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 mb-6 border border-green-500/30 rounded-full bg-green-500/10 backdrop-blur-sm">
                <span className="text-green-400 font-semibold text-sm tracking-wide uppercase">
                  Eco-Friendly Mekelle
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Transforming Waste <br />
                into <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Opportunity</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Join Mekelle City's sustainable revolution. We represent the bridge between today's waste and tomorrow's clean energy resources.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/learn-more"
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold shadow-lg shadow-green-900/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold border border-slate-700 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
                <img
                  src={hero}
                  alt="Mekelle City Waste Management"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Decoration Card */}
              <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 z-20 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">System Status</p>
                    <p className="font-bold text-white">Active & Clean</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <section className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Core Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Efficient digital tools designed to streamline city operations and citizen engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              to="/report"
              img={reportImage}
              title="Report Complaints"
              desc="Spot an issue? Let us know immediately."
            />
            <ServiceCard
              to="/article-form"
              img={writeArticleImage}
              title="Write Articles"
              desc="Share your insights on green energy."
            />
            <ServiceCard
              to="/blog"
              img={readArticleImage}
              title="Read Articles"
              desc="Stay updated with the latest news."
            />
            <ServiceCard
              to="/schedule"
              img={viewScheduleImage}
              title="View Schedule"
              desc="Check waste collection timings."
            />
          </div>
        </div>
      </section>

      {/* ---------------- ARTICLES SECTION ---------------- */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Latest Insights</h2>
              <p className="text-slate-400">Discover what's happening in your city.</p>
            </div>
            <Link to="/blog" className="flex items-center text-green-400 hover:text-green-300 font-semibold transition-colors">
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article-detail/${article.id}`}
                  className="group flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-green-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${article.image}`}
                      alt={article.title}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author_name}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.created_date).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {article.content_preview}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-800 flex items-center text-green-500 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Read Full Article <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                <p>No articles found at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------- SUB-COMPONENTS ----------------

const ServiceCard = ({ to, img, title, desc }) => (
  <Link
    to={to}
    className="group relative bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/20 overflow-hidden"
  >
    {/* Gradient Glow on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative z-10 flex flex-col items-center text-center h-full">
      <div className="w-16 h-16 mb-4 rounded-full bg-slate-700/50 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 border border-slate-600 group-hover:border-green-500/30">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-full mix-blend-screen opacity-90"
        // Note: mix-blend-screen helps if jfifs have black backgrounds, otherwise remove it
        />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </Link>
);

export default Home;