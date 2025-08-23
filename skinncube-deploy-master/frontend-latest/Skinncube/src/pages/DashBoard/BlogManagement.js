import React, { useState, useEffect } from "react";
import {
    getAllBlogsAdmin,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    getBlogCategories
} from "../../services/blogService";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaImage,
    FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getAssetUrl } from "../../utils/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectUserInfo } from "../Account/authHandle/authSlice";
import { useNavigate } from "react-router-dom";

const BlogManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [pagination, setPagination] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        category: "health",
        tags: "",
        featuredImage: null,
        images: [] // new inline images
    });

    // Filters
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const result = await dispatch(checkAuthAsync());
            console.log("🔍 BlogManagement - Auth check result:", result);

            if (result?.payload?.status === 401) {
                console.log("❌ BlogManagement - User not authenticated, redirecting to signin");
                toast.error("You must be logged in to access this page");
                navigate("/signin");
                return;
            }

            const user = result?.payload?.user || result?.payload?.data?.user;
            console.log("👤 BlogManagement - User info:", {
                email: user?.email,
                role: user?.role,
                _id: user?._id
            });

            const role = String(user?.role || '').toUpperCase();
            if (role === "USER") {
                console.log("❌ BlogManagement - User role is USER, admin required. Redirecting to home");
                toast.error("Admin Privilege Required")
                navigate("/")
            } else if (role === "ADMIN" || role === "SUPERADMIN") {
                console.log("✅ BlogManagement - Admin access granted for role:", role);
                fetchBlogs();
                fetchCategories();
            } else {
                console.log("⚠️ BlogManagement - Unknown role:", role, "- redirecting to home");
                navigate("/")
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 10,
                ...(statusFilter && { status: statusFilter }),
            };

            const response = await getAllBlogsAdmin(params);
            setBlogs(response.data.blogs);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
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

    const handleInlineImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.excerpt) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const blogData = {
                ...formData,
                tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
            };

            if (editingBlog) {
                await updateBlog(editingBlog._id, blogData);
                toast.success("Blog updated successfully");
            } else {
                await createBlog(blogData);
                toast.success("Blog created successfully");
            }

            resetForm();
            setShowModal(false);
            fetchBlogs();
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.error(error.message || "Failed to save blog");
        }
    };

    const handleDelete = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlog(blogId);
                toast.success("Blog deleted successfully");
                fetchBlogs();
            } catch (error) {
                console.error("Error deleting blog:", error);
                toast.error("Failed to delete blog");
            }
        }
    };

    const handleStatusToggle = async (blogId, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';

        try {
            await toggleBlogStatus(blogId, newStatus);
            toast.success(`Blog ${newStatus} successfully`);
            fetchBlogs();
        } catch (error) {
            console.error("Error updating blog status:", error);
            toast.error("Failed to update blog status");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            excerpt: "",
            category: "health",
            tags: "",
            featuredImage: null,
            images: []
        });
        setEditingBlog(null);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            category: blog.category,
            tags: blog.tags.join(", "),
            featuredImage: null,
            images: []
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-600 mt-1">Create and manage blog articles</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-primeColor text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                >
                    <FaPlus /> Create New Blog
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                    >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>

            {/* Blog Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Article
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={getAssetUrl(blog.featuredImage)}
                                                    alt={blog.title}
                                                    className="h-12 w-16 object-cover rounded mr-4"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {blog.title.length > 50
                                                            ? blog.title.substring(0, 50) + "..."
                                                            : blog.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        By {blog.author.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primeColor text-white">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : blog.status === 'draft'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {blog.views}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(blog.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleStatusToggle(blog._id, blog.status)}
                                                    className={`p-2 rounded-lg transition-colors ${blog.status === 'published'
                                                        ? 'text-yellow-600 hover:bg-yellow-100'
                                                        : 'text-green-600 hover:bg-green-100'
                                                        }`}
                                                    title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                                                >
                                                    {blog.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(blog)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        No blogs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="px-6 py-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.totalBlogs)} of {pagination.totalBlogs} results
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={!pagination.hasPrevPage}
                                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                                    disabled={!pagination.hasNextPage}
                                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingBlog ? "Edit Blog" : "Create New Blog"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                                            required
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                                            required
                                        >
                                            {categories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Excerpt *
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value.slice(0, 500) })}
                                        rows={3}
                                        maxLength={500}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                                        placeholder="Brief description of the article (max 500 chars)..."
                                        required
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Content *
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={10}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                                        placeholder="Write your article content here..."
                                        required
                                    />
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image {!editingBlog && "*"}
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.files[0] })}
                                            className="w-full"
                                            {...(!editingBlog && { required: true })}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            Upload a high-quality image for your article
                                        </p>
                                    </div>
                                </div>

                                {/* Inline Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Inline Images (optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleInlineImagesChange}
                                            className="w-full"
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            You can upload multiple images to embed within the content
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Tags */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primeColor"
                                            placeholder="health, wellness, skincare (comma separated)"
                                        />
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primeColor text-white rounded-lg hover:bg-opacity-90 transition-colors"
                                    >
                                        {editingBlog ? "Update Blog" : "Create Blog"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
