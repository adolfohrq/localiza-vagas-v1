import { BlogPostsList } from "./BlogPostsList"
import { BlogSidebar } from "./BlogSidebar"
import { LucideIcon } from "lucide-react"

interface Author {
  name: string
  avatar: string
  role: string
}

interface Post {
  id: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  date: string
  readTime: string
  author: Author
  featured?: boolean
}

interface Category {
  name: string
  icon: LucideIcon
  count: number
}

interface BlogMainContentProps {
  posts: Post[]
  categories: Category[]
  popularTags: string[]
}

export function BlogMainContent({ posts, categories, popularTags }: BlogMainContentProps) {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <BlogPostsList posts={posts} />
          <BlogSidebar categories={categories} popularTags={popularTags} />
        </div>
      </div>
    </section>
  )
} 