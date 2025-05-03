import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchProducts = async (limit = 0) => {
  try {
    const url = limit > 0 ? `/products?limit=${limit}` : '/products'
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    throw error
  }
}

export const fetchUserCart = async (userId) => {
  try {
    const response = await api.get(`/carts?userId=${userId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error)
    throw error
  }
}

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export default api