'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { baseUrl } from '../../../../../config'
import axios from 'axios'

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function EditBlog({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/blog/${id}`);
        const blog = response.data.data;
        setFormData({
          title: blog.title,
          description: blog.description,
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to fetch blog. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      await axios.patch(`${baseUrl}/blog/${id}`, formData, {
        headers: {
          'Authorization': token
        },
      });

      router.push(`/blog/${id}`);
    } catch (err) {
      let errorMessage = 'Failed to update blog post. Please try again.';
      
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Content</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter blog content"
          required
          className="min-h-[300px]"
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Post'}
        </Button>
      </div>
    </form>
  )
}