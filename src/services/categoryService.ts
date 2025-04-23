import api from './api'; 

interface CategoryCreatePayload {
  name: string;
}

interface CategoryUpdatePayload {
  name: string;
}

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get('/api/categories');
    return response.data;
  } catch (error: any) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData: CategoryCreatePayload) => {
  try {
    const response = await api.post('/api/categories', categoryData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating category:", error.response?.data || error.message);
    throw error;
  }
};

// Update a category
export const updateCategory = async (categoryId: number, updatedFields: CategoryUpdatePayload) => {
  try {
    const response = await api.put(`/api/categories/${categoryId}`, updatedFields);
    return response.data;
  } catch (error: any) {
    console.error("Error updating category:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await api.delete(`/api/categories/${categoryId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error;
  }
};
