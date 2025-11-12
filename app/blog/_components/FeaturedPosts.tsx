import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">Em Destaque</Badge>
          <h2 className="text-3xl font-bold mb-4">Artigos em Destaque</h2>
          <p className="text-gray-600 max-w-2xl">
            Conteúdo selecionado pelos nossos editores para ajudar você a se manter atualizado sobre o mundo do trabalho
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-100 h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={post.coverImage} 
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary hover:bg-primary/90 text-white">
                  {post.category}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl hover:text-primary transition-colors">
                <Link href={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-primary" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-gray-100 mt-auto">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8">
                  <Bookmark className="h-4 w-4 text-gray-500 hover:text-primary" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
} 