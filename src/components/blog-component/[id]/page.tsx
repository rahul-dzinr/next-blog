import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface BlogCardProps {
  _id: string
  title: string
  excerpt: string
  author: string
  date: string
}

export default function BlogCard({ _id, title, excerpt, author, date }: BlogCardProps) {
  return (
    <Link href={`/blog/${_id}`} className="block h-full">
        
      <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription>{author} - {new Date(date).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}