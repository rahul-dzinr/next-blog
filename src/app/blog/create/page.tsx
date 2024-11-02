'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateBlog() {
  const router = useRouter()

  const [data, setData] = useState({
    title: '',
    subtitle: '', // New subtitle field
    description: '',
    category: '',
    image: null as File | null
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle file input separately
    if (name === 'image' && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files && files.length > 0) {
        setData(prevData => ({
          ...prevData,
          image: files[0]
        }));
      }
    } else {
      // Handle other inputs
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle); // Append subtitle
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
       
        router.push('/auth/login');
        return;
      }

      const response = await axios.post(`${baseUrl}/blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
      });

      console.log('New blog created:', response.data);
      router.push('/');
    } catch (err) {
      let errorMessage = 'Failed to create blog post. Please try again.';
      
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error('Error creating blog:', err);
    } finally {
      setIsLoading(false);
    }
  }, [router, data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-3xl w-full px-6 py-12 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-center">Create Blog</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Blog Title
            </Label>
            <Input
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter blog title"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="subtitle" className="text-sm font-medium">
              Blog Subtitle
            </Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={data.subtitle}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter blog subtitle"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Blog Content
            </Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter blog content"
              rows={8}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="image" className="text-sm font-medium">
              Featured Image
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="image" 
                      name="image" 
                      type="file" 
                      className="sr-only"
                      disabled={isLoading}
                      onChange={handleChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              category
            </Label>
            <Input
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter category separated by commas"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
