'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { deleteBlog, getBlog } from '@/http/blog'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Blog {
  _id: string
  title: string
  description: string
  author: string
  date: string
}

export default function SingleBlog({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function loadBlog() {
      try {
        setIsLoading(true)
        const data = await getBlog(id)
        setBlog(data)
      } catch (err) {
        setError('Failed to fetch blog')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlog()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      setIsDeleting(true)
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/login')
        return
      }

      await deleteBlog(id, token)
      router.push('/')
      router.refresh()
    } catch (err) {
      setError('Failed to delete blog')
      setIsDeleting(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!blog) return <div>No blog found.</div>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">
        {blog.author} - {new Date(blog.date).toLocaleDateString()}
      </p>
      <p className="mt-4">{blog.description}</p>
      <div className="mt-6 space-x-4">
        <Link href={`/blog/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  )
}