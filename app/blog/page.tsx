import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogHero } from "./_components/BlogHero"
import { FeaturedPosts } from "./_components/FeaturedPosts"
import { BlogMainContent } from "./_components/BlogMainContent"
import { BlogCTA } from "./_components/BlogCTA"
import { featuredPosts, recentPosts, categories, popularTags } from "./_data/blog-data"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow">
        <BlogHero />
        <FeaturedPosts posts={featuredPosts} />
        <BlogMainContent 
          posts={recentPosts} 
          categories={categories} 
          popularTags={popularTags} 
        />
        <BlogCTA />
      </main>

      <Footer />
    </div>
  )
} 