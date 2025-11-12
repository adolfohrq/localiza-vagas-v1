"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Filter, Search, AlertCircle, CheckCircle, Clock, FileText, BarChart, Settings, 
  HelpCircle, BookOpen, Calendar, Award, MessageSquare, Briefcase, FileCheck, Upload, 
  Star, StarOff, Eye, ThumbsUp, Share, History, Bookmark, BookmarkCheck, ArrowUpRight, 
  ChevronRight, MessageCircle
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

// Se existir um tipo ou interface para os tickets, adicione os campos para última resposta
interface Ticket {
  id: string;
  title: string;
  status: string;
  category: string;
  date: string; // data de criação
  createdTime: string; // hora de criação
  lastResponseDate: string;
  lastResponseTime: string;
  lastResponseBy: "Equipe" | "Você";
  // ... outros campos existentes
}

export default function SupportPage() {
  const router = useRouter()
  const [faqs, setFaqs] = useState([
    {
      question: "Como atualizar meu currículo?",
      answer:
        "Para atualizar seu currículo, acesse a seção 'Meu Currículo' no menu lateral do dashboard. Lá você poderá editar todas as informações como experiências, formação acadêmica e habilidades.",
    },
    {
      question: "Como me candidatar a uma vaga?",
      answer:
        "Para se candidatar a uma vaga, navegue até a página de detalhes da vaga desejada e clique no botão 'Candidatar-se'. Revise suas informações e confirme sua candidatura.",
    },
    {
      question: "Como acompanhar minhas candidaturas?",
      answer:
        "Você pode acompanhar suas candidaturas na seção 'Minhas Candidaturas'. Lá você encontrará o status de cada uma delas e poderá verificar o progresso do processo seletivo.",
    },
    {
      question: "Como alterar configurações de privacidade?",
      answer:
        "Acesse a seção 'Configurações' no menu lateral. Lá você poderá ajustar suas preferências de privacidade, visibilidade do perfil e notificações.",
    },
  ])

  // Base de conhecimento - categorias e artigos
  const [knowledgeBaseCategories] = useState([
    {
      id: "primeiros-passos",
      title: "Primeiros Passos",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      description: "Guias de introdução à plataforma para novos candidatos"
    },
    {
      id: "curriculo",
      title: "Meu Currículo",
      icon: <FileCheck className="h-5 w-5 text-green-500" />,
      description: "Como criar e otimizar seu currículo para atrair recrutadores"
    },
    {
      id: "candidaturas",
      title: "Candidaturas",
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      description: "Gerenciamento e acompanhamento de suas candidaturas"
    },
    {
      id: "entrevistas",
      title: "Entrevistas",
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      description: "Dicas e preparação para entrevistas de emprego"
    },
    {
      id: "mensagens",
      title: "Mensagens",
      icon: <MessageSquare className="h-5 w-5 text-cyan-500" />,
      description: "Como se comunicar com recrutadores e empresas"
    },
    {
      id: "conquistas",
      title: "Conquistas",
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      description: "Melhorando seu perfil com conquistas e certificações"
    }
  ])

  const [knowledgeBaseArticles] = useState([
    // Primeiros Passos
    {
      id: "1",
      categoryId: "primeiros-passos",
      title: "Como começar a usar a plataforma",
      description: "Um guia completo para novos usuários",
      content: `
        <h2 class="text-2xl font-bold text-primary mb-4">Bem-vindo à LocalizaVagas!</h2>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p class="font-medium">Este guia passo a passo ajudará você a começar a usar nossa plataforma da maneira mais eficiente, garantindo que você aproveite todos os recursos disponíveis para encontrar a vaga dos seus sonhos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Complete seu perfil — A primeira impressão é a que fica</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Um perfil completo é sua vitrine profissional e aumenta significativamente suas chances de ser notado:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Informações pessoais</strong>: Adicione dados de contato atualizados e uma foto profissional recente (perfis com fotos recebem até 40% mais visualizações).</li>
            <li><strong>Histórico profissional</strong>: Detalhe suas experiências anteriores com foco em resultados e conquistas mensuráveis.</li>
            <li><strong>Formação acadêmica</strong>: Inclua cursos, especializações e certificações que demonstrem seu conhecimento técnico.</li>
            <li><strong>Habilidades-chave</strong>: Liste competências técnicas e comportamentais relevantes para sua área de atuação.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Atualize seu perfil regularmente. Recrutadores valorizam candidatos que mantêm suas informações em dia.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Crie seu currículo otimizado para recrutadores</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Nosso sistema inteligente ajuda você a criar um currículo que realmente se destaca:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Use o assistente de currículo</strong>: Nossa ferramenta guiará você na criação de um documento profissional e completo.</li>
            <li><strong>Destaque conquistas</strong>: Quantifique seus resultados sempre que possível (ex: "Aumentei as vendas em 25%").</li>
            <li><strong>Palavras-chave estratégicas</strong>: Inclua termos relevantes da sua área para otimizar a visibilidade nos sistemas de triagem.</li>
            <li><strong>Versões múltiplas</strong>: Crie diferentes versões do seu currículo para diferentes tipos de vagas.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Mantenha seu currículo com no máximo 2 páginas. Recrutadores gastam em média apenas 7 segundos na primeira triagem.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Configure suas preferências de busca</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Personalize sua experiência para receber recomendações mais precisas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Áreas de interesse</strong>: Selecione os setores e cargos que mais combinam com seu perfil.</li>
            <li><strong>Localização</strong>: Defina regiões preferidas e distância máxima que está disposto a se deslocar.</li>
            <li><strong>Modalidade de trabalho</strong>: Especifique se busca vagas presenciais, híbridas ou totalmente remotas.</li>
            <li><strong>Faixa salarial</strong>: Estabeleça suas expectativas financeiras para filtrar oportunidades compatíveis.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Quanto mais específicas forem suas preferências, mais relevantes serão as vagas recomendadas pelo sistema.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Explore as vagas disponíveis</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Utilize os recursos avançados de busca para encontrar as melhores oportunidades:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Filtros inteligentes</strong>: Refine sua busca por critérios como data de publicação, requisitos, tamanho da empresa, etc.</li>
            <li><strong>Salve buscas</strong>: Crie e salve filtros personalizados para acessar rapidamente em consultas futuras.</li>
            <li><strong>Pesquisa por empresas</strong>: Acompanhe vagas de organizações específicas que deseja trabalhar.</li>
            <li><strong>Análise de compatibilidade</strong>: Visualize o percentual de compatibilidade entre seu perfil e os requisitos da vaga.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Verifique novas vagas diariamente. As melhores oportunidades costumam ser preenchidas rapidamente.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Ative e gerencie suas notificações</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Configure o sistema de alertas para não perder nenhuma oportunidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Alertas de novas vagas</strong>: Receba notificações quando surgirem oportunidades alinhadas ao seu perfil.</li>
            <li><strong>Prazo de candidaturas</strong>: Seja avisado sobre processos seletivos prestes a encerrar.</li>
            <li><strong>Atualizações de status</strong>: Acompanhe mudanças nos processos seletivos que você já está participando.</li>
            <li><strong>Mensagens de recrutadores</strong>: Seja notificado quando receber contato de empresas interessadas.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Personalize os canais de notificação (e-mail, push, SMS) nas configurações da sua conta para garantir que você receba as informações no momento certo e da forma que preferir.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Próximos passos e recursos adicionais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Conforme você se familiariza com a plataforma, explore estes recursos avançados:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Teste de compatibilidade de perfil</strong>: Descubra quais áreas profissionais combinam mais com suas habilidades e aspirações.</li>
            <li><strong>Comunidade de candidatos</strong>: Conecte-se com outros profissionais e troque experiências valiosas.</li>
            <li><strong>Cursos e webinars</strong>: Acesse nosso catálogo de conteúdos para desenvolvimento profissional.</li>
            <li><strong>Central de preparação para entrevistas</strong>: Pratique com simulações e receba dicas personalizadas.</li>
          </ul>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Lembre-se:</h4>
          <p class="mb-4">Quanto mais completo e atualizado estiver seu perfil, maiores são suas chances de encontrar a vaga ideal. Nossa plataforma usa inteligência artificial para conectar os melhores talentos às oportunidades mais adequadas.</p>
          <p class="font-medium">Comece agora mesmo atualizando seu perfil e explorando as vagas disponíveis. Estamos aqui para ajudar você em cada etapa da sua jornada profissional!</p>
        </div>
      `,
      date: "2023-09-10"
    },
    {
      id: "2",
      categoryId: "primeiros-passos",
      title: "Configurando seu perfil para máxima visibilidade",
      description: "Dicas para aumentar a visibilidade do seu perfil para recrutadores",
      content: `
        <h2 class="text-2xl font-bold text-primary mb-4">Destaque-se para os recrutadores!</h2>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p class="font-medium">Recrutadores utilizam algoritmos sofisticados e filtros avançados para identificar candidatos ideais. Este guia ajudará você a otimizar seu perfil para ser encontrado pelos melhores recrutadores e empresas.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Foto profissional — A janela para sua personalidade</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Uma foto adequada aumenta drasticamente suas chances de ser notado:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Escolha uma foto recente</strong>: Utilize uma imagem que represente fielmente sua aparência atual.</li>
            <li><strong>Fundo neutro</strong>: Opte por fundos simples que não distraiam a atenção do recrutador.</li>
            <li><strong>Vestuário adequado</strong>: Vista-se de acordo com a cultura da indústria em que deseja trabalhar.</li>
            <li><strong>Expressão amigável</strong>: Um sorriso natural transmite confiança e aproxima recrutadores.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Dado importante:</strong> Perfis com fotos profissionais recebem até 14 vezes mais visualizações do que perfis sem foto ou com imagens inadequadas.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Palavras-chave estratégicas — Seja encontrado pelo algoritmo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Sistemas de recrutamento frequentemente filtram candidatos por termos específicos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Pesquise palavras-chave da sua área</strong>: Identifique termos técnicos e competências mais buscados no seu setor.</li>
            <li><strong>Analise descrições de vagas</strong>: Incorpore termos recorrentes de vagas similares às que você almeja.</li>
            <li><strong>Distribua estrategicamente</strong>: Inclua palavras-chave no resumo, experiências e habilidades de forma natural.</li>
            <li><strong>Evite excessos</strong>: O acúmulo artificial de palavras-chave pode ser interpretado como spam pelos sistemas.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Utilize 10-15 palavras-chave relevantes distribuídas naturalmente pelo seu perfil, priorizando competências técnicas específicas da sua área.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Atualizações regulares — Mantenha seu perfil ativo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Perfis atualizados recebem prioridade nos algoritmos de busca:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Revise mensalmente</strong>: Dedique um tempo regular para atualizar seu perfil com novas conquistas.</li>
            <li><strong>Adicione novas competências</strong>: Inclua habilidades recém-adquiridas ou certificações concluídas.</li>
            <li><strong>Refine sua descrição</strong>: Aperfeiçoe continuamente seu resumo profissional para destacar sua evolução.</li>
            <li><strong>Quantifique resultados</strong>: Atualize suas experiências com métricas e resultados alcançados recentemente.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Os algoritmos da plataforma favorecem perfis que demonstram atividade constante. Um perfil atualizado recentemente tem até 70% mais chances de aparecer nos resultados de busca dos recrutadores.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Conexões estratégicas — Amplie sua rede profissional</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Conexões com empresas aumentam sua visibilidade e oportunidades:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Siga empresas-alvo</strong>: Acompanhe organizações onde gostaria de trabalhar para receber atualizações sobre vagas.</li>
            <li><strong>Interaja com publicações</strong>: Comente e compartilhe conteúdos relevantes para aumentar sua visibilidade.</li>
            <li><strong>Participe de grupos do setor</strong>: Envolva-se em comunidades relacionadas à sua área de atuação.</li>
            <li><strong>Conecte-se com recrutadores</strong>: Estabeleça contato profissional com especialistas em recrutamento da sua área.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Ao seguir uma empresa, configure alertas para ser notificado imediatamente quando novas vagas compatíveis com seu perfil forem publicadas.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Configurações de privacidade — Encontre o equilíbrio ideal</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Ajuste suas configurações para maximizar exposição aos recrutadores:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Perfil público para recrutadores</strong>: Garanta que profissionais de RH possam ver seu perfil completo.</li>
            <li><strong>Controle dados sensíveis</strong>: Escolha quais informações pessoais ficam visíveis para diferentes grupos.</li>
            <li><strong>Gerencie notificações</strong>: Configure quem pode entrar em contato com você e como será notificado.</li>
            <li><strong>Histórico de busca</strong>: Decida se empresas podem ver que você visitou suas páginas.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Verifique se a opção "Visível para Recrutadores" está ativada nas configurações de privacidade. Muitos candidatos perdem oportunidades por terem esta opção desativada.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Ative o sinalizador "Aberto a oportunidades"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Um recurso poderoso que aumenta significativamente suas chances:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Visibilidade exclusiva</strong>: Esta opção torna seu perfil prioritário nas buscas de recrutadores.</li>
            <li><strong>Configurações personalizadas</strong>: Especifique tipos de vagas, localizações e modalidades de trabalho de interesse.</li>
            <li><strong>Discrição garantida</strong>: Você pode configurar para que sua empresa atual não veja que está aberto a novas oportunidades.</li>
            <li><strong>Ajuste de disponibilidade</strong>: Indique se está buscando ativamente, casualmente ou apenas explorando possibilidades.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Candidatos com o status "Aberto a oportunidades" ativado recebem, em média, 2,5 vezes mais mensagens de recrutadores do que aqueles sem esta configuração.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Resultados que você pode esperar:</h4>
          <p class="mb-4">Ao implementar todas estas práticas, nossos usuários relatam um aumento médio de 300% nas visualizações de perfil e 180% mais convites para entrevistas em apenas três meses.</p>
          <p class="font-medium">Dedique tempo para otimizar seu perfil seguindo estas diretrizes, e você estará significativamente à frente de outros candidatos na busca por oportunidades profissionais de qualidade.</p>
        </div>
      `,
      date: "2023-09-15"
    },
    // Currículo
    {
      id: "3",
      categoryId: "curriculo",
      title: "Como criar um currículo que se destaca",
      description: "Técnicas comprovadas para criar um currículo eficiente",
      content: `
        <h2 class="text-2xl font-bold text-primary mb-4">O currículo perfeito em 5 passos</h2>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p class="font-medium">Um currículo bem elaborado é sua primeira impressão com o recrutador e pode ser determinante para o sucesso da sua candidatura. Este guia apresenta técnicas comprovadas para criar um documento que realmente se destaca na pilha de candidaturas.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Seja conciso e direto — Menos é mais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Recrutadores avaliam inicialmente um currículo em poucos segundos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Limite a extensão</strong>: Mantenha seu currículo em uma ou duas páginas no máximo, priorizando informações relevantes.</li>
            <li><strong>Estrutura clara</strong>: Organize o conteúdo em seções bem definidas com espaçamento adequado.</li>
            <li><strong>Frases objetivas</strong>: Utilize linguagem direta e evite parágrafos longos ou explicações demasiadas.</li>
            <li><strong>Fonte adequada</strong>: Escolha uma tipografia profissional e legível (Arial, Calibri ou Helvetica são boas opções).</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Dado importante:</strong> Recrutadores gastam em média apenas 7 segundos na primeira triagem de currículos. Um layout limpo e informações bem organizadas são essenciais para passar neste primeiro filtro.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Destaque conquistas, não apenas responsabilidades</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Resultados concretos impressionam mais que descrições de funções:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Quantifique resultados</strong>: Sempre que possível, use números para demonstrar seu impacto (ex: "Aumentei as vendas em 25%" em vez de "Responsável por aumentar vendas").</li>
            <li><strong>Use a fórmula PAR</strong>: Para cada conquista importante, descreva o Problema enfrentado, a Ação que você tomou e o Resultado alcançado.</li>
            <li><strong>Destaque reconhecimentos</strong>: Mencione prêmios, elogios ou promoções recebidas como evidência do seu desempenho.</li>
            <li><strong>Foque em benefícios</strong>: Explique como suas ações geraram valor para a empresa (economia, eficiência, satisfação de clientes).</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Mantenha um "diário de conquistas" onde você registra regularmente seus resultados no trabalho, incluindo métricas específicas, para facilitar a atualização do seu currículo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Personalize para cada vaga — Evite currículos genéricos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Um currículo adaptado tem muito mais chances de sucesso:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Analise a descrição da vaga</strong>: Identifique requisitos, habilidades e experiências mais valorizadas pelo empregador.</li>
            <li><strong>Ajuste suas experiências</strong>: Destaque aspectos da sua trajetória que sejam mais relevantes para a posição específica.</li>
            <li><strong>Adapte seu resumo profissional</strong>: Modifique este primeiro parágrafo para mostrar alinhamento com as necessidades da empresa.</li>
            <li><strong>Reorganize seções</strong>: Coloque as informações mais relevantes para a vaga em destaque no documento.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Estudos mostram que currículos personalizados têm uma taxa de resposta até 3 vezes maior que currículos genéricos. Em nossa plataforma, você pode salvar múltiplas versões do seu currículo para diferentes tipos de vagas.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Otimize para sistemas ATS — Seja encontrado pelos algoritmos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Muitas empresas usam sistemas ATS (Applicant Tracking System) para filtrar currículos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Utilize palavras-chave da vaga</strong>: Inclua termos e habilidades mencionados na descrição da posição.</li>
            <li><strong>Mantenha formato simples</strong>: Evite tabelas, cabeçalhos, rodapés ou elementos gráficos complexos.</li>
            <li><strong>Nomeie as seções claramente</strong>: Use títulos padrão como "Experiência Profissional", "Formação Acadêmica" e "Habilidades".</li>
            <li><strong>Escolha formatos compatíveis</strong>: Salve seu currículo em formatos universais como .docx ou .pdf (texto pesquisável).</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Nossa ferramenta de análise de currículo verifica a compatibilidade com sistemas ATS e sugere otimizações para aumentar suas chances de passar pelos filtros automatizados.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Revise cuidadosamente — Elimine erros e inconsistências</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Erros gramaticais ou inconsistências podem desqualificar candidatos qualificados:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Verifique a ortografia</strong>: Utilize corretores ortográficos e releia várias vezes para identificar erros.</li>
            <li><strong>Mantenha consistência visual</strong>: Use o mesmo estilo de formatação, fonte e espaçamento em todo o documento.</li>
            <li><strong>Confirme datas e informações</strong>: Verifique se não há discrepâncias nas datas ou informações apresentadas.</li>
            <li><strong>Peça feedback externo</strong>: Solicite que um colega ou mentor revise seu currículo para uma perspectiva diferente.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Impacto dos erros:</strong> De acordo com pesquisas, 77% dos recrutadores desclassificam candidatos por erros de ortografia ou gramática no currículo, independentemente da qualificação técnica.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Elementos essenciais de um currículo eficaz</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Certifique-se de incluir estas seções fundamentais:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Informações de contato atualizadas</strong>: Nome completo, telefone, e-mail profissional e LinkedIn.</li>
            <li><strong>Resumo profissional impactante</strong>: 3-4 linhas que sintetizam sua experiência, competências e objetivos.</li>
            <li><strong>Experiência profissional relevante</strong>: Foco em posições relacionadas à vaga pretendida, em ordem cronológica reversa.</li>
            <li><strong>Formação acadêmica</strong>: Diplomas, certificações e cursos relevantes com as respectivas instituições e datas.</li>
            <li><strong>Habilidades técnicas e comportamentais</strong>: Lista organizada de competências específicas, priorizando as mais relevantes.</li>
            <li><strong>Idiomas e certificações</strong>: Nível de proficiência em idiomas e certificações profissionais que agreguem valor.</li>
          </ul>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Para se destacar ainda mais:</h4>
          <p class="mb-4">Em nossa plataforma, você pode criar diferentes versões do seu currículo para diferentes tipos de vagas, aumentando suas chances de sucesso. Utilize nossa ferramenta de análise para receber feedback personalizado sobre pontos de melhoria em seu documento.</p>
          <p class="font-medium">Lembre-se: seu currículo é seu bilhete de entrada para a entrevista. Invista tempo para aperfeiçoá-lo e aumentar significativamente suas chances de conquistar a vaga desejada.</p>
        </div>
      `,
      date: "2023-09-20"
    },
    {
      id: "4",
      categoryId: "curriculo",
      title: "Como adicionar certificações e aumentar seu valor profissional",
      description: "Guia para destacar suas certificações e formações complementares",
      content: `
        <h2 class="text-2xl font-bold text-primary mb-4">Valorizando suas certificações</h2>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p class="font-medium">Certificações profissionais demonstram seu compromisso com aprendizado contínuo e podem ser o diferencial decisivo em processos seletivos competitivos. Este guia mostrará como apresentar e aproveitar suas certificações estrategicamente para aumentar seu valor no mercado de trabalho.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Priorize certificações relevantes — Qualidade sobre quantidade</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Nem todas as certificações têm o mesmo peso para cada oportunidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Alinhamento com a carreira</strong>: Destaque certificações diretamente relacionadas à vaga ou indústria que você almeja.</li>
            <li><strong>Reconhecimento no mercado</strong>: Priorize certificações emitidas por instituições ou empresas de renome no seu setor.</li>
            <li><strong>Atualidade do conteúdo</strong>: Dê preferência a certificações recentes ou que abordem tecnologias e metodologias atuais.</li>
            <li><strong>Progressão lógica</strong>: Demonstre evolução com certificações que mostrem aprofundamento crescente em determinada área.</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Pesquise quais certificações são mais valorizadas em vagas do seu interesse analisando descrições de posições abertas e requisitos frequentemente solicitados.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Inclua detalhes importantes — Contextualize suas conquistas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Forneça informações completas sobre cada certificação para dar credibilidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Nome oficial da certificação</strong>: Utilize a nomenclatura exata para facilitar a verificação pelo recrutador.</li>
            <li><strong>Instituição emissora</strong>: Informe a organização que concedeu o certificado, especialmente se for reconhecida no mercado.</li>
            <li><strong>Data de obtenção</strong>: Indique quando a certificação foi conquistada para demonstrar conhecimento atual.</li>
            <li><strong>Validade</strong>: Se aplicável, esclareça o período de validade e status de renovação da certificação.</li>
            <li><strong>Código ou ID de verificação</strong>: Quando disponível, inclua informações que permitam a validação da certificação.</li>
            <li><strong>Habilidades adquiridas</strong>: Resuma brevemente as competências principais desenvolvidas com a certificação.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Certificações falsas ou exageradas são facilmente verificáveis e podem resultar em desqualificação imediata do processo seletivo e danos permanentes à sua reputação profissional.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Organize por relevância — Facilite a leitura para recrutadores</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">A ordem de apresentação das certificações impacta a percepção do recrutador:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Agrupamento estratégico</strong>: Organize certificações por área de conhecimento ou relevância para a vaga.</li>
            <li><strong>Destaque para certificações premium</strong>: Posicione certificações de maior prestígio ou mais difíceis de obter no início da lista.</li>
            <li><strong>Ordem cronológica inversa</strong>: Dentro de cada categoria, liste as certificações mais recentes primeiro.</li>
            <li><strong>Separação clara</strong>: Diferencie visualmente certificações formais de cursos livres ou treinamentos corporativos.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Em nossa plataforma, você pode criar categorias personalizadas para suas certificações, facilitando para os recrutadores identificarem rapidamente suas competências em áreas específicas.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Adicione certificados digitais — Comprove suas credenciais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Evidências visuais aumentam a credibilidade do seu perfil:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Upload de documentos</strong>: Faça o upload dos certificados digitais ou badges para validação rápida.</li>
            <li><strong>Links para credenciais</strong>: Inclua URLs de páginas oficiais onde suas certificações podem ser verificadas.</li>
            <li><strong>Portfólio de projetos</strong>: Quando aplicável, conecte certificações a projetos reais onde aplicou as habilidades adquiridas.</li>
            <li><strong>Badges digitais</strong>: Integre badges verificáveis de plataformas como LinkedIn, Credly ou Accredible.</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Mantenha uma pasta digital organizada com todos os seus certificados e credenciais para fácil acesso quando precisar atualizá-los em seu perfil ou enviá-los a um recrutador.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Mantenha-se atualizado — Invista em desenvolvimento contínuo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O aprendizado constante é valorizado pelos empregadores:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Revise certificações expiradas</strong>: Renove ou atualize certificações com prazo de validade para manter sua relevância.</li>
            <li><strong>Identifique lacunas</strong>: Analise tendências do mercado e identifique novas certificações que possam complementar seu perfil.</li>
            <li><strong>Plano de desenvolvimento</strong>: Crie um cronograma para adquirir novas certificações estratégicas para sua carreira.</li>
            <li><strong>Aproveite benefícios corporativos</strong>: Utilize programas de subsídio para certificações oferecidos pelo seu empregador atual.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Tendência de mercado:</strong> 87% dos gestores de contratação indicam que preferem candidatos que demonstram compromisso com aprendizado contínuo através de certificações atualizadas.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Como destacar certificações em diferentes materiais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Adapte a apresentação de suas certificações para diferentes contextos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>No currículo</strong>: Crie uma seção específica para certificações relevantes, incluindo detalhes essenciais de forma concisa.</li>
            <li><strong>No LinkedIn</strong>: Utilize a seção de licenças e certificações, aproveitando a integração com plataformas de badges digitais.</li>
            <li><strong>Em entrevistas</strong>: Prepare exemplos concretos de como aplicou conhecimentos adquiridos em certificações em situações reais.</li>
            <li><strong>Em seu perfil da plataforma</strong>: Destaque certificações premium na seção "Conquistas" para maior visibilidade.</li>
          </ul>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Maximize o retorno do seu investimento:</h4>
          <p class="mb-4">Em nossa seção de "Conquistas", você pode destacar suas principais certificações para que apareçam em destaque no seu perfil, aumentando significativamente sua visibilidade para recrutadores que buscam profissionais com qualificações específicas.</p>
          <p class="font-medium">Lembre-se: certificações são uma forma poderosa de demonstrar não apenas suas habilidades técnicas, mas também seu comprometimento com o desenvolvimento profissional contínuo — uma característica altamente valorizada pelos empregadores.</p>
        </div>
      `,
      date: "2023-10-05"
    },
    // Candidaturas
    {
      id: "5",
      categoryId: "candidaturas",
      title: "Entendendo o processo de candidatura",
      description: "Como funciona o processo de candidatura do início ao fim",
      content: `
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Do clique à contratação: o caminho completo</h2>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p class="font-medium">Entender cada etapa do processo de candidatura permite que você se prepare adequadamente e navegue com mais confiança em sua jornada profissional. Este guia detalhado explica o que esperar em cada fase, desde o momento em que você se candidata até a celebração do contrato.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Candidatura — O primeiro passo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Esta é a fase inicial onde você expressa interesse formal na vaga:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Envio do currículo</strong>: Você submete seu currículo e informações solicitadas através da plataforma.</li>
            <li><strong>Carta de apresentação</strong>: Em muitos casos, é recomendável incluir uma carta personalizada explicando seu interesse e adequação à vaga.</li>
            <li><strong>Formulários específicos</strong>: Algumas empresas solicitam o preenchimento de questionários ou formulários adicionais.</li>
            <li><strong>Confirmação de recebimento</strong>: Após enviar sua candidatura, você deve receber uma confirmação automática.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Candidate-se o quanto antes após a publicação da vaga. Muitas empresas começam a avaliar candidatos imediatamente e podem fechar o processo assim que encontram candidatos qualificados.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Triagem inicial — Análise preliminar do seu perfil</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Nesta fase, seu perfil passa por uma primeira avaliação:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Filtragem por ATS</strong>: Sistemas automatizados analisam seu currículo buscando palavras-chave e requisitos mínimos.</li>
            <li><strong>Revisão por recrutadores</strong>: Profissionais de RH avaliam manualmente os candidatos que passaram pelo filtro automatizado.</li>
            <li><strong>Verificação de requisitos essenciais</strong>: Confirmação de que você atende aos critérios básicos para a posição.</li>
            <li><strong>Alinhamento de expectativas</strong>: Avaliação inicial de compatibilidade salarial e outros fatores práticos.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Dado importante:</strong> Em média, apenas 20-30% dos candidatos passam da triagem inicial para as próximas fases. Um currículo otimizado para ATS e bem alinhado com a descrição da vaga aumenta significativamente suas chances.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Avaliação técnica — Teste de competências</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Dependendo da vaga, você pode ser convidado para demonstrar suas habilidades:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Testes online</strong>: Avaliações de conhecimentos técnicos, lógica ou perfil comportamental.</li>
            <li><strong>Projetos práticos</strong>: Desafios reais relacionados à função para demonstrar suas habilidades aplicadas.</li>
            <li><strong>Apresentações</strong>: Em algumas áreas, pode ser solicitado que você prepare uma apresentação sobre um tema específico.</li>
            <li><strong>Dinâmicas em grupo</strong>: Atividades colaborativas para avaliar trabalho em equipe e soft skills.</li>
          </ul>
          <div class="bg-purple-50 border-l-4 border-purple-500 p-3 mt-3">
            <p class="font-medium">Na nossa plataforma, você pode acompanhar os testes solicitados diretamente na seção "Minhas Candidaturas" e, em muitos casos, realizá-los no ambiente integrado sem precisar acessar sistemas externos.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Entrevista inicial — Primeiro contato direto</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Esta é geralmente uma conversa com a equipe de RH ou recrutadores:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Verificação de informações</strong>: Confirmação de dados do currículo e esclarecimento de dúvidas.</li>
            <li><strong>Avaliação cultural</strong>: Análise de alinhamento com a cultura e valores da empresa.</li>
            <li><strong>Expectativas</strong>: Discussão sobre objetivos de carreira, pretensão salarial e disponibilidade.</li>
            <li><strong>Comportamento e comunicação</strong>: Observação de soft skills como comunicação, postura e atitude.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Antes desta entrevista, pesquise a fundo sobre a empresa, sua cultura e valores. Prepare exemplos concretos de situações profissionais que demonstrem suas competências comportamentais mais relevantes para a vaga.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Entrevista técnica — Avaliação aprofundada</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Conduzida por gestores ou especialistas da área para avaliar conhecimentos específicos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Conhecimento técnico</strong>: Perguntas detalhadas sobre experiências e competências essenciais para a função.</li>
            <li><strong>Resolução de problemas</strong>: Apresentação de cenários ou casos para avaliar seu processo de pensamento.</li>
            <li><strong>Experiência prática</strong>: Discussão sobre projetos anteriores e desafios enfrentados.</li>
            <li><strong>Capacidade de adaptação</strong>: Avaliação de como você lida com mudanças e novos aprendizados.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Preparação essencial:</strong> Para entrevistas técnicas, revisite os principais projetos em que trabalhou e prepare-se para discutir desafios específicos, soluções implementadas e resultados alcançados. Foque em demonstrar não apenas conhecimento, mas capacidade de aplicação prática.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Proposta — Negociação de termos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Se você for o candidato escolhido, receberá uma proposta formal:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Oferta inicial</strong>: Detalhes sobre cargo, remuneração, benefícios e condições de trabalho.</li>
            <li><strong>Período de negociação</strong>: Oportunidade para discutir ajustes nos termos oferecidos.</li>
            <li><strong>Esclarecimento de dúvidas</strong>: Momento para obter informações adicionais sobre a função e empresa.</li>
            <li><strong>Prazo para resposta</strong>: Tempo determinado para aceitar ou recusar a proposta.</li>
          </ul>
          <div class="bg-purple-50 border-l-4 border-purple-500 p-3 mt-3">
            <p class="font-medium">Ao receber uma proposta, avalie cuidadosamente todos os aspectos, não apenas o salário. Considere benefícios, oportunidades de crescimento, cultura da empresa e equilíbrio entre vida pessoal e profissional para tomar uma decisão informada.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">7. Contratação — Formalização do vínculo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Após aceitar a proposta, inicia-se o processo de contratação formal:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Documentação</strong>: Envio e assinatura de contratos e documentos legais necessários.</li>
            <li><strong>Exames admissionais</strong>: Realização de exames médicos exigidos pela legislação.</li>
            <li><strong>Verificação de antecedentes</strong>: Em alguns casos, checagem de referências e antecedentes.</li>
            <li><strong>Onboarding</strong>: Processo de integração e ambientação na nova empresa.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Tenha seus documentos pessoais organizados e acessíveis para agilizar o processo de contratação. Isso inclui comprovantes de formação acadêmica, certificações, documentos de identificação e dados bancários.</p>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Acompanhamento na plataforma:</h4>
          <p class="mb-4">Em nossa plataforma, você pode acompanhar o status de cada candidatura em tempo real na seção "Minhas Candidaturas". Cada etapa do processo é atualizada automaticamente, permitindo que você visualize exatamente em qual fase está cada oportunidade.</p>
          <p class="font-medium">Mantenha-se ativo durante todo o processo, respondendo prontamente às solicitações da empresa e demonstrando interesse genuíno pela oportunidade. Uma candidatura bem-sucedida é resultado tanto de suas qualificações quanto da sua postura durante o processo seletivo.</p>
        </div>
      `,
      date: "2023-10-10"
    },
    {
      id: "6",
      categoryId: "candidaturas",
      title: "Como acompanhar o status das suas candidaturas",
      description: "Um guia para interpretar os diferentes status de candidatura",
      content: `
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Decifrando os status das candidaturas</h2>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p class="font-medium">Acompanhar o progresso das suas candidaturas é essencial para gerenciar eficientemente sua busca por oportunidades profissionais. Na seção "Minhas Candidaturas", você encontrará diferentes status que indicam em qual etapa do processo seletivo cada candidatura se encontra. Este guia explicará o significado de cada status e como agir em cada situação.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Status Iniciais — Primeiras etapas do processo</h3>
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-purple-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-purple-800">Enviada</h4>
            <p class="text-sm">Sua candidatura foi recebida pela empresa, mas ainda não foi analisada.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Sua inscrição foi registrada com sucesso no sistema da empresa.</li>
            <li><strong>Tempo médio neste status</strong>: 1 a 14 dias, dependendo do volume de candidaturas e urgência da vaga.</li>
            <li><strong>O que fazer</strong>: Continue buscando outras oportunidades enquanto aguarda. Não é recomendável contatar a empresa neste estágio.</li>
            <li><strong>Próximos passos</strong>: O status mudará quando sua candidatura começar a ser avaliada pela equipe de recrutamento.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Aproveite este período para refinar seu perfil, adicionar novas conquistas ou certificações que possam fortalecer sua candidatura.</p>
        </div>
        
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-blue-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-blue-800">Em análise</h4>
            <p class="text-sm">Recrutadores estão avaliando seu perfil e currículo.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Seu currículo está sendo revisado pela equipe de recrutamento, que está comparando suas qualificações com os requisitos da vaga.</li>
            <li><strong>Tempo médio neste status</strong>: 3 a 21 dias, variando conforme a complexidade da posição e estrutura de RH da empresa.</li>
            <li><strong>O que fazer</strong>: Verifique se todas as informações do seu perfil estão completas e atualizadas. Esteja atento ao seu e-mail e telefone.</li>
            <li><strong>Próximos passos</strong>: O status pode mudar para "Teste solicitado", "Entrevista agendada" ou, infelizmente, "Não selecionado".</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Dado importante:</strong> Aproximadamente 70% das candidaturas são filtradas durante a fase de análise inicial. Um perfil completo, com palavras-chave relevantes e evidências claras de resultados anteriores, aumenta significativamente suas chances de avançar.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Status de Avaliação — Fases de verificação de competências</h3>
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-amber-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-amber-800">Teste solicitado</h4>
            <p class="text-sm">A empresa solicita que você realize um teste técnico ou de competências.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Você passou pela triagem inicial e agora a empresa deseja avaliar suas habilidades específicas.</li>
            <li><strong>Tempo médio neste status</strong>: Permanece até você concluir o teste ou até o prazo definido pela empresa expirar.</li>
            <li><strong>O que fazer</strong>: Siga atentamente as instruções fornecidas. Realize o teste em um ambiente tranquilo e dentro do prazo estabelecido.</li>
            <li><strong>Próximos passos</strong>: Após a conclusão do teste, o status mudará para "Em análise" novamente enquanto seu desempenho é avaliado.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Antes de iniciar um teste, certifique-se de entender claramente o que está sendo avaliado e quanto tempo você precisará dedicar. Muitos candidatos subestimam o tempo necessário para concluir testes técnicos.</p>
        </div>
        
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-green-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-green-800">Entrevista agendada</h4>
            <p class="text-sm">Você foi selecionado para uma entrevista.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Seu perfil despertou interesse e a empresa deseja conhecê-lo melhor através de uma conversa.</li>
            <li><strong>Tempo médio neste status</strong>: Permanece até a data da entrevista e geralmente muda 1 a 3 dias após sua realização.</li>
            <li><strong>O que fazer</strong>: Confirme sua disponibilidade prontamente. Pesquise sobre a empresa e prepare-se para a entrevista.</li>
            <li><strong>Próximos passos</strong>: Após a entrevista, o status poderá mudar para "Em fase final", "Entrevista adicional solicitada" ou "Não selecionado".</li>
          </ul>
          <div class="bg-purple-50 border-l-4 border-purple-500 p-3 mt-3">
            <p class="font-medium">Na nossa seção "Entrevistas > Dicas e Perguntas", você encontra centenas de perguntas comuns por área, com sugestões de como respondê-las! Aproveite este recurso para se preparar adequadamente.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Status Avançados — Fases finais do processo</h3>
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-indigo-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-indigo-800">Em fase final</h4>
            <p class="text-sm">Você está entre os finalistas para a vaga.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Você passou pelas principais etapas de avaliação e está sendo considerado seriamente para a posição.</li>
            <li><strong>Tempo médio neste status</strong>: 7 a 14 dias, enquanto a empresa finaliza o processo decisório.</li>
            <li><strong>O que fazer</strong>: Esteja preparado para possíveis contatos adicionais ou solicitações de informações. Mantenha sua disponibilidade e interesse demonstrados.</li>
            <li><strong>Próximos passos</strong>: O status mudará para "Proposta enviada" se você for o candidato escolhido ou "Não selecionado" caso outro candidato seja selecionado.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Nesta fase, é apropriado enviar um breve e-mail agradecendo pela oportunidade de participar do processo e reiterando seu interesse na posição. Isso pode diferenciar você de outros finalistas.</p>
        </div>
        
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-teal-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-teal-800">Proposta enviada</h4>
            <p class="text-sm">A empresa enviou uma proposta formal.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Você foi o candidato escolhido e a empresa está oferecendo formalmente a posição.</li>
            <li><strong>Tempo médio neste status</strong>: Permanece até você aceitar ou recusar a proposta, geralmente com prazo de 2 a 7 dias para resposta.</li>
            <li><strong>O que fazer</strong>: Analise cuidadosamente todos os aspectos da proposta. Se necessário, negocie termos específicos antes de sua decisão final.</li>
            <li><strong>Próximos passos</strong>: Após sua aceitação, o status mudará para "Contratação em andamento" enquanto os trâmites administrativos são finalizados.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Ao receber uma proposta, avalie não apenas o salário, mas também benefícios, perspectivas de crescimento, cultura da empresa e alinhamento com seus objetivos de carreira. Se estiver em dúvida, é apropriado solicitar um tempo razoável para tomar sua decisão.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Status de Encerramento — Conclusão do processo</h3>
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-gray-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-gray-800">Não selecionado</h4>
            <p class="text-sm">A empresa optou por outros candidatos para esta vaga.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Outro candidato foi considerado mais adequado para a posição específica.</li>
            <li><strong>O que fazer</strong>: Encare como uma oportunidade de aprendizado. Se possível, solicite feedback sobre pontos a melhorar.</li>
            <li><strong>Próximos passos</strong>: Continue se candidatando a outras vagas compatíveis com seu perfil. Considere aprimorar áreas que possam ter influenciado na decisão.</li>
          </ul>
          <div class="bg-purple-50 border-l-4 border-purple-500 p-3 mt-3">
            <p class="font-medium">Mesmo se não for selecionado, mantenha uma atitude positiva. Muitas empresas guardam perfis interessantes para futuras oportunidades. Aproximadamente 15% dos candidatos contratados foram previamente considerados para outras posições na mesma empresa.</p>
          </div>
        </div>
        
        <div class="ml-5 mb-6">
          <div class="border-l-4 border-gray-300 pl-4 py-1 mb-4">
            <h4 class="font-bold text-gray-800">Vaga cancelada/suspensa</h4>
            <p class="text-sm">A empresa suspendeu ou cancelou o processo seletivo.</p>
          </div>
          
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>O que significa</strong>: Por razões internas (reorganização, mudanças orçamentárias, etc.), a empresa decidiu não prosseguir com a contratação neste momento.</li>
            <li><strong>O que fazer</strong>: Entenda que esta decisão não está relacionada às suas qualificações. Mantenha seu perfil atualizado para futuras oportunidades.</li>
            <li><strong>Próximos passos</strong>: Continue sua busca por outras vagas. Em alguns casos, a empresa pode reativar o processo posteriormente.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Se você tinha grande interesse na empresa, considere seguir sua página e configurar alertas para ser notificado quando novas vagas forem abertas.</p>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Gerenciando sua jornada de candidaturas:</h4>
          <p class="mb-4">Nossa plataforma permite que você acompanhe todas as suas candidaturas em um único painel, facilitando o gerenciamento de múltiplos processos seletivos simultaneamente. Use os filtros disponíveis para organizar suas candidaturas por status, data ou empresa.</p>
          <p class="font-medium">Lembre-se: o processo de busca por uma nova oportunidade é uma maratona, não uma corrida de velocidade. Mantenha-se resiliente e use cada experiência — positiva ou negativa — como uma oportunidade de aprendizado e crescimento profissional.</p>
        </div>
      `,
      date: "2023-10-15"
    },
    // Entrevistas
    {
      id: "7",
      categoryId: "entrevistas",
      title: "Como se preparar para entrevistas: guia completo",
      description: "Técnicas e dicas para se destacar em entrevistas de emprego",
      content: `
        <h2 class="text-2xl font-bold text-orange-700 mb-4">Prepare-se para brilhar na entrevista</h2>
        
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <p class="font-medium">A preparação adequada é a chave para o sucesso em entrevistas de emprego. Este guia completo apresenta estratégias comprovadas para você se preparar com confiança, demonstrar seu potencial e aumentar significativamente suas chances de conquistar a vaga desejada.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Pesquise sobre a empresa — Conhecimento é poder</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Demonstrar que você conhece a organização é essencial para causar uma boa impressão:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Missão e valores</strong>: Compreenda os princípios que orientam a empresa e como eles se alinham aos seus.</li>
            <li><strong>Produtos e serviços</strong>: Familiarize-se com o que a empresa oferece e seu posicionamento no mercado.</li>
            <li><strong>Cultura organizacional</strong>: Pesquise sobre o ambiente de trabalho, práticas de diversidade e responsabilidade social.</li>
            <li><strong>Notícias recentes</strong>: Informe-se sobre desenvolvimentos recentes, conquistas ou desafios que a empresa esteja enfrentando.</li>
            <li><strong>Concorrentes</strong>: Tenha uma visão geral do cenário competitivo em que a empresa opera.</li>
          </ul>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Além do site oficial, consulte plataformas como LinkedIn, Glassdoor e notícias recentes para obter uma visão mais abrangente e realista da empresa.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Revise a descrição da vaga — Entenda o que realmente buscam</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">A descrição da vaga é o roteiro para sua preparação específica:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Requisitos essenciais</strong>: Identifique as habilidades técnicas e qualificações indispensáveis para a função.</li>
            <li><strong>Responsabilidades principais</strong>: Compreenda claramente o que será esperado de você no dia a dia.</li>
            <li><strong>Competências comportamentais</strong>: Note quais soft skills são valorizadas para a posição (liderança, trabalho em equipe, etc.).</li>
            <li><strong>Palavras-chave</strong>: Preste atenção aos termos que se repetem, pois indicam prioridades para a empresa.</li>
            <li><strong>Prepare conexões</strong>: Para cada requisito importante, pense em exemplos concretos de como sua experiência se alinha.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Análise estratégica:</strong> Faça uma tabela com duas colunas: na primeira, liste os requisitos da vaga; na segunda, suas experiências e habilidades correspondentes. Isso ajudará a identificar seus pontos fortes e áreas que precisam ser melhor articuladas durante a entrevista.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Prepare exemplos STAR — Histórias que comprovam seu potencial</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O método STAR é uma estrutura eficaz para relatar experiências profissionais de forma convincente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Situação</strong>: Descreva brevemente o contexto e o desafio enfrentado.</li>
            <li><strong>Tarefa</strong>: Explique qual era sua responsabilidade específica naquela situação.</li>
            <li><strong>Ação</strong>: Detalhe as medidas que você tomou para resolver o problema ou alcançar o objetivo.</li>
            <li><strong>Resultado</strong>: Compartilhe os resultados obtidos, preferencialmente com dados quantificáveis.</li>
          </ul>
          <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mt-3">
            <p class="font-medium">Prepare pelo menos 5-7 exemplos STAR que demonstrem competências-chave como resolução de problemas, trabalho em equipe, liderança, adaptabilidade e inovação. Tenha histórias prontas que evidenciem como você supera desafios e gera resultados positivos.</p>
          </div>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Ensaie suas histórias em voz alta, mas evite decorá-las. O objetivo é estar familiarizado com os pontos-chave de cada exemplo, mantendo a naturalidade na conversa.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Pratique respostas para perguntas comuns — Esteja preparado para os clássicos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Algumas perguntas aparecem em quase todas as entrevistas. Prepare-se para elas:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4">
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Fale sobre você"</p>
              <p class="text-sm text-slate-600 mt-1">Prepare uma apresentação concisa (1-2 minutos) focando em sua trajetória profissional relevante para a vaga.</p>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Por que quer trabalhar conosco?"</p>
              <p class="text-sm text-slate-600 mt-1">Conecte valores da empresa aos seus e explique como pode contribuir especificamente.</p>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Quais são seus pontos fortes e fracos?"</p>
              <p class="text-sm text-slate-600 mt-1">Destaque forças relevantes para a vaga. Para fraquezas, mostre autoconsciência e esforços de melhoria.</p>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Onde você se vê em 5 anos?"</p>
              <p class="text-sm text-slate-600 mt-1">Demonstre ambição realista alinhada com a trajetória possível na empresa.</p>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Por que devemos contratá-lo?"</p>
              <p class="text-sm text-slate-600 mt-1">Resuma suas principais qualificações e o valor único que você pode agregar.</p>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-200">
              <p class="font-medium text-slate-700">"Qual sua pretensão salarial?"</p>
              <p class="text-sm text-slate-600 mt-1">Pesquise a faixa salarial do mercado e prepare-se para negociar com base em dados.</p>
            </div>
          </div>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Na nossa seção "Entrevistas > Dicas e Perguntas", você encontra mais de 200 perguntas comuns por área, com sugestões de como respondê-las de forma eficaz!</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Prepare perguntas para fazer — Demonstre interesse e proatividade</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Fazer perguntas relevantes mostra seu interesse genuíno e pensamento analítico:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Sobre a posição</strong>: "Quais seriam os principais desafios e prioridades nos primeiros 90 dias?"</li>
            <li><strong>Sobre a equipe</strong>: "Como é estruturada a equipe com a qual eu trabalharia diretamente?"</li>
            <li><strong>Sobre desenvolvimento</strong>: "Quais são as oportunidades de crescimento e aprendizado dentro da empresa?"</li>
            <li><strong>Sobre a cultura</strong>: "Como você descreveria a cultura da empresa e o que a diferencia de seus concorrentes?"</li>
            <li><strong>Sobre expectativas</strong>: "Como é mensurado o sucesso nesta posição?"</li>
            <li><strong>Sobre próximos passos</strong>: "Quais são as próximas etapas do processo seletivo?"</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Evite perguntas sobre salário e benefícios nas primeiras entrevistas, a menos que o entrevistador aborde o assunto. Foque em questões que demonstrem seu interesse no trabalho em si e na empresa.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Prepare-se logisticamente — Cuide dos detalhes práticos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Para entrevistas presenciais:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Planeje o trajeto</strong>: Verifique o local com antecedência e planeje chegar 15-20 minutos antes.</li>
            <li><strong>Vestuário adequado</strong>: Vista-se de acordo com a cultura da empresa, mas sempre com aparência profissional.</li>
            <li><strong>Documentos</strong>: Leve cópias impressas do currículo, portfólio (se aplicável) e um bloco para anotações.</li>
            <li><strong>Desative notificações</strong>: Coloque o celular no modo silencioso para evitar interrupções.</li>
          </ul>
          
          <p class="mb-3 mt-4">Para entrevistas remotas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Teste a tecnologia</strong>: Verifique sua câmera, microfone e conexão com a internet previamente.</li>
            <li><strong>Ambiente adequado</strong>: Escolha um local silencioso, com boa iluminação e fundo neutro e organizado.</li>
            <li><strong>Plano B</strong>: Tenha um dispositivo alternativo e o número de telefone do entrevistador em caso de problemas técnicos.</li>
            <li><strong>Postura profissional</strong>: Vista-se completamente como para uma entrevista presencial e mantenha uma postura adequada.</li>
          </ul>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Faça uma simulação completa um dia antes. Para entrevistas remotas, teste a plataforma que será utilizada e grave uma sessão de prática para avaliar sua imagem, som e comunicação não-verbal.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">7. Técnicas para controlar a ansiedade — Mantenha a calma para brilhar</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Estratégias eficazes para gerenciar o nervosismo e apresentar sua melhor versão:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Respiração controlada</strong>: Pratique respiração profunda (4 segundos inspirando, 4 segundos retendo, 6 segundos expirando) antes da entrevista.</li>
            <li><strong>Visualização positiva</strong>: Imagine-se respondendo às perguntas com confiança e causando uma boa impressão.</li>
            <li><strong>Preparação completa</strong>: Quanto mais preparado você estiver, menor será sua ansiedade.</li>
            <li><strong>Reframing</strong>: Encare a entrevista como uma conversa para avaliar se há compatibilidade mútua, não apenas um teste.</li>
            <li><strong>Chegue cedo</strong>: Dê-se tempo para se acalmar e adaptar ao ambiente antes da entrevista.</li>
          </ul>
          <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mt-3">
            <p class="font-medium">Lembre-se que é normal sentir-se nervoso. Muitos entrevistadores até valorizam um certo nível de nervosismo, pois demonstra que você se importa com a oportunidade. O segredo está em gerenciar a ansiedade, não em eliminá-la completamente.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Após a entrevista — Próximos passos importantes:</h4>
          <p class="mb-3">Envie um e-mail de agradecimento em até 24 horas, reforçando seu interesse na posição e mencionando brevemente algum ponto relevante discutido na entrevista.</p>
          <p class="mb-3">Faça uma autoavaliação: anote o que funcionou bem e o que poderia melhorar para suas próximas entrevistas. Este processo de reflexão é valioso para seu desenvolvimento profissional.</p>
          <p class="font-medium">Lembre-se: cada entrevista é uma oportunidade de aprendizado, independentemente do resultado. Mantenha uma atitude positiva e use cada experiência para refinar sua abordagem nas próximas oportunidades.</p>
        </div>
      `,
      date: "2023-10-20"
    },
    // Mensagens
    {
      id: "9",
      categoryId: "mensagens",
      title: "Como se comunicar efetivamente com recrutadores",
      description: "Dicas para uma comunicação profissional e eficaz",
      content: `
        <h2 class="text-2xl font-bold text-cyan-700 mb-4">Comunicação que impressiona recrutadores</h2>
        
        <div class="bg-cyan-50 border-l-4 border-cyan-500 p-4 mb-6">
          <p class="font-medium">A forma como você se comunica com recrutadores pode influenciar significativamente suas chances de sucesso em um processo seletivo. Uma comunicação clara, profissional e estratégica demonstra suas habilidades interpessoais e pode ser o diferencial que o destaca em meio a outros candidatos. Este guia apresenta práticas essenciais para otimizar sua comunicação em cada etapa do processo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Seja conciso e claro — Respeite o tempo do recrutador</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Recrutadores recebem dezenas ou até centenas de mensagens diariamente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Estruture suas mensagens</strong>: Use parágrafos curtos e bem organizados para facilitar a leitura rápida.</li>
            <li><strong>Priorize informações</strong>: Coloque os pontos mais importantes no início da mensagem.</li>
            <li><strong>Evite textos extensos</strong>: Limite-se ao essencial, mantendo e-mails e mensagens com no máximo 3-4 parágrafos curtos.</li>
            <li><strong>Use formatação estratégica</strong>: Utilize negrito para destacar informações-chave, mas sem exageros.</li>
          </ul>
          <div class="bg-slate-50 rounded p-3 border border-slate-200 mt-3">
            <p class="font-medium text-slate-800 mb-1">Exemplo de introdução concisa:</p>
            <p class="text-slate-700 text-sm italic">"Bom dia, Marina. Escrevo para expressar meu interesse na vaga de Analista de Marketing Digital (ref. #12345) anunciada na plataforma LocalizaVagas. Possuo 3 anos de experiência em campanhas de performance e SEO, com resultados comprovados em aumento de conversão, que acredito serem relevantes para a posição."</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Personalize suas mensagens — Evite abordagens genéricas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Mensagens personalizadas demonstram dedicação e interesse genuíno:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Mencione a vaga específica</strong>: Inclua o título exato e, se disponível, o código de referência da posição.</li>
            <li><strong>Referencie a empresa</strong>: Demonstre que pesquisou sobre a organização mencionando algum aspecto relevante.</li>
            <li><strong>Conexão com o recrutador</strong>: Se aplicável, mencione como conheceu ou foi indicado ao profissional.</li>
            <li><strong>Alinhamento específico</strong>: Explique brevemente por que você seria um bom candidato para esta vaga em particular.</li>
          </ul>
          <p class="mt-3 text-cyan-600 font-medium">💡 Dica profissional: Antes de enviar uma mensagem, pesquise o nome e cargo correto do recrutador. Usar "Prezado(a) Recrutador(a)" quando você poderia facilmente descobrir o nome da pessoa demonstra falta de atenção aos detalhes.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Mantenha o tom profissional — Equilibre formalidade e autenticidade</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O tom adequado transmite profissionalismo e competência:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 mb-4">
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <p class="font-medium text-slate-800 mb-1">Práticas recomendadas:</p>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Use saudação e despedida apropriadas</li>
                <li>Evite gírias e expressões muito informais</li>
                <li>Verifique gramática e ortografia</li>
                <li>Adapte o nível de formalidade à cultura da empresa</li>
                <li>Seja cortês e respeitoso</li>
              </ul>
            </div>
            <div class="bg-red-50 p-3 rounded border border-red-200">
              <p class="font-medium text-slate-800 mb-1">O que evitar:</p>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Abreviações excessivas (vc, pq, etc.)</li>
                <li>Emoticons ou emojis em excesso</li>
                <li>Tom excessivamente casual ou íntimo</li>
                <li>Linguagem negativa ou reclamações</li>
                <li>Erros de digitação ou formatação inconsistente</li>
              </ul>
            </div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-2">
            <p><strong>Equilíbrio:</strong> Embora o profissionalismo seja fundamental, não sacrifique completamente sua personalidade. Um tom autêntico e humano, ainda que profissional, pode criar uma conexão mais genuína com o recrutador.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Responda rapidamente — Demonstre proatividade e interesse</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">A agilidade na resposta reflete seu nível de interesse e comprometimento:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Tempo ideal</strong>: Procure responder em até 24 horas para mensagens regulares e em até 4 horas para comunicações urgentes.</li>
            <li><strong>Configure notificações</strong>: Ative alertas para mensagens de recrutadores em seu e-mail e na plataforma.</li>
            <li><strong>Resposta preliminar</strong>: Se precisar de mais tempo para uma resposta completa, envie uma confirmação de recebimento e indique quando responderá adequadamente.</li>
            <li><strong>Mantenha consistência</strong>: Tempo de resposta consistente demonstra confiabilidade profissional.</li>
          </ul>
          <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3 mt-3">
            <p class="font-medium">No sistema de mensagens da nossa plataforma, você pode configurar notificações push, e-mail ou SMS para ser alertado imediatamente quando receber respostas de recrutadores, garantindo que importantes oportunidades não passem despercebidas.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Revise antes de enviar — Evite erros evitáveis</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Erros de comunicação podem prejudicar significativamente sua imagem profissional:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Verifique ortografia e gramática</strong>: Use corretores automáticos, mas não confie exclusivamente neles.</li>
            <li><strong>Confira informações factuais</strong>: Datas, números, nomes de empresas e títulos devem estar precisos.</li>
            <li><strong>Releia em voz alta</strong>: Isso ajuda a identificar problemas de fluidez e clareza.</li>
            <li><strong>Verifique anexos</strong>: Certifique-se de que todos os arquivos mencionados foram devidamente anexados.</li>
            <li><strong>Revise o destinatário</strong>: Confirme se está enviando para a pessoa correta, especialmente ao responder ou encaminhar mensagens.</li>
          </ul>
          <p class="mt-3 text-cyan-600 font-medium">💡 Dica profissional: Para comunicações importantes, escreva o rascunho, faça uma pausa de alguns minutos e depois revise com olhar crítico antes de enviar. Esta pequena espera pode ajudar a identificar erros e melhorias que passariam despercebidos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Seja grato — Cultive relacionamentos profissionais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Gratidão e cortesia são características valorizadas no ambiente profissional:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Agradeça pelo tempo</strong>: Reconheça o esforço e atenção dedicados pelo recrutador.</li>
            <li><strong>Envie feedback</strong>: Após entrevistas ou interações significativas, um breve agradecimento é apropriado.</li>
            <li><strong>Mantenha a cordialidade</strong>: Independente do resultado, preserve o relacionamento profissional.</li>
            <li><strong>Seja específico</strong>: Mencione aspectos particulares da interação que foram valiosos para você.</li>
          </ul>
          <div class="bg-slate-50 rounded p-3 border border-slate-200 mt-3">
            <p class="font-medium text-slate-800 mb-1">Exemplo de nota de agradecimento pós-entrevista:</p>
            <p class="text-slate-700 text-sm italic">"Prezada Carolina, Agradeço sinceramente pela oportunidade de conversar sobre a posição de Analista de Dados na empresa XYZ ontem. Foi especialmente esclarecedor entender mais sobre os desafios analíticos que a equipe enfrenta e como a vaga se alinha com a estratégia de expansão da empresa. Nossa conversa sobre automação de relatórios reforçou meu entusiasmo pela posição. Estou à disposição caso surjam dúvidas adicionais e aguardo ansiosamente os próximos passos. Atenciosamente, [Seu nome]"</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Comunicação em diferentes canais e contextos</h3>
        <div class="ml-5 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <h4 class="font-bold text-cyan-800 mb-2">E-mail</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Use linha de assunto clara e específica</li>
                <li>Estruture com saudação, corpo e despedida formal</li>
                <li>Inclua assinatura com suas informações de contato</li>
                <li>Evite formatação excessiva ou cores chamativas</li>
              </ul>
            </div>
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <h4 class="font-bold text-cyan-800 mb-2">Plataformas de recrutamento</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Verifique regularmente suas notificações</li>
                <li>Responda através da mesma plataforma, mantendo o histórico centralizado</li>
                <li>Utilize os recursos específicos disponíveis, como submissão de documentos</li>
                <li>Mantenha seu perfil sempre atualizado</li>
              </ul>
            </div>
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <h4 class="font-bold text-cyan-800 mb-2">LinkedIn/Redes profissionais</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Personalize pedidos de conexão com contexto relevante</li>
                <li>Mantenha um tom ligeiramente mais casual, mas ainda profissional</li>
                <li>Responda a comentários em suas publicações de forma construtiva</li>
                <li>Seja cuidadoso com o horário de envio de mensagens</li>
              </ul>
            </div>
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <h4 class="font-bold text-cyan-800 mb-2">Telefone/Vídeo</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Prepare-se para chamadas inesperadas com um script mental</li>
                <li>Em videochamadas, verifique seu ambiente e aparência</li>
                <li>Fale claramente e em ritmo adequado, evitando interrupções</li>
                <li>Faça anotações para referência futura</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Comunicação como diferencial competitivo:</h4>
          <p class="mb-4">De acordo com pesquisas, 80% dos recrutadores consideram a qualidade da comunicação como um fator decisivo na avaliação de candidatos, mesmo quando as qualificações técnicas são similares. Isto significa que sua habilidade de comunicação pode ser o diferencial que o coloca à frente de outros candidatos igualmente qualificados.</p>
          <p class="font-medium">Lembre-se: sua comunicação com recrutadores é uma amostra de como você se comunicaria no ambiente de trabalho. Cada interação é uma oportunidade de demonstrar profissionalismo, clareza de pensamento e habilidades interpessoais que são valorizadas em qualquer posição.</p>
        </div>
      `,
      date: "2023-11-01"
    },
    // Conquistas
    {
      id: "10",
      categoryId: "conquistas",
      title: "Como destacar suas conquistas e diferenciais",
      description: "Estratégias para evidenciar seus resultados e potencial",
      content: `
        <h2 class="text-2xl font-bold text-yellow-700 mb-4">Transforme resultados em oportunidades</h2>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p class="font-medium">Suas conquistas profissionais são seu melhor argumento de venda no mercado de trabalho. Mais do que simplesmente listar responsabilidades, a capacidade de comunicar efetivamente seus resultados e diferenciais pode ser determinante para o sucesso da sua candidatura. Este guia apresenta estratégias comprovadas para evidenciar seu valor único e destacar-se da concorrência.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Quantifique sempre que possível — Números que impressionam</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Dados quantificáveis transmitem credibilidade e impacto concreto:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Use percentuais</strong>: "Aumentei as vendas em 25%" é mais impactante que "Aumentei significativamente as vendas".</li>
            <li><strong>Apresente valores absolutos</strong>: "Reduzi custos em R$50.000 anuais" demonstra a magnitude real do resultado.</li>
            <li><strong>Indique escala</strong>: "Gerenciei uma equipe de 12 pessoas" ou "Supervisionei orçamento de R$1,2 milhão".</li>
            <li><strong>Compare com benchmarks</strong>: "Superando a média do setor em 15%" contextualiza ainda mais seu desempenho.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-red-50 p-3 rounded border border-red-200">
              <p class="font-medium text-slate-800 mb-1">Antes (genérico):</p>
              <p class="text-slate-700 text-sm italic">"Responsável por aumentar a base de clientes e melhorar a retenção através de iniciativas de marketing."</p>
            </div>
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <p class="font-medium text-slate-800 mb-1">Depois (quantificado):</p>
              <p class="text-slate-700 text-sm italic">"Expandiu a base de clientes em 32% (350+ novos clientes) e elevou a taxa de retenção de 65% para 83% em 12 meses, através de campanhas de marketing digital com ROI médio de 380%."</p>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Use o método STAR — Estruture suas conquistas com clareza</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O método STAR (Situação, Tarefa, Ação, Resultado) oferece uma estrutura eficaz para comunicar conquistas:</p>
          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
            <div class="flex items-start mb-2">
              <div class="bg-yellow-200 text-yellow-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-2 mt-0.5">S</div>
              <div>
                <p class="font-medium text-slate-800">Situação</p>
                <p class="text-sm text-slate-600">Descreva o contexto e os desafios enfrentados.</p>
              </div>
            </div>
            <div class="flex items-start mb-2">
              <div class="bg-yellow-200 text-yellow-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-2 mt-0.5">T</div>
              <div>
                <p class="font-medium text-slate-800">Tarefa</p>
                <p class="text-sm text-slate-600">Explique qual era sua responsabilidade específica.</p>
              </div>
            </div>
            <div class="flex items-start mb-2">
              <div class="bg-yellow-200 text-yellow-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-2 mt-0.5">A</div>
              <div>
                <p class="font-medium text-slate-800">Ação</p>
                <p class="text-sm text-slate-600">Detalhe as medidas específicas que você tomou.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-yellow-200 text-yellow-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-2 mt-0.5">R</div>
              <div>
                <p class="font-medium text-slate-800">Resultado</p>
                <p class="text-sm text-slate-600">Compartilhe os resultados obtidos, preferencialmente quantificados.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-slate-50 rounded p-3 border border-slate-200">
            <p class="font-medium text-slate-800 mb-1">Exemplo de conquista estruturada com STAR:</p>
            <p class="text-slate-700 text-sm">
              <strong>Situação:</strong> A empresa enfrentava alto índice de cancelamento (churn) de clientes e perda de receita recorrente.<br>
              <strong>Tarefa:</strong> Fui designado para liderar um projeto de retenção e recuperação de clientes.<br>
              <strong>Ação:</strong> Implementei um sistema de alertas antecipados baseado em dados de uso do produto e satisfação, criei um processo estruturado de intervenção com clientes em risco e desenvolvi pacotes personalizados de renovação.<br>
              <strong>Resultado:</strong> Reduzi a taxa de cancelamento em 47% em 6 meses, recuperei 28 clientes que haviam cancelado, resultando em preservação de R$720.000 em receita anual recorrente.
            </p>
          </div>
          <p class="mt-3 text-yellow-600 font-medium">💡 Dica profissional: Mantenha um "diário de conquistas" regularmente atualizado com suas realizações, incluindo dados quantificáveis e detalhes específicos, para facilitar a construção de exemplos STAR quando necessário.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Conecte com a vaga desejada — Relevância é fundamental</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Conquistas alinhadas com os requisitos da vaga têm maior impacto:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Analise a descrição da vaga</strong>: Identifique palavras-chave, requisitos essenciais e desafios mencionados.</li>
            <li><strong>Priorize conquistas relevantes</strong>: Destaque realizações que demonstrem as competências mais valorizadas para a posição.</li>
            <li><strong>Estabeleça conexões claras</strong>: Explique como sua experiência anterior se transfere para os desafios da nova função.</li>
            <li><strong>Adapte a linguagem</strong>: Use terminologia similar à encontrada na descrição da vaga.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Personalização estratégica:</strong> Para cada candidatura importante, analise cuidadosamente a descrição da vaga e selecione 3-5 conquistas específicas que melhor demonstrem sua capacidade de atender às necessidades da empresa. Adapte a forma como você as apresenta para maximizar a relevância percebida.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Inclua conquistas não-numéricas — Valor além dos números</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Nem todas as realizações significativas podem ser quantificadas facilmente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Melhoria de processos</strong>: Demonstre como suas inovações otimizaram fluxos de trabalho ou aumentaram a eficiência.</li>
            <li><strong>Resolução de problemas complexos</strong>: Descreva situações desafiadoras que você solucionou com criatividade.</li>
            <li><strong>Desenvolvimento de equipe</strong>: Mostre como contribuiu para o crescimento profissional dos colegas.</li>
            <li><strong>Competências interpessoais</strong>: Exemplifique situações onde suas habilidades de comunicação ou liderança geraram resultados positivos.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
              <p class="font-medium text-slate-800 mb-1">Exemplo de conquista não-numérica:</p>
              <p class="text-slate-700 text-sm italic">"Liderou a transição da empresa para metodologias ágeis, desenvolvendo um framework personalizado que combinou elementos de Scrum e Kanban. Esta iniciativa transformou a cultura de entrega de projetos, reduzindo significativamente prazos de desenvolvimento e aumentando a satisfação tanto da equipe quanto dos clientes."</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
              <p class="font-medium text-slate-800 mb-1">Outro exemplo significativo:</p>
              <p class="text-slate-700 text-sm italic">"Identificou e resolveu um problema crítico de UX que havia persistido por três ciclos de desenvolvimento, colaborando com designers e desenvolvedores para criar uma solução inovadora que se tornou referência para outros produtos da empresa e recebeu elogios diretos de clientes estratégicos."</p>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Mantenha seu portfólio atualizado — Evidências concretas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Um portfólio bem estruturado reforça suas conquistas com evidências tangíveis:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Documente projetos</strong>: Registre sistematicamente seus projetos, incluindo objetivos, processo e resultados.</li>
            <li><strong>Colete testemunhos</strong>: Solicite e armazene feedbacks positivos de colegas, gestores e clientes.</li>
            <li><strong>Organize por categorias</strong>: Estruture seu portfólio por tipos de projetos ou competências demonstradas.</li>
            <li><strong>Inclua estudos de caso</strong>: Desenvolva narrativas detalhadas de seus projetos mais significativos.</li>
            <li><strong>Atualize regularmente</strong>: Adicione novas conquistas assim que ocorrerem, quando os detalhes estão frescos.</li>
          </ul>
          <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-3">
            <p class="font-medium">Na seção "Conquistas" do seu perfil em nossa plataforma, você pode categorizar suas realizações por tipo (profissional, acadêmico, voluntariado) para uma visualização mais organizada. Aproveite também a possibilidade de incluir mídias como imagens, documentos ou links para complementar suas conquistas!</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Estratégias para diferentes formatos e contextos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Adapte a apresentação de suas conquistas para diferentes situações:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
            <div class="bg-slate-50 p-4 rounded border border-slate-200">
              <h4 class="font-bold text-slate-800 mb-2">No currículo</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Use bullets concisos iniciados com verbos de ação</li>
                <li>Priorize 2-3 conquistas mais relevantes por posição</li>
                <li>Mantenha um formato consistente em todas as entradas</li>
                <li>Destaque métricas e números em negrito</li>
              </ul>
            </div>
            <div class="bg-slate-50 p-4 rounded border border-slate-200">
              <h4 class="font-bold text-slate-800 mb-2">Em entrevistas</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Prepare histórias completas usando o método STAR</li>
                <li>Tenha exemplos prontos para competências comumente requisitadas</li>
                <li>Traga dados específicos, mas mantenha a narrativa envolvente</li>
                <li>Conecte suas respostas às necessidades mencionadas pelo entrevistador</li>
              </ul>
            </div>
            <div class="bg-slate-50 p-4 rounded border border-slate-200">
              <h4 class="font-bold text-slate-800 mb-2">Em perfis online</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Utilize seções específicas para destacar projetos ou conquistas</li>
                <li>Inclua mídias visuais quando relevantes (gráficos, imagens, links)</li>
                <li>Obtenha validações e recomendações de colegas</li>
                <li>Use hashtags estratégicas para aumentar visibilidade</li>
              </ul>
            </div>
            <div class="bg-slate-50 p-4 rounded border border-slate-200">
              <h4 class="font-bold text-slate-800 mb-2">Em networking</h4>
              <ul class="list-disc ml-4 space-y-1 text-sm">
                <li>Desenvolva um "elevator pitch" com 1-2 conquistas-chave</li>
                <li>Adapte exemplos ao interlocutor e contexto da conversa</li>
                <li>Compartilhe histórias que demonstrem sua especialidade</li>
                <li>Mantenha o tom conversacional, evitando parecer presunçoso</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Equilíbrio entre confiança e humildade:</h4>
          <p class="mb-4">Ao destacar suas conquistas, busque o equilíbrio entre mostrar confiança em suas capacidades e manter uma postura de humildade. Reconheça as contribuições de equipes quando apropriado, mas não diminua sua participação e impacto pessoal.</p>
          <p class="font-medium">Lembre-se: suas conquistas não são apenas elementos do seu passado profissional, mas indicadores poderosos do valor que você pode trazer para futuros empregadores. Invista tempo para identificá-las, documentá-las e comunicá-las efetivamente, transformando seus resultados anteriores em novas oportunidades de carreira.</p>
        </div>
      `,
      date: "2023-11-10"
    },
    {
      id: "8",
      categoryId: "entrevistas",
      title: "Como responder às perguntas mais desafiadoras",
      description: "Estratégias para lidar com perguntas difíceis em entrevistas",
      content: `
        <h2 class="text-2xl font-bold text-orange-700 mb-4">Navegando pelas perguntas difíceis</h2>
        
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <p class="font-medium">Perguntas desafiadoras em entrevistas podem ser oportunidades valiosas para se destacar e demonstrar seu pensamento crítico, autoconhecimento e maturidade profissional. Este guia oferece estratégias específicas para responder com confiança às questões mais temidas pelos candidatos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Princípios gerais para perguntas desafiadoras</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Independentemente da pergunta específica, estas técnicas ajudarão você a estruturar respostas eficazes:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Mantenha a calma</strong>: Respire profundamente e trate perguntas difíceis como oportunidades, não como armadilhas.</li>
            <li><strong>Peça esclarecimentos</strong>: Se a pergunta for ambígua, solicite gentilmente uma explicação mais detalhada.</li>
            <li><strong>Estruture seu pensamento</strong>: Tome alguns segundos para organizar sua resposta antes de começar a falar.</li>
            <li><strong>Seja autêntico</strong>: Honestidade com contexto adequado é sempre a melhor abordagem.</li>
            <li><strong>Seja conciso</strong>: Responda de forma completa, mas evite divagações ou explicações excessivas.</li>
          </ul>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Use o método "ponte" quando necessário - reconheça brevemente o aspecto negativo ou desafiador e construa uma ponte para os aspectos positivos ou aprendizados relacionados.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. "Fale sobre seu maior fracasso profissional"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3 text-orange-800 font-medium">O que o entrevistador busca:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Autoconsciência e capacidade de reconhecer erros</li>
            <li>Habilidade de extrair aprendizados de experiências negativas</li>
            <li>Resiliência e abordagem construtiva diante de adversidades</li>
          </ul>
          
          <div class="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p class="font-medium text-slate-800 mb-2">Estratégia para responder:</p>
            <ol class="list-decimal ml-6 space-y-1 text-slate-700">
              <li>Escolha um exemplo genuíno, mas não catastrófico e preferencialmente não recente</li>
              <li>Apresente brevemente o contexto e reconheça sua responsabilidade</li>
              <li>Foque principalmente nas lições aprendidas e mudanças implementadas</li>
              <li>Conclua com um exemplo de como aplicou esse aprendizado posteriormente com sucesso</li>
            </ol>
          </div>
          
          <div class="bg-green-50 rounded p-3 border-l-4 border-green-500">
            <p class="font-medium text-slate-800 mb-1">Exemplo de resposta eficaz:</p>
            <p class="text-slate-700 text-sm italic">"Em meu papel anterior como gerente de projeto, liderei uma iniciativa de implementação de software onde subestimei o tempo necessário para treinamento da equipe. O projeto atrasou duas semanas, impactando temporariamente o fluxo de trabalho do departamento. Assumindo responsabilidade, reorganizei o cronograma, implementei sessões de treinamento intensivas e comuniquei transparentemente com todos os stakeholders. Esta experiência me ensinou a importância de planejar com margens de segurança e avaliar melhor as necessidades de capacitação da equipe. No projeto seguinte, incorporei estas lições criando um plano de treinamento detalhado desde o início, resultando em uma implementação que foi concluída dentro do prazo e com adoção mais rápida pelos usuários."</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. "Por que está deixando seu emprego atual?"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3 text-orange-800 font-medium">O que o entrevistador busca:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Motivações profissionais e sinais de alerta</li>
            <li>Como você gerencia relacionamentos e conflitos</li>
            <li>Alinhamento entre seus objetivos e o que a empresa oferece</li>
          </ul>
          
          <div class="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p class="font-medium text-slate-800 mb-2">Estratégia para responder:</p>
            <ol class="list-decimal ml-6 space-y-1 text-slate-700">
              <li>Mantenha-se positivo, evitando críticas ao empregador atual</li>
              <li>Foque nas oportunidades de crescimento que você busca</li>
              <li>Relacione seus objetivos de carreira com o que a nova posição oferece</li>
              <li>Demonstre que sua decisão é fruto de reflexão cuidadosa, não impulsiva</li>
            </ol>
          </div>
          
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
            <p><strong>O que evitar:</strong> Nunca fale negativamente sobre seu empregador atual, colegas ou chefes. Críticas, mesmo que justificadas, podem criar a impressão de que você seria problemático em um novo ambiente.</p>
          </div>
          
          <div class="bg-green-50 rounded p-3 border-l-4 border-green-500">
            <p class="font-medium text-slate-800 mb-1">Exemplo de resposta eficaz:</p>
            <p class="text-slate-700 text-sm italic">"Tenho apreciado meus três anos na empresa atual, onde pude desenvolver habilidades sólidas em análise de dados e liderança de projetos menores. Estou buscando agora uma oportunidade que me permita assumir responsabilidades maiores em projetos estratégicos e expandir minha experiência em um ambiente mais internacional. Ao estudar sobre sua empresa, fiquei particularmente interessado na abordagem inovadora que vocês têm para solucionar desafios do setor e na estrutura que permite crescimento profissional baseado em mérito. Esta posição parece perfeitamente alinhada com minha trajetória de carreira planejada."</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. "Qual é sua pretensão salarial?"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3 text-orange-800 font-medium">O que o entrevistador busca:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Se suas expectativas estão alinhadas com o orçamento da empresa</li>
            <li>Como você avalia seu próprio valor no mercado</li>
            <li>Suas habilidades de negociação e autoconfiança</li>
          </ul>
          
          <div class="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p class="font-medium text-slate-800 mb-2">Estratégia para responder:</p>
            <ol class="list-decimal ml-6 space-y-1 text-slate-700">
              <li>Pesquise antecipadamente a faixa salarial do mercado para cargos similares</li>
              <li>Considere seu nível de experiência, localização e o setor da empresa</li>
              <li>Apresente um intervalo salarial em vez de um valor específico</li>
              <li>Demonstre flexibilidade e interesse no pacote completo de benefícios</li>
            </ol>
          </div>
          
          <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mt-3 mb-4">
            <p class="font-medium">Prepare-se adequadamente para esta pergunta pesquisando em fontes como Glassdoor, LinkedIn Salary ou relatórios salariais do setor. Conhecer o valor médio de mercado para sua posição e nível de experiência dará mais confiança e precisão à sua resposta.</p>
          </div>
          
          <div class="bg-green-50 rounded p-3 border-l-4 border-green-500">
            <p class="font-medium text-slate-800 mb-1">Exemplo de resposta eficaz:</p>
            <p class="text-slate-700 text-sm italic">"Com base em minha pesquisa sobre posições similares no mercado, considerando meus 5 anos de experiência no setor e as competências específicas em gerenciamento de projetos ágeis e otimização de processos que posso trazer para esta função, estaria buscando uma faixa entre R$X e R$Y. No entanto, entendo que há diversos fatores a considerar, incluindo o pacote completo de benefícios e oportunidades de crescimento, e estou aberto a discutir para chegarmos a um acordo mutuamente benéfico."</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. "Onde você se vê em 5 anos?"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3 text-orange-800 font-medium">O que o entrevistador busca:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Alinhamento entre seus objetivos e as possibilidades na empresa</li>
            <li>Ambição adequada e planejamento de carreira realista</li>
            <li>Comprometimento a longo prazo versus interesse passageiro</li>
          </ul>
          
          <div class="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p class="font-medium text-slate-800 mb-2">Estratégia para responder:</p>
            <ol class="list-decimal ml-6 space-y-1 text-slate-700">
              <li>Demonstre ambição realista e compatível com a trajetória possível na empresa</li>
              <li>Enfatize o desenvolvimento de habilidades e crescimento profissional</li>
              <li>Mostre interesse em crescer com a organização, não apenas usá-la como trampolim</li>
              <li>Mantenha alguma flexibilidade, reconhecendo que carreiras evoluem</li>
            </ol>
          </div>
          
          <div class="bg-green-50 rounded p-3 border-l-4 border-green-500">
            <p class="font-medium text-slate-800 mb-1">Exemplo de resposta eficaz:</p>
            <p class="text-slate-700 text-sm italic">"Nos próximos cinco anos, vejo-me desenvolvendo expertise aprofundada na área de marketing digital, especialmente em estratégias baseadas em dados. Espero ter a oportunidade de liderar projetos estratégicos e possivelmente uma pequena equipe, contribuindo significativamente para o crescimento do departamento. Baseado no que pesquisei sobre sua empresa, admiro a cultura de promoção interna e desenvolvimento de talentos, e ficaria entusiasmado em crescer profissionalmente aqui, assumindo responsabilidades progressivamente maiores à medida que demonstro resultados. Também planejo continuar minha educação, possivelmente com uma especialização em análise avançada de dados para marketing."</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. "Qual é sua maior fraqueza?"</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3 text-orange-800 font-medium">O que o entrevistador busca:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Autoconsciência e capacidade de auto-avaliação honesta</li>
            <li>Disposição para reconhecer áreas de melhoria</li>
            <li>Abordagem proativa para desenvolvimento pessoal</li>
          </ul>
          
          <div class="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p class="font-medium text-slate-800 mb-2">Estratégia para responder:</p>
            <ol class="list-decimal ml-6 space-y-1 text-slate-700">
              <li>Apresente uma fraqueza real, mas não crítica para a função pretendida</li>
              <li>Explique as medidas concretas que está tomando para melhorá-la</li>
              <li>Mostre progresso ou resultados positivos desses esforços</li>
              <li>Evite clichês ("sou perfeccionista") ou transformar forças em falsas fraquezas</li>
            </ol>
          </div>
          
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
            <p><strong>O que evitar:</strong> Não mencione fraquezas que sejam requisitos essenciais para a posição. Por exemplo, se estiver se candidatando a um cargo que exige habilidades de apresentação, não cite "falar em público" como sua fraqueza.</p>
          </div>
          
          <div class="bg-green-50 rounded p-3 border-l-4 border-green-500">
            <p class="font-medium text-slate-800 mb-1">Exemplo de resposta eficaz:</p>
            <p class="text-slate-700 text-sm italic">"Uma área que tenho trabalhado para desenvolver é a delegação eficaz. Como alguém que valoriza qualidade e detalhes, no passado eu tendia a assumir muitas responsabilidades em vez de distribuí-las entre a equipe. Reconheci que isso limitava não apenas minha produtividade, mas também o desenvolvimento dos membros da equipe. Nos últimos 18 meses, tenho implementado conscientemente estratégias para melhorar, como mapear tarefas que podem ser delegadas, estabelecer expectativas claras e criar check-ins estruturados. Como resultado, consegui aumentar a produtividade da equipe em 20% e dedicar mais tempo a iniciativas estratégicas, enquanto observo colegas desenvolvendo novas competências."</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Princípio fundamental para todas as perguntas desafiadoras:</h4>
          <p class="mb-4">Lembre-se: honestidade com contexto é a melhor política. Prepare-se para estas perguntas, mas mantenha suas respostas autênticas. Recrutadores experientes conseguem identificar respostas ensaiadas ou insinceras.</p>
          <p class="mb-3">O que mais importa é demonstrar autoconhecimento, capacidade de aprendizado e uma abordagem construtiva para desafios e desenvolvimento pessoal.</p>
          <p class="font-medium">Pratique suas respostas para ganhar confiança, mas permita-se adaptar naturalmente durante a entrevista, respondendo de forma genuína às perguntas específicas e ao contexto da conversa.</p>
        </div>
      `,
      date: "2023-10-25"
    }
  ])

  // Estado para filtro da base de conhecimento
  const [knowledgeBaseSearch, setKnowledgeBaseSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  // Estados simplificados para a versão compacta
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  // Novo estado para rastrear artigos lidos
  const [readArticles, setReadArticles] = useState<string[]>([])

  // Estado para controlar a abertura do modal de novo ticket
  const [newTicketOpen, setNewTicketOpen] = useState(false)
  // Estados para os campos do formulário de novo ticket
  const [ticketTitle, setTicketTitle] = useState("")
  const [ticketCategory, setTicketCategory] = useState("")
  const [ticketPriority, setTicketPriority] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")
  
  // Estado para armazenar tickets criados
  const [tickets, setTickets] = useState([
    {
      id: "TK-001",
      title: "Problema ao fazer login",
      status: "aberto",
      category: "acesso",
      date: "22/02/2024", // Formato da data
      createdTime: "10:15", // Hora de criação
      lastResponseDate: "25/02/2024",
      lastResponseTime: "07:30",
      lastResponseBy: "Equipe"
    },
    {
      id: "TK-002",
      title: "Dúvida sobre envio de currículo",
      status: "em_andamento",
      category: "candidatura",
      date: "23/02/2024",
      createdTime: "14:20",
      lastResponseDate: "24/02/2024",
      lastResponseTime: "13:45",
      lastResponseBy: "Você"
    },
    {
      id: "TK-003",
      title: "Não consigo editar perfil",
      status: "pendente",
      category: "perfil",
      date: "21/02/2024",
      createdTime: "09:30",
      lastResponseDate: "22/02/2024",
      lastResponseTime: "08:00",
      lastResponseBy: "Equipe"
    }
  ]);

  // Estado para filtros de tickets
  const [statusFilter, setStatusFilter] = useState("todos");
  const [priorityFilter, setPriorityFilter] = useState("todas");
  const [ticketSearchQuery, setTicketSearchQuery] = useState("");

  // Função para criar novo ticket
  const handleCreateTicket = () => {
    // Validação básica
    if (!ticketTitle || !ticketCategory || !ticketPriority || !ticketDescription) {
      // Aqui você poderia mostrar uma mensagem de erro
      return;
    }
    
    // Gerar ID no formato correto
    const ticketCount = tickets.length;
    const ticketId = `TK-${String(ticketCount + 1).padStart(3, '0')}`;
    
    // Criar novo ticket
    const newTicket = {
      id: ticketId,
      title: ticketTitle,
      category: ticketCategory,
      priority: ticketPriority,
      status: "aberto",
      date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      description: ticketDescription,
      lastResponseDate: "25/02/2024",
      lastResponseTime: "07:30",
      lastResponseBy: "Equipe"
    };
    
    // Adicionar à lista de tickets
    setTickets(prev => [newTicket, ...prev]);
    
    // Reset dos campos do formulário
    setTicketTitle("");
    setTicketCategory("");
    setTicketPriority("");
    setTicketDescription("");
    
    // Fechar o modal
    setNewTicketOpen(false);
  };

  // Função para filtrar tickets
  const getFilteredTickets = () => {
    return tickets.filter(ticket => {
      // Filtrar por status
      if (statusFilter !== "todos" && ticket.status !== statusFilter) {
        return false;
      }
      
      // Filtrar por prioridade
      if (priorityFilter !== "todas" && ticket.priority !== priorityFilter) {
        return false;
      }
      
      // Filtrar por texto de busca
      if (ticketSearchQuery && !ticket.title.toLowerCase().includes(ticketSearchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  // Função para obter o badge de status com as cores corretas
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberto":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Aberto</Badge>
      case "em_andamento":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Em Andamento</Badge>
      case "pendente":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pendente</Badge>
      case "resolvido":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolvido</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  // Função para obter o badge de prioridade com as cores corretas
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alta</Badge>
      case "média":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Média</Badge>
      case "baixa":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Baixa</Badge>
      default:
        return <Badge>Desconhecida</Badge>
    }
  }

  // Função para navegar para a página de detalhes do ticket
  const navigateToTicketDetail = (ticketId: string) => {
    router.push(`/candidate-dashboard/support/ticket/${ticketId}`)
  }

  // Função para filtrar e ordenar artigos
  const getFilteredArticles = () => {
    // Primeiro filtra por categoria e termos de busca
    const filteredArticles = knowledgeBaseArticles.filter(article => 
      (selectedCategory === "todos" || article.categoryId === selectedCategory) &&
      (knowledgeBaseSearch === "" || 
        article.title.toLowerCase().includes(knowledgeBaseSearch.toLowerCase()) ||
        article.description.toLowerCase().includes(knowledgeBaseSearch.toLowerCase()))
    );
    
    // Depois ordena: não lidos primeiro, lidos por último
    return filteredArticles.sort((a, b) => {
      const isARead = readArticles.includes(a.id);
      const isBRead = readArticles.includes(b.id);
      
      if (isARead && !isBRead) return 1;      // A foi lido, B não foi lido: B vem primeiro
      if (!isARead && isBRead) return -1;     // A não foi lido, B foi lido: A vem primeiro
      return 0;                               // Ambos lidos ou ambos não lidos: mantém a ordem original
    });
  }

  const viewArticle = (articleId: string) => {
    // Removi a marcação automática como lido
    setSelectedArticle(articleId)
  }

  // Função para marcar artigo como lido
  const markAsRead = (articleId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Evita que o clique propague para o card e abra o artigo
    }
    
    if (!readArticles.includes(articleId)) {
      setReadArticles(prev => [...prev, articleId]);
    }
  }

  // Função para marcar artigo como não lido
  const markAsUnread = (articleId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Evita que o clique propague para o card e abra o artigo
    }
    setReadArticles(prev => prev.filter(id => id !== articleId));
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Suporte ao Candidato</h2>
          <p className="text-muted-foreground">Crie tickets de suporte e acompanhe suas solicitações</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setNewTicketOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Ticket
          </Button>
        </div>
      </div>

      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar um novo ticket de suporte.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket-title" className="text-right">
                Título
              </Label>
              <Input 
                id="ticket-title" 
                placeholder="Digite o título do ticket" 
                className="col-span-3"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket-category" className="text-right">
                Categoria
              </Label>
              <Select value={ticketCategory} onValueChange={setTicketCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="currículo">Currículo</SelectItem>
                  <SelectItem value="candidatura">Candidatura</SelectItem>
                  <SelectItem value="documentos">Documentos</SelectItem>
                  <SelectItem value="notificações">Notificações</SelectItem>
                  <SelectItem value="sugestão">Sugestão</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket-priority" className="text-right">
                Prioridade
              </Label>
              <Select value={ticketPriority} onValueChange={setTicketPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="média">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket-description" className="text-right">
                Descrição
              </Label>
              <Textarea 
                id="ticket-description" 
                placeholder="Descreva detalhadamente o problema ou solicitação" 
                className="col-span-3"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleCreateTicket}>Criar Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="tickets" className="mt-6">
        <TabsList>
          <TabsTrigger value="tickets">Meus Tickets</TabsTrigger>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="knowledge">Base de Conhecimento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Histórico de Tickets</h3>
              <p className="text-sm text-muted-foreground">Acompanhe o status de suas solicitações</p>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Buscar tickets..."
                value={ticketSearchQuery}
                onChange={(e) => setTicketSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Seus Tickets</CardTitle>
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="aberto">Abertos</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="pendente">Pendentes</SelectItem>
                      <SelectItem value="resolvido">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>
                {getFilteredTickets().length} tickets encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredTickets().length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Última Resposta</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTickets().map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-left font-normal hover:underline"
                            onClick={() => navigateToTicketDetail(ticket.id)}
                          >
                            {ticket.title}
                          </Button>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {ticket.lastResponseDate}, {ticket.lastResponseTime}
                            </span>
                            {ticket.lastResponseBy === "Equipe" ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Equipe
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                Você
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-muted-foreground">
                            {ticket.date}, {ticket.createdTime}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigateToTicketDetail(ticket.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum ticket encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Você não possui tickets com os filtros selecionados.
                  </p>
                  <Button onClick={() => setNewTicketOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar Novo Ticket
                  </Button>
                </div>
              )}
            </CardContent>
            {getFilteredTickets().length > 0 && (
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {getFilteredTickets().length} de {tickets.length} tickets
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Encontre respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Não encontrou o que procurava? Crie um ticket de suporte e nossa equipe responderá o mais breve possível.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
              <h3 className="text-xl font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Base de Conhecimento
              </h3>
              <p className="text-sm text-muted-foreground">
                Tudo o que você precisa saber para aproveitar ao máximo a plataforma
              </p>
                </div>
            <div className="relative w-full md:w-[280px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos..."
                value={knowledgeBaseSearch}
                onChange={(e) => setKnowledgeBaseSearch(e.target.value)}
                className="pl-8"
              />
                </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar de categorias */}
            <div className="md:col-span-1">
          <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Categorias</CardTitle>
            </CardHeader>
                <CardContent className="py-1">
                  <div className="space-y-1">
                    <Button 
                      variant={selectedCategory === "todos" ? "default" : "ghost"} 
                      className="w-full justify-start font-normal"
                      onClick={() => setSelectedCategory("todos")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Todos os artigos
                    </Button>
                    
                    {knowledgeBaseCategories.map((category) => (
                      <Button 
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"} 
                        className="w-full justify-start font-normal"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.title}</span>
                      </Button>
                    ))}
                </div>
                </CardContent>
              </Card>
                </div>

            {/* Lista de artigos */}
            <div className="md:col-span-3">
              <div className="mb-4">
                <h3 className="text-lg font-medium">
                  {selectedCategory === "todos" 
                    ? "Todos os Artigos" 
                    : knowledgeBaseCategories.find(c => c.id === selectedCategory)?.title}
                </h3>
                {selectedCategory !== "todos" && (
                  <p className="text-sm text-muted-foreground">
                    {knowledgeBaseCategories.find(c => c.id === selectedCategory)?.description}
                  </p>
                )}
              </div>

              {getFilteredArticles().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredArticles().map(article => {
                    const isRead = readArticles.includes(article.id);
                    return (
                      <Card 
                        key={article.id}
                        className={cn(
                          "cursor-pointer transition-all duration-300 overflow-hidden",
                          isRead 
                            ? "bg-muted/50 border-muted" // Artigos lidos com background mais neutro
                            : "bg-card shadow-sm border-l-4 border-l-primary hover:shadow-md" // Artigos não lidos com destaque
                        )}
                        onClick={() => viewArticle(article.id)}
                      >
                        <div className="relative">
                          {/* Marcador visual para artigos não lidos */}
                          {!isRead && (
                            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary animate-pulse" />
                          )}
                          
                          <CardHeader className={cn(
                            "py-3",
                            isRead && "opacity-75" // Conteúdo mais suave para artigos lidos
                          )}>
                            <div className="flex items-center gap-2 mb-1">
                              {/* Ícone da categoria com cor ajustada por estado */}
                              <div className={isRead ? "opacity-60" : ""}>
                                {knowledgeBaseCategories.find(c => c.id === article.categoryId)?.icon}
                              </div>
                              
                              <span className="text-sm text-muted-foreground">
                                {knowledgeBaseCategories.find(c => c.id === article.categoryId)?.title}
                              </span>
                              
                              {/* Badge diferenciada por estado substituída por botões */}
                              {isRead ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="ml-auto h-7 px-2 py-1 text-xs bg-muted border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10"
                                  onClick={(e) => markAsUnread(article.id, e)}
                                >
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  Marcar como não lido
                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="ml-auto h-7 px-2 py-1 text-xs bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                                  onClick={(e) => markAsRead(article.id, e)}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Marcar como lido
                </Button>
                              )}
              </div>
                            
                            {/* Título com estilo diferenciado por estado */}
                            <CardTitle className={cn(
                              "text-base",
                              isRead 
                                ? "text-muted-foreground font-normal" 
                                : "text-foreground font-semibold"
                            )}>
                              {article.title}
                            </CardTitle>
                            
                            {/* Descrição com opacidade ajustada por estado */}
                            <CardDescription className={isRead ? "opacity-60" : "opacity-100"}>
                              {article.description}
                            </CardDescription>
                            
                            {/* Barra de status na parte inferior */}
                            <div className="flex items-center justify-between mt-3 pt-2 text-xs border-t border-border/50">
                              <div className={cn(
                                "flex items-center gap-1",
                                isRead ? "text-muted-foreground/70" : "text-primary font-medium"
                              )}>
                                {isRead ? (
                                  <>
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    <span>Artigo lido</span>
                                  </>
                                ) : (
                                  <>
                                    <BookOpen className="h-3.5 w-3.5" />
                                    <span>Artigo não lido</span>
                                  </>
                                )}
                              </div>
                              
                              <div className={cn(
                                "flex items-center",
                                isRead ? "text-muted-foreground/70" : "text-primary"
                              )}>
                                <span>Ver artigo</span>
                                <ChevronRight className="h-3.5 w-3.5 ml-1" />
                              </div>
                            </div>
                          </CardHeader>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Nenhum artigo corresponde aos seus critérios de busca. Tente ajustar seus filtros ou termos de busca.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("todos");
                        setKnowledgeBaseSearch("");
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explorar todos os artigos
                    </Button>
            </CardContent>
          </Card>
              )}
            </div>
          </div>

          {/* Modal aprimorado para visualização de artigos */}
          <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden p-0">
              {(() => {
                const article = knowledgeBaseArticles.find(a => a.id === selectedArticle);
                if (!article) return null;
                
                const category = knowledgeBaseCategories.find(c => c.id === article.categoryId);
                
                // Encontrar artigos da mesma categoria para navegação
                const categoryArticles = knowledgeBaseArticles.filter(a => a.categoryId === article.categoryId);
                const currentIndex = categoryArticles.findIndex(a => a.id === article.id);
                const previousArticle = currentIndex > 0 ? categoryArticles[currentIndex - 1] : null;
                const nextArticle = currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null;
                
                // Calcular tempo estimado de leitura (baseado em 200 palavras por minuto)
                const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
                const readingTime = Math.max(1, Math.ceil(wordCount / 200));
                
                return (
                  <>
                    {/* Barra de progresso de leitura no topo */}
                    <div className="w-full h-1 bg-muted">
                      <div className="h-full bg-primary w-0 progress-bar" />
                  </div>
                    
                    {/* Cabeçalho com navegação */}
                    <div className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-full ${category?.id === "primeiros-passos" ? "bg-blue-100" : 
                          category?.id === "curriculo" ? "bg-green-100" : 
                          category?.id === "candidaturas" ? "bg-purple-100" :
                          category?.id === "entrevistas" ? "bg-orange-100" :
                          category?.id === "mensagens" ? "bg-cyan-100" : "bg-yellow-100"}`}>
                          {category?.icon}
                </div>
                  <div>
                          <p className="text-sm font-medium">{category?.title}</p>
                          <p className="text-xs text-muted-foreground">Artigo {currentIndex + 1} de {categoryArticles.length}</p>
                  </div>
                </div>
                      
                      <div className="flex items-center gap-2">
                        {readArticles.includes(article.id) ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-muted-foreground bg-muted border-muted-foreground/30 hover:bg-muted-foreground/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsUnread(article.id);
                            }}
                          >
                            <BookOpen className="h-4 w-4 mr-1.5" />
                            Marcar como não lido
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-primary-foreground bg-primary border-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(article.id);
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1.5" />
                            Marcar como lido
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => setSelectedArticle(null)}
                        >
                          Fechar
                        </Button>
                  </div>
                </div>
                    
                    <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 py-4">
                      {/* Título e metadados */}
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">{article.title}</h2>
                        <p className="text-muted-foreground mt-1 mb-3">{article.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {readingTime} min de leitura
              </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Atualizado em {article.date}
        </div>
      </div>
    </div>
                      
                      {/* Conteúdo do artigo */}
                      <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-strong:font-semibold prose-a:text-primary max-w-none my-8">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                      </div>
                      
                      {/* Feedback e ações */}
                      <div className="bg-muted/30 rounded-lg p-4 my-8">
                        <p className="text-sm font-medium mb-3">Este artigo foi útil para você?</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1.5" /> Sim
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            Sugerir melhorias
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Navegação entre artigos no rodapé */}
                    <div className="border-t px-6 py-4 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => previousArticle && viewArticle(previousArticle.id)}
                        disabled={!previousArticle}
                        className={!previousArticle ? "invisible" : ""}
                      >
                        <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                        {previousArticle && (
                          <span className="truncate max-w-[150px]">{previousArticle.title}</span>
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => nextArticle && viewArticle(nextArticle.id)}
                        disabled={!nextArticle}
                        className={!nextArticle ? "invisible" : ""}
                      >
                        {nextArticle && (
                          <span className="truncate max-w-[150px]">{nextArticle.title}</span>
                        )}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </>
                );
              })()}
            </DialogContent>
          </Dialog>
          
          {/* Script para barra de progresso de leitura */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const updateReadingProgress = () => {
                  const article = document.querySelector('.DialogContent .overflow-y-auto');
                  if (article) {
                    const progress = (article.scrollTop / (article.scrollHeight - article.clientHeight)) * 100 || 0;
                    const progressBar = document.querySelector('.progress-bar');
                    if (progressBar) {
                      progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
                    }
                  }
                };
                
                const observer = new MutationObserver((mutations) => {
                  const dialogContent = document.querySelector('.DialogContent .overflow-y-auto');
                  if (dialogContent) {
                    dialogContent.addEventListener('scroll', updateReadingProgress);
                    updateReadingProgress();
                  }
                });
                
                observer.observe(document.body, { childList: true, subtree: true });
              });
            `
          }} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 