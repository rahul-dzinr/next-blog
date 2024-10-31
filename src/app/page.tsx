'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from '@/components/blog-component/searchBar'
import BlogList from '@/components/blog-component/blogList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Menu } from 'lucide-react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#1e1e1e]">
      {/* macOS-like top bar */}
 

      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
            Welcome to BlogOS
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover, Create, and Share Amazing Stories
          </p>
        </header>

        <Card className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Blog Dashboard</CardTitle>
            <Link href="/blog/create">
              <Button size="sm" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Blog
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                <TabsTrigger value="all" className="rounded-full">All Posts</TabsTrigger>
                <TabsTrigger value="popular" className="rounded-full">Popular</TabsTrigger>
                <TabsTrigger value="recent" className="rounded-full">Recent</TabsTrigger>
                <TabsTrigger value="drafts" className="rounded-full">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="flex justify-end mb-4">
                  <SearchBar onSearch={setSearchTerm} />
                </div>
                <BlogList searchTerm={searchTerm} />
              </TabsContent>
              <TabsContent value="popular">
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Popular posts coming soon!</p>
              </TabsContent>
              <TabsContent value="recent">
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Recent posts coming soon!</p>
              </TabsContent>
              <TabsContent value="drafts">
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Drafts coming soon!</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}