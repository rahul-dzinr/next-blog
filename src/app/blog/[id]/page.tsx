// src/app/blog/[id]/page.tsx

'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://react30.onrender.com/api/user';

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function SingleBlog({ params }: { params: { id: string } }) {
  const { id } = params; // Accessing ID directly from params
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Log the ID to the console
  console.log('Blog ID:', id);

  useEffect(() => {
    if (!id) return; // Wait until ID is available

    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching blog with ID:', id); // Log when fetching
        const response = await axios.get(`${baseUrl}/blog/${id}`);
        setBlog(response.data.data);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!blog) return <div>No blog found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
      <p className="mt-4">{blog.description}</p>
    </div>
  );
}