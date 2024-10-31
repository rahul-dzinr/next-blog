import { use } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

async function getPost(id: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return {
    id,
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content.',
    author: 'John Doe',
    date: '2023-05-01',
  }
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const post = use(getPost(resolvedParams.id))

  return (
    <article className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">By {post.author} on {post.date}</p>
      <div className="prose dark:prose-invert mb-6">
        <p>{post.content}</p>
      </div>
      <Link href={`/blog/${post.id}/edit`}>
        <Button>Edit Post</Button>
      </Link>
    </article>
  )
}