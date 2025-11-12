import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, ThumbsUp, MessageSquare, Share2, ArrowRight } from "lucide-react"
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
}

interface BlogPostsListProps {
  posts: Post[]
}

export function BlogPostsList({ posts }: BlogPostsListProps) {
  return (
    <div className="lg:col-span-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-gray-100 p-1">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
              Todos
            </TabsTrigger>
            <TabsTrigger value="career" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
              Carreira
            </TabsTrigger>
            <TabsTrigger value="tech" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
              Tecnologia
            </TabsTrigger>
            <TabsTrigger value="market" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
              Mercado
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
              Lifestyle
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-8">
              {posts.map((post) => (
                <div key={post.id} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-50 text-primary hover:bg-blue-100">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <ThumbsUp className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Share2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="career" className="mt-0">
            <div className="space-y-8">
              {posts.filter(post => post.category === "Carreira").map((post) => (
                <div key={post.id} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-50 text-primary hover:bg-blue-100">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <ThumbsUp className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Share2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Conteúdo similar para as outras categorias (tech, market, lifestyle) */}
        </Tabs>
      </div>
      
      <div className="flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Carregar mais artigos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 