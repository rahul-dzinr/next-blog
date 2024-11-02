'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface BlogFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  submitButtonText: string
}

export default function BlogForm({ onSubmit, submitButtonText }: BlogFormProps) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('') // Added subtitle state
  const [description, setDescription] = useState('') // Changed content to description
  const [category, setCategory] = useState('') // Added category state
  const [image, setImage] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target; // Get the event target
    if (target.files && target.files.length > 0) {
      setImage(target.files[0]); // Set the first file if it exists
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle) // Append subtitle
    formData.append('description', description) // Append description
    formData.append('category', category) // Append category
    if (image) {
      formData.append('image', image) // Append the image if it exists
    }
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Subtitle
        </label>
        <Input
          id="subtitle"
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)} // Handle subtitle change
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Handle description change
          required
          className="mt-1"
          rows={10}
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Category
        </label>
        <Input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Handle category change
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Image
        </label>
        <Input
          id="image"
          type="file"
          accept="image/*" // Optional: restrict to image types
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  )
}
