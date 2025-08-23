import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, getBlogCategories, getFeaturedBlogs } from "../../services/blogService";
import { FaCalendarAlt, FaClock, FaUser, FaSearch, FaFilter } from "react-icons/fa";
import { getAssetUrl } from "../../utils/apiUtils";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    // Filters
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("publishedAt");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        fetchBlogs();
        fetchFeaturedBlogs();
        fetchCategories();
    }, [currentPage, selectedCategory, searchTerm, sortBy, sortOrder]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 9,
                ...(selectedCategory && { category: selectedCategory }),
                ...(searchTerm && { search: searchTerm }),
                sortBy,
                sortOrder,
            };

            const response = await getAllBlogs(params);
            setBlogs(response.data.blogs);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedBlogs = async () => {
        try {
            const response = await getFeaturedBlogs();
            setFeaturedBlogs(response.data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching featured blogs:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getBlogCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchBlogs();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-primeColor text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            SkinnCube Blog
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Discover the latest insights on health, wellness, skincare, and medicine from our expert team.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            {featuredBlogs.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Featured Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredBlogs.map((blog) => (
                                <Link
                                    key={blog._id}
                                    to={`/blog/${blog.slug}`}
                                    className="group block"
                                >
                                    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                            <img
                                                src={getAssetUrl(blog.featuredImage)}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <span className="bg-primeColor text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                                                    {blog.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaClock className="w-3 h-3" />
                                                    {blog.readTime} min read
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primeColor transition-colors">
                                                {truncateText(blog.title, 60)}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {truncateText(blog.excerpt, 120)}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FaUser className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {blog.author.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <FaCalendarAlt className="w-3 h-3" />
                                                    {formatDate(blog.publishedAt)}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Filters and Blog Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
                        <div className="flex items-center gap-4">
                            <FaFilter className="text-gray-600" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Sort by:</span>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('-');
                                    setSortBy(field);
                                    setSortOrder(order);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                            >
                                <option value="publishedAt-desc">Latest First</option>
                                <option value="publishedAt-asc">Oldest First</option>
                                <option value="views-desc">Most Popular</option>
                                <option value="title-asc">Title A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : blogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {blogs.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        to={`/blog/${blog.slug}`}
                                        className="group block"
                                    >
                                        <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                                <img
                                                    src={getAssetUrl(blog.featuredImage)}
                                                    alt={blog.title}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                    <span className="bg-primeColor text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                                                        {blog.category}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaClock className="w-3 h-3" />
                                                        {blog.readTime} min read
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primeColor transition-colors">
                                                    {truncateText(blog.title, 60)}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {truncateText(blog.excerpt, 120)}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FaUser className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {blog.author.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <FaCalendarAlt className="w-3 h-3" />
                                                        {formatDate(blog.publishedAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={!pagination.hasPrevPage}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>

                                    {[...Array(pagination.totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                                    ? "bg-primeColor text-white"
                                                    : "border border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                                        disabled={!pagination.hasNextPage}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                No articles found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search criteria or browse all categories.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogList;
