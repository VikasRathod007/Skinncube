import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new blog (Admin only)
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, excerpt, featuredImage, category, tags, seoTitle, seoDescription } = req.body;
    const authorId = req.user._id;

    if (!title || !content || !excerpt || !featuredImage) {
        throw new ApiError(400, "Title, content, excerpt, and featured image are required");
    }

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
        throw new ApiError(409, "Blog with this title already exists");
    }

    // Calculate read time (assuming 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);

    const blog = await Blog.create({
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        author: authorId,
        category: category || 'health',
        tags: tags || [],
        readTime,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt
    });

    const createdBlog = await Blog.findById(blog._id).populate('author', 'name email');

    return res.status(201).json(
        new ApiResponse(201, createdBlog, "Blog created successfully")
    );
});

// Update a blog (Admin only)
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, featuredImage, category, tags, seoTitle, seoDescription } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    // Update fields
    if (title) {
        blog.title = title;
        blog.slug = title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    if (content) {
        blog.content = content;
        // Recalculate read time
        const wordCount = content.split(' ').length;
        blog.readTime = Math.ceil(wordCount / 200);
    }

    if (excerpt) blog.excerpt = excerpt;
    if (featuredImage) blog.featuredImage = featuredImage;
    if (category) blog.category = category;
    if (tags) blog.tags = tags;
    if (seoTitle) blog.seoTitle = seoTitle;
    if (seoDescription) blog.seoDescription = seoDescription;

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, "Blog updated successfully")
    );
});

// Publish/Unpublish a blog (Admin only)
const toggleBlogStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be 'draft', 'published', or 'archived'");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    blog.status = status;
    if (status === 'published' && !blog.publishedAt) {
        blog.publishedAt = new Date();
    }

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, `Blog ${status} successfully`)
    );
});

// Delete a blog (Admin only)
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Blog deleted successfully")
    );
});

// Get all blogs (Public - with filters)
const getAllBlogs = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        category,
        search,
        status = 'published',
        sortBy = 'publishedAt',
        sortOrder = 'desc'
    } = req.query;

    const filter = {};

    // Only show published blogs for public access
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
        // Admin can see all statuses
        if (status) filter.status = status;
    } else {
        // Public can only see published blogs
        filter.status = 'published';
    }

    if (category) filter.category = category;

    if (search) {
        filter.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const blogs = await Blog.find(filter)
        .populate('author', 'name email')
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            blogs,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalBlogs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }, "Blogs retrieved successfully")
    );
});

// Get a single blog by slug (Public)
const getBlogBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).populate('author', 'name email image');

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    // Only allow access to published blogs for non-admin users
    if (blog.status !== 'published' && (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin'))) {
        throw new ApiError(404, "Blog not found");
    }

    // Increment views count
    blog.views += 1;
    await blog.save();

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog retrieved successfully")
    );
});

// Like/Unlike a blog (Authenticated users)
const toggleBlogLike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    if (blog.status !== 'published') {
        throw new ApiError(400, "Cannot like unpublished blog");
    }

    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
        blog.likes = blog.likes.filter(like => like.toString() !== userId.toString());
    } else {
        blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json(
        new ApiResponse(200, {
            liked: !hasLiked,
            likesCount: blog.likes.length
        }, hasLiked ? "Blog unliked" : "Blog liked")
    );
});

// Get blog categories (Public)
const getBlogCategories = asyncHandler(async (req, res) => {
    const categories = [
        { value: 'health', label: 'Health' },
        { value: 'wellness', label: 'Wellness' },
        { value: 'skincare', label: 'Skincare' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'nutrition', label: 'Nutrition' }
    ];

    return res.status(200).json(
        new ApiResponse(200, categories, "Blog categories retrieved successfully")
    );
});

// Get featured blogs (Public)
const getFeaturedBlogs = asyncHandler(async (req, res) => {
    const featuredBlogs = await Blog.find({
        status: 'published'
    })
        .populate('author', 'name email')
        .sort({ views: -1, publishedAt: -1 })
        .limit(6)
        .exec();

    return res.status(200).json(
        new ApiResponse(200, featuredBlogs, "Featured blogs retrieved successfully")
    );
});

export {
    createBlog,
    updateBlog,
    toggleBlogStatus,
    deleteBlog,
    getAllBlogs,
    getBlogBySlug,
    toggleBlogLike,
    getBlogCategories,
    getFeaturedBlogs
};
