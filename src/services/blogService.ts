import api from './api'; 

interface BlogCreatePayload {
  title: string;
  description: string;
  image: string; // base64 encoded image
  userId: number;
  categoryId?: number;
}

interface BlogUpdatePayload {
  title?: string;
  description?: string;
  image?: string;
  categoryId?: number;
}

// Fetch blog by ID
export const fetchBlogsById = async (id: string) => {
  try {
    const response = await api.get(`/api/blogs/${id}`); // Use Axios .get() instead of fetch
    return response.data; // Axios automatically returns the data in response
  } catch (error: any) {
    console.error("Error fetching blog:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await api.get('/api/blogs'); // Use Axios .get() instead of fetch
    return response.data; // Axios automatically returns the data in response
  } catch (error: any) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (blogData: BlogCreatePayload) => {
  try {
    const response = await api.post('/api/blogs/create', blogData); // Use Axios .post() instead of fetch
    return response.data; // Axios automatically returns the data in response
  } catch (error: any) {
    console.error("Error creating blog:", error.response?.data || error.message);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (id: number, updatedFields: BlogUpdatePayload) => {
  try {
    const response = await api.put(`/api/blogs/${id}`, updatedFields); // Use Axios .put() instead of fetch
    return response.data; // Axios automatically returns the data in response
  } catch (error: any) {
    console.error("Error updating blog:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id: number) => {
  try {
    const response = await api.delete(`/api/blogs/${id}`); // Use Axios .delete() instead of fetch
    return response.data; // Axios automatically returns the data in response
  } catch (error: any) {
    console.error("Error deleting blog:", error.response?.data || error.message);
    throw error;
  }
};
