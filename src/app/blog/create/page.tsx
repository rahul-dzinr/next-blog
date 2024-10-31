'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import BlogForm from '@/components/blog-component/blog-form'

export default function CreateBlog() {
  const router = useRouter()

  const handleSubmit = useCallback(async (formData: FormData) => {
    // Here you would typically send the new blog data to your API
    console.log('New blog:', Object.fromEntries(formData))
    // Redirect to blog post or blog list page after successful creation
    router.push('/blogs')
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <BlogForm
        onSubmit={handleSubmit}
        submitButtonText="Publish"
      />
    </div>
  )
}