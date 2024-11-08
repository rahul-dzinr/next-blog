'use server'

import axios from 'axios'
const baseUrl = 'https://react30.onrender.com/api/user'

export async function getBlog(id: string) {
  try {
    const response = await axios.get(`${baseUrl}/blog/${id}`)
    return response.data.data
  } catch (error) {
    throw new Error('Failed to fetch blog')
  }
}

export async function updateBlog(id: string, data: any, token: string) {
  try {
    const response = await axios.patch(`${baseUrl}/blog/${id}`, data, {
      headers: {
        'Authorization': token
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to update blog')
  }
}

export async function getAllBlogs() {
  try {
    const response = await axios.get(`${baseUrl}/blog`)
    return response.data.data
  } catch (error) {
    throw new Error('Failed to fetch blogs')
  }
}

export async function createBlog(formData: FormData, token: string) {
  try {
    const response = await axios.post(`${baseUrl}/blog`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to create blog')
  }
} 

export async function deleteBlog(id: string, token: string) {
    try {
      const response = await axios.delete(`${baseUrl}/blog/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Failed to delete blog')
    }
  }