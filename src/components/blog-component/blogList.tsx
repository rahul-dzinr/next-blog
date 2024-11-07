import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import BlogCard from './[id]/page';

const baseUrl = 'https://react30.onrender.com/api/user';

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function BlogList({ searchTerm = '' }: { searchTerm?: string }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/blog`);
        setBlogs(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [blogs, searchTerm]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog._id}
          _id={blog._id}
          title={blog.title}
          excerpt={blog.description} // Using 'description' as excerpt
          author={blog.author}
          date={blog.date}
        />
      ))}
    </div>
  );
}
