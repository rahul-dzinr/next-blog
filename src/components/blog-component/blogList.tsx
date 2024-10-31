import Link from 'next/link'
import BlogCard from './blogCard'

// This would typically come from your API or database
const sampleBlogs = [
  { id: '1', title: 'First Blog Post', excerpt: 'This is the first blog post.', author: 'John Doe', date: '2023-05-01' },
  { id: '2', title: 'Second Blog Post', excerpt: 'This is the second blog post.', author: 'Jane Smith', date: '2023-05-02' },
  // Add more sample blogs as needed
]

export default function BlogList({ searchTerm }: { searchTerm: string }) {
  const filteredBlogs = sampleBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredBlogs.map(blog => (
        <Link key={blog.id} href={`/blog/${blog.id}`}>
          <BlogCard {...blog} />
        </Link>
      ))}
    </div>
  )
}