import axios from "axios";
import { getApiUrl } from '../utils/apiUtils';

// Public blog services
export const getAllBlogs = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await axios.get(`${getApiUrl()}/api/v1/blog?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getBlogBySlug = async (slug) => {
    try {
        const response = await axios.get(`${getApiUrl()}/api/v1/blog/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getFeaturedBlogs = async () => {
    try {
        const response = await axios.get(`${getApiUrl()}/api/v1/blog/featured`);
        return response.data;
    } catch (error) {
        console.error("Error fetching featured blogs:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getBlogCategories = async () => {
    try {
        const response = await axios.get(`${getApiUrl()}/api/v1/blog/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog categories:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

// Authenticated user services
export const likeBlog = async (blogId) => {
    try {
        const response = await axios.post(
            `${getApiUrl()}/api/v1/blog/${blogId}/like`,
            {},
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error liking blog:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

// Admin only services
export const createBlog = async (blogData) => {
    try {
        const formData = new FormData();

        // Append text fields
        Object.keys(blogData).forEach(key => {
            if (key === 'tags' && Array.isArray(blogData[key])) {
                blogData[key].forEach(tag => formData.append('tags', tag));
            } else if (key !== 'featuredImage') {
                formData.append(key, blogData[key]);
            }
        });

        // Append file if exists
        if (blogData.featuredImage) {
            formData.append('featuredImage', blogData.featuredImage);
        }

        const response = await axios.post(
            `${getApiUrl()}/api/v1/blog/create`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const updateBlog = async (blogId, blogData) => {
    try {
        const formData = new FormData();

        // Append text fields
        Object.keys(blogData).forEach(key => {
            if (key === 'tags' && Array.isArray(blogData[key])) {
                blogData[key].forEach(tag => formData.append('tags', tag));
            } else if (key !== 'featuredImage') {
                formData.append(key, blogData[key]);
            }
        });

        // Append file if exists
        if (blogData.featuredImage && typeof blogData.featuredImage !== 'string') {
            formData.append('featuredImage', blogData.featuredImage);
        }

        const response = await axios.put(
            `${getApiUrl()}/api/v1/blog/${blogId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const toggleBlogStatus = async (blogId, status) => {
    try {
        const response = await axios.patch(
            `${getApiUrl()}/api/v1/blog/${blogId}/status`,
            { status },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating blog status:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await axios.delete(
            `${getApiUrl()}/api/v1/blog/${blogId}`,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};
