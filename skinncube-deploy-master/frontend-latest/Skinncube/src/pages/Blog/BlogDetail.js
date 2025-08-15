import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogBySlug, likeBlog, getFeaturedBlogs } from "../../services/blogService";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../Account/authHandle/authSlice";
import {
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaHeart,
    FaRegHeart,
    FaEye,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp
} from "react-icons/fa";
import { getAssetUrl } from "../../utils/apiUtils";
import { toast } from "react-toastify";

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        fetchBlogDetail();
        fetchRelatedBlogs();
    }, [slug]);

    useEffect(() => {
        if (blog && user) {
            setIsLiked(blog.likes.includes(user._id));
            setLikesCount(blog.likes.length);
        }
    }, [blog, user]);

    const fetchBlogDetail = async () => {
        try {
            setLoading(true);
            const response = await getBlogBySlug(slug);
            setBlog(response.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
            toast.error("Blog not found");
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedBlogs = async () => {
        try {
            const response = await getFeaturedBlogs();
            setRelatedBlogs(response.data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching related blogs:", error);
        }
    };

    const handleLike = async () => {
        if (!user) {
            toast.error("Please login to like this article");
            return;
        }

        try {
            const response = await likeBlog(blog._id);
            setIsLiked(response.data.liked);
            setLikesCount(response.data.likesCount);
            toast.success(response.data.liked ? "Article liked!" : "Article unliked!");
        } catch (error) {
            console.error("Error liking blog:", error);
            toast.error("Failed to like article");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const shareUrl = window.location.href;
    const shareTitle = blog ? blog.title : "";

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                        <div className="h-64 bg-gray-300 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
                    <Link
                        to="/blog"
                        className="text-primeColor hover:underline"
                    >
                        Return to blog list
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Article Header */}
            <article className="bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <Link to="/blog" className="text-primeColor hover:underline">
                            ← Back to Blog
                        </Link>
                    </nav>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="bg-primeColor text-white px-4 py-2 rounded-full text-sm uppercase font-semibold">
                            {blog.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <FaUser className="w-4 h-4" />
                            <span>{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4" />
                            <span>{blog.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaEye className="w-4 h-4" />
                            <span>{blog.views} views</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <img
                            src={getAssetUrl(blog.featuredImage)}
                            alt={blog.title}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Article Actions */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                                }`}
                        >
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                            <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <FaShare className="text-gray-600 mr-2" />
                            <span className="text-gray-600 mr-3">Share:</span>
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-400 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={shareLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Info */}
                    <div className="border-t border-gray-200 pt-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primeColor text-white rounded-full flex items-center justify-center text-xl font-bold">
                                {blog.author.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {blog.author.name}
                                </h3>
                                <p className="text-gray-600">
                                    Contributing Author at SkinnCube
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
                <section className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog) => (
                                <Link
                                    key={relatedBlog._id}
                                    to={`/blog/${relatedBlog.slug}`}
                                    className="group block"
                                >
                                    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                            <img
                                                src={getAssetUrl(relatedBlog.featuredImage)}
                                                alt={relatedBlog.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <span className="bg-primeColor text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
                                                    {relatedBlog.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaClock className="w-3 h-3" />
                                                    {relatedBlog.readTime} min read
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primeColor transition-colors">
                                                {relatedBlog.title.length > 60
                                                    ? relatedBlog.title.substring(0, 60) + "..."
                                                    : relatedBlog.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {relatedBlog.excerpt.length > 120
                                                    ? relatedBlog.excerpt.substring(0, 120) + "..."
                                                    : relatedBlog.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogDetail;
