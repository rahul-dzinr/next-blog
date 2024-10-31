import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
}

export default function BlogCard({ title, excerpt, author, date }: BlogCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author} - {date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{excerpt}</p>
      </CardContent>
    </Card>
  )
}