'use client'

import { useState, useEffect, useCallback } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

async function getBlogPost(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100))
  return {
    id,
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content.',
  }
}

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      const post = await getBlogPost(resolvedParams.id)
      setTitle(post.title)
      setContent(post.content)
    }

    fetchBlog()
  }, [resolvedParams.id])

  const handleSubmit = useCallback(async (formData: FormData) => {
    try {
      // Simulate API call to update the blog post
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating:', { id: resolvedParams.id, title, content })
      router.push(`/blog/${resolvedParams.id}`)
    } catch (error) {
      console.error('Error updating blog post:', error)
    }
  }, [resolvedParams.id, title, content, router])

  return (
    <form action={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          required
          className="min-h-[300px]"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit">Update Post</Button>
      </div>
    </form>
  )
}