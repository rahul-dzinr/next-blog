'use client'

import { useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Update the interface to match the Blog type
interface Blog {
  title: string
  content: string
  image: File | null
  tags: string
}

interface BlogFormProps {
  initialData?: Blog
  onSubmit: (formData: FormData) => void
  submitButtonText: string
}

export default function BlogForm({ initialData, onSubmit, submitButtonText }: BlogFormProps) {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit(formData)
  }, [onSubmit])

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">{submitButtonText} Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Blog Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={8}
              defaultValue={initialData?.content}
              placeholder="Enter blog content"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={initialData?.tags}
              placeholder="Enter tags separated by commas"
            />
          </div>
          <CardFooter className="px-0">
            <Button type="submit" className="w-full">
              {submitButtonText}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}