'use client'

import { useEffect, useState, useMemo } from 'react'
import BlogCard from './[id]/page'
import { getAllBlogs } from '@/http/blog'

interface Blog {
  _id: string
  title: string
  description: string
  author: string
  date: string
}

export default function BlogList({ searchTerm = '' }: { searchTerm?: string }) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBlogs() {
      try {
        setIsLoading(true)
        const data = await getAllBlogs()
        setBlogs(data)
      } catch (err) {
        setError('Failed to fetch blogs')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
  }, [])

  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [blogs, searchTerm]
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog._id}
          _id={blog._id}
          title={blog.title}
          excerpt={blog.description}
          author={blog.author}
          date={blog.date}
        />
      ))}
    </div>
  )
}
