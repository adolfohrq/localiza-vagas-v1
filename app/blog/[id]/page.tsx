import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare, 
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Função para obter os dados do post com base no ID
function getPostData(id: string) {
  // Aqui você faria uma chamada para sua API ou banco de dados
  // Para este exemplo, estamos usando dados simulados
  
  const post = {
    id: "1",
    title: "Como se destacar em entrevistas remotas: Dicas de especialistas em RH",
    excerpt: "Aprenda técnicas eficazes para causar uma boa impressão em entrevistas online e aumentar suas chances de conseguir o emprego dos sonhos.",
    content: `
      <p>As entrevistas remotas se tornaram uma parte fundamental do processo de recrutamento moderno, especialmente após a pandemia de COVID-19. Muitas empresas descobriram os benefícios de conduzir entrevistas online, como economia de tempo e recursos, além da possibilidade de conectar-se com talentos de qualquer lugar do mundo.</p>
      
      <p>No entanto, entrevistas remotas apresentam desafios únicos tanto para candidatos quanto para recrutadores. A ausência de interação presencial pode dificultar a comunicação não verbal e a criação de rapport, elementos importantes em uma entrevista tradicional.</p>
      
      <h2>Preparando seu ambiente</h2>
      
      <p>Antes de mais nada, é essencial preparar adequadamente o ambiente onde você realizará a entrevista. Escolha um local tranquilo, bem iluminado e com um fundo neutro. Evite distrações visuais ou sonoras que possam desviar a atenção do entrevistador.</p>
      
      <p>Verifique sua conexão com a internet e teste a plataforma de videoconferência com antecedência. Familiarize-se com os controles básicos, como ativar/desativar o microfone e a câmera. Nada pior do que problemas técnicos durante uma entrevista importante!</p>
      
      <h2>Comunicação eficaz à distância</h2>
      
      <p>Em uma entrevista remota, a comunicação clara e eficaz torna-se ainda mais importante. Fale pausadamente, articule bem as palavras e mantenha contato visual olhando para a câmera (não para a tela). Isso cria uma sensação de conexão com o entrevistador.</p>
      
      <p>Preste atenção à sua linguagem corporal. Sente-se com postura ereta, evite movimentos bruscos ou excessivos e utilize gestos moderados para enfatizar pontos importantes. Lembre-se de que sua expressão facial é uma ferramenta poderosa de comunicação – sorria quando apropriado!</p>
      
      <h2>Demonstrando habilidades técnicas e comportamentais</h2>
      
      <p>Recrutadores estão cada vez mais atentos às habilidades específicas necessárias para o trabalho remoto. Prepare-se para demonstrar sua capacidade de organização, autodisciplina, comunicação escrita e verbal, além de proficiência em ferramentas digitais.</p>
      
      <p>Durante a entrevista, compartilhe exemplos concretos de como você se adaptou ao trabalho remoto ou como gerenciou projetos à distância. Histórias específicas são mais memoráveis e convincentes do que afirmações genéricas sobre suas habilidades.</p>
      
      <h2>Perguntas frequentes em entrevistas remotas</h2>
      
      <p>Além das perguntas tradicionais, esteja preparado para responder questões específicas sobre trabalho remoto, como:</p>
      
      <ul>
        <li>Como você organiza seu dia de trabalho em casa?</li>
        <li>Quais ferramentas digitais você utiliza para manter-se produtivo?</li>
        <li>Como você lida com distrações no ambiente doméstico?</li>
        <li>De que forma você mantém uma comunicação eficaz com colegas à distância?</li>
        <li>Como você estabelece limites entre vida pessoal e profissional quando trabalha de casa?</li>
      </ul>
      
      <h2>O follow-up pós-entrevista</h2>
      
      <p>Após a entrevista, envie um e-mail de agradecimento dentro de 24 horas. Mencione pontos específicos discutidos durante a conversa e reafirme seu interesse na posição. Este gesto simples pode diferenciar você de outros candidatos e demonstrar sua atenção aos detalhes e etiqueta profissional.</p>
      
      <p>Se você não receber resposta após uma semana, é apropriado enviar um e-mail de acompanhamento educado, perguntando sobre o status do processo seletivo.</p>
      
      <h2>Conclusão</h2>
      
      <p>As entrevistas remotas vieram para ficar, e dominar esta nova forma de interação profissional é essencial para se destacar no mercado de trabalho atual. Com preparação adequada, comunicação eficaz e demonstração das habilidades certas, você pode transformar a entrevista remota em uma oportunidade para brilhar.</p>
      
      <p>Lembre-se: a tecnologia pode mudar a forma como nos conectamos, mas os princípios fundamentais de uma entrevista bem-sucedida permanecem os mesmos – preparação, autenticidade e capacidade de demonstrar como você pode agregar valor à organização.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=1200",
    category: "Carreira",
    date: "10 de março de 2023",
    readTime: "8 min de leitura",
    author: {
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Especialista em RH",
      bio: "Ana Silva é especialista em Recursos Humanos com mais de 10 anos de experiência em recrutamento e seleção para empresas de tecnologia. Formada em Psicologia com especialização em Gestão de Pessoas, ela já conduziu mais de 2.000 entrevistas ao longo de sua carreira."
    },
    tags: ["Entrevistas", "Trabalho Remoto", "Carreira", "Dicas de RH", "Recrutamento"],
    relatedPosts: [
      {
        id: "2",
        title: "Como criar um currículo que passa pelos filtros de ATS",
        coverImage: "/placeholder.svg?height=300&width=500",
        category: "Currículo"
      },
      {
        id: "3",
        title: "Soft skills mais valorizadas pelas empresas em 2023",
        coverImage: "/placeholder.svg?height=300&width=500",
        category: "Desenvolvimento"
      },
      {
        id: "4",
        title: "Negociação salarial: Como pedir o que você merece",
        coverImage: "/placeholder.svg?height=300&width=500",
        category: "Carreira"
      }
    ]
  }
  
  return post
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getPostData(params.id)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 bg-gradient-to-br from-[#003495] to-[#007cfa]">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="container relative mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar para o Blog
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {post.category}
              </Badge>
              <div className="flex items-center text-blue-100">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4 border-2 border-white">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-sm text-blue-100">{post.author.role}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative -mt-10 container mx-auto px-4 mb-12">
          <div className="rounded-xl overflow-hidden shadow-xl max-h-[500px]">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 space-y-8">
                {/* Share Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold mb-4">Compartilhar</h3>
                  <div className="flex flex-col space-y-3">
                    <Button variant="outline" className="w-full justify-start border-blue-200 text-primary hover:bg-blue-50">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200 text-primary hover:bg-blue-50">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200 text-primary hover:bg-blue-50">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200 text-primary hover:bg-blue-50">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copiar Link
                    </Button>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50 text-primary hover:bg-blue-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold mb-4">Sobre o Autor</h3>
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{post.author.name}</h4>
                    <p className="text-sm text-primary mb-2">{post.author.role}</p>
                  </div>
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-primary hover:bg-blue-50">
                      <ThumbsUp className="h-4 w-4" />
                      Curtir
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-primary hover:bg-blue-50">
                      <Bookmark className="h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Facebook className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Twitter className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Linkedin className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Comentários (12)
                </h3>
                
                <div className="space-y-6">
                  {/* Comment Form */}
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-blue-500" 
                        rows={3} 
                        placeholder="Deixe seu comentário..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Comentar
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Sample Comments */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuário" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">João Dias</h4>
                          <span className="text-xs text-gray-500">2 dias atrás</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          Excelente artigo! As dicas sobre como se preparar para entrevistas remotas foram muito úteis. Estou me preparando para uma entrevista na próxima semana e vou aplicar essas técnicas.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center hover:text-primary">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Curtir (5)
                          </button>
                          <button className="flex items-center hover:text-primary">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuário" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">Maria Costa</h4>
                          <span className="text-xs text-gray-500">1 semana atrás</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          Adorei as dicas sobre comunicação eficaz à distância. Realmente faz toda a diferença manter o contato visual olhando para a câmera e não para a tela. Vou compartilhar com minha equipe!
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center hover:text-primary">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Curtir (3)
                          </button>
                          <button className="flex items-center hover:text-primary">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button variant="outline" className="border-blue-200 text-primary hover:bg-blue-50">
                      Ver mais comentários
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Artigos Relacionados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary hover:bg-primary/90 text-white">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex justify-end">
                        <span className="text-sm text-primary font-medium flex items-center">
                          Ler artigo
                          <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Receba nossos artigos em primeira mão</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Inscreva-se em nossa newsletter e receba conteúdos exclusivos sobre carreira, mercado de trabalho e dicas de recrutamento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                Inscrever-se
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 