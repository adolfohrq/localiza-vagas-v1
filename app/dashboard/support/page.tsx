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

// Importando o componente PageHeader e o tipo PageHeaderAction
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

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
      question: "Como publicar uma nova vaga?",
      answer:
        "Para publicar uma nova vaga, acesse a seção 'Vagas' no menu lateral e clique em 'Criar Nova Vaga'. Preencha todos os campos obrigatórios como título, descrição, requisitos e benefícios. Após revisar as informações, clique em 'Publicar' para disponibilizar a vaga aos candidatos.",
    },
    {
      question: "Como analisar candidaturas recebidas?",
      answer:
        "Acesse a seção 'Candidaturas' no menu lateral. Selecione a vaga para visualizar todos os candidatos. Você pode filtrar por critérios como formação, experiência ou habilidades, além de classificar os candidatos usando nosso sistema de estrelas.",
    },
    {
      question: "Como entrar em contato com um candidato?",
      answer:
        "Ao visualizar o perfil de um candidato, clique no botão 'Contatar'. Você pode enviar mensagens diretas, agendar entrevistas ou solicitar informações adicionais. Todas as interações ficam registradas no histórico de comunicação.",
    },
    {
      question: "Como gerenciar os planos de contratação?",
      answer:
        "Acesse 'Configurações > Assinatura e Planos' no menu lateral. Lá você encontrará informações sobre seu plano atual, histórico de pagamentos e opções para upgrade. Você também pode gerenciar o número de vagas disponíveis e recursos adicionais.",
    },
  ])

  // Base de conhecimento - categorias e artigos
  const [knowledgeBaseCategories] = useState([
    {
      id: "primeiros-passos",
      title: "Primeiros Passos",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      description: "Guias de introdução à plataforma para recrutadores"
    },
    {
      id: "publicacao-vagas",
      title: "Publicação de Vagas",
      icon: <FileCheck className="h-5 w-5 text-green-500" />,
      description: "Como criar anúncios eficientes para atrair talentos qualificados"
    },
    {
      id: "gestao-candidatos",
      title: "Gestão de Candidatos",
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      description: "Ferramentas para acompanhar e avaliar candidaturas"
    },
    {
      id: "entrevistas",
      title: "Agendamento de Entrevistas",
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      description: "Organização e condução de entrevistas com candidatos"
    },
    {
      id: "mensagens",
      title: "Comunicação",
      icon: <MessageSquare className="h-5 w-5 text-cyan-500" />,
      description: "Como se comunicar eficientemente com candidatos"
    },
    {
      id: "relatorios",
      title: "Relatórios e Análises",
      icon: <BarChart className="h-5 w-5 text-yellow-500" />,
      description: "Métricas e insights do processo de recrutamento"
    }
  ])

  const [knowledgeBaseArticles] = useState([
    // Primeiros Passos
    {
      id: "1",
      categoryId: "primeiros-passos",
      title: "Como começar a usar a plataforma",
      description: "Um guia completo para novas empresas",
      content: `
        <h2 class="text-2xl font-bold text-primary mb-4">Bem-vindo à LocalizaVagas - Área de Recrutamento!</h2>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p class="font-medium">Este guia passo a passo ajudará sua empresa a começar a usar nossa plataforma da maneira mais eficiente, garantindo que você aproveite todos os recursos disponíveis para encontrar os melhores talentos para sua organização.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Complete o perfil da empresa — A primeira impressão é fundamental</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Um perfil de empresa completo aumenta a credibilidade e atrai candidatos de alta qualidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Informações da empresa</strong>: Adicione dados completos, logotipo profissional e imagens do ambiente de trabalho (empresas com perfis completos recebem até 35% mais candidaturas).</li>
            <li><strong>Cultura e valores</strong>: Descreva a cultura organizacional e os valores que orientam sua empresa.</li>
            <li><strong>Benefícios oferecidos</strong>: Destaque os diferenciais que sua empresa oferece aos colaboradores.</li>
            <li><strong>Depoimentos</strong>: Inclua depoimentos de funcionários para humanizar sua marca empregadora.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Atualize o perfil da empresa regularmente. Candidatos valorizam empresas que mantêm suas informações atualizadas.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Crie anúncios de vagas otimizados</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Nosso sistema ajuda você a criar anúncios de vagas que realmente atraem candidatos qualificados:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Use o assistente de vagas</strong>: Nossa ferramenta guiará você na criação de anúncios completos e atrativos.</li>
            <li><strong>Destaque responsabilidades e requisitos</strong>: Seja claro sobre o que é essencial e o que é desejável.</li>
            <li><strong>Palavras-chave estratégicas</strong>: Inclua termos relevantes da área para otimizar a visibilidade nos sistemas de busca.</li>
            <li><strong>Seja transparente</strong>: Informações sobre faixa salarial aumentam em 72% o número de candidaturas qualificadas.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Evite descrições genéricas. Quanto mais específico for o anúncio, mais qualificados serão os candidatos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Configure filtros de triagem</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Automatize a primeira etapa do recrutamento com filtros inteligentes:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Requisitos eliminatórios</strong>: Defina critérios obrigatórios como formação, experiência ou certificações.</li>
            <li><strong>Testes automatizados</strong>: Configure avaliações técnicas ou comportamentais para pré-selecionar candidatos.</li>
            <li><strong>Perguntas de triagem</strong>: Adicione questões específicas para avaliar adequação à vaga e à cultura da empresa.</li>
            <li><strong>IA de compatibilidade</strong>: Use nossa inteligência artificial para classificar candidatos por índice de adequação.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Revise periodicamente seus filtros para garantir que não estejam eliminando candidatos qualificados por critérios muito restritivos.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Gerencie candidaturas eficientemente</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Organize seu pipeline de recrutamento para maximizar a eficiência:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Painéis personalizados</strong>: Crie fluxos de trabalho que refletem as etapas do seu processo seletivo.</li>
            <li><strong>Feedback estruturado</strong>: Registre avaliações padronizadas para cada candidato.</li>
            <li><strong>Colaboração da equipe</strong>: Compartilhe perfis e avaliações com gerentes e outros recrutadores.</li>
            <li><strong>Tags e notas</strong>: Adicione marcadores para facilitar a identificação de candidatos para futuras oportunidades.</li>
          </ul>
          <p class="mt-3 text-blue-600 font-medium">💡 Dica profissional: Estabeleça prazos para cada etapa do processo para evitar que candidatos qualificados percam o interesse.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Comunicação eficiente com candidatos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Mantenha candidatos engajados durante todo o processo:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Modelos de mensagens</strong>: Crie respostas padronizadas para diferentes etapas do processo.</li>
            <li><strong>Atualizações automáticas</strong>: Configure alertas para informar candidatos sobre seu status.</li>
            <li><strong>Agendamento integrado</strong>: Utilize nossa ferramenta de calendário para marcar entrevistas.</li>
            <li><strong>Feedback aos candidatos</strong>: Ofereça feedback estruturado mesmo para candidatos não selecionados.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Uma experiência positiva do candidato influencia diretamente a imagem da sua empresa. 83% dos candidatos compartilham experiências positivas com sua rede profissional.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">Próximos passos e recursos adicionais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Conforme sua equipe se familiariza com a plataforma, explore estes recursos avançados:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Integrações com ATS existentes</strong>: Conecte nossa plataforma com outros sistemas que sua empresa já utiliza.</li>
            <li><strong>Analytics de recrutamento</strong>: Acompanhe métricas como tempo para contratar, custo por contratação e desempenho de fontes de candidatos.</li>
            <li><strong>Programas de referência</strong>: Configure incentivos para funcionários que indicam candidatos contratados.</li>
            <li><strong>Banco de talentos</strong>: Mantenha uma base de candidatos qualificados para futuras oportunidades.</li>
          </ul>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Lembre-se:</h4>
          <p class="mb-4">O recrutamento eficiente é um diferencial competitivo. Nossa plataforma usa inteligência artificial para conectar sua empresa aos melhores talentos do mercado, reduzindo tempo e custos do processo.</p>
          <p class="font-medium">Comece agora mesmo configurando seu perfil de empresa e publicando suas vagas. Nossa equipe de suporte está disponível para ajudar em cada etapa do processo!</p>
        </div>
      `,
      date: "2023-12-05"
    },
    // Novo artigo sobre Gestão de Vagas
    {
      id: "20",
      categoryId: "publicacao-vagas",
      title: "Gerenciamento eficiente de vagas publicadas",
      description: "Como administrar, editar e acompanhar suas vagas na plataforma",
      content: `
        <h2 class="text-2xl font-bold text-green-700 mb-4">Gerenciamento completo das suas vagas</h2>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p class="font-medium">O painel de gerenciamento de vagas permite controlar todo o ciclo de vida dos seus anúncios, desde a criação até o encerramento do processo seletivo. Este guia mostra como utilizar todas as ferramentas disponíveis para maximizar seus resultados de recrutamento.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Visualização geral das suas vagas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">A tela principal de gerenciamento oferece um panorama completo de todas as suas vagas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Dashboard de vagas</strong>: Acesse em <code>/dashboard/vagas</code> para visualizar todas as vagas ativas, pausadas e encerradas.</li>
            <li><strong>Métricas em tempo real</strong>: Para cada vaga, veja rapidamente o número de visualizações, candidaturas e taxa de conversão.</li>
            <li><strong>Status visual</strong>: Identificação por cores permite diferenciar rapidamente vagas ativas (verde), pausadas (amarelo) e encerradas (cinza).</li>
            <li><strong>Filtros inteligentes</strong>: Utilize filtros por departamento, localização, data de publicação ou status para encontrar rapidamente vagas específicas.</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Configure a visualização padrão para mostrar primeiro as vagas com maior número de candidatos qualificados, otimizando seu tempo de análise.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Edição e atualização de vagas publicadas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Mantenha suas vagas atualizadas para aumentar sua relevância:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Edição rápida</strong>: Clique no botão "Editar" para modificar detalhes da vaga sem precisar republicá-la.</li>
            <li><strong>Histórico de alterações</strong>: Acompanhe todas as modificações feitas em cada vaga, incluindo quem as fez e quando.</li>
            <li><strong>Atualização de destaque</strong>: Renove o destaque da vaga com um clique para mantê-la no topo das buscas.</li>
            <li><strong>Extensão de prazo</strong>: Prolongue o período de uma vaga próxima ao vencimento sem perder as candidaturas já recebidas.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Alterações significativas em requisitos ou benefícios podem afetar a percepção dos candidatos. Considere notificar candidatos já inscritos sobre mudanças relevantes.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Controle de visibilidade e promoção</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Maximize a exposição das suas vagas com ferramentas de promoção integradas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Opções de destaque</strong>: Escolha entre diferentes níveis de promoção para aumentar a visibilidade da vaga.</li>
            <li><strong>Compartilhamento direto</strong>: Gere links personalizados para compartilhar em redes sociais ou campanhas específicas.</li>
            <li><strong>Programação de publicação</strong>: Agende quando uma vaga deve ficar visível, ideal para lançamentos coordenados.</li>
            <li><strong>Restrição de acesso</strong>: Configure vagas privadas, visíveis apenas para candidatos selecionados ou com código de acesso.</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Vagas destacadas recebem em média 4,2x mais visualizações e 2,8x mais candidaturas qualificadas do que vagas padrão.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Duplicação e templates de vagas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Otimize seu processo de criação com ferramentas de replicação:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Duplicação com um clique</strong>: Crie uma nova vaga baseada em uma existente, mantendo formatação e requisitos.</li>
            <li><strong>Templates corporativos</strong>: Salve e gerencie modelos padronizados para diferentes departamentos ou tipos de posição.</li>
            <li><strong>Importação em massa</strong>: Carregue múltiplas vagas simultaneamente através de planilha para processos de expansão.</li>
            <li><strong>Versionamento de anúncios</strong>: Compare diferentes versões de um anúncio para identificar qual gera melhores resultados.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <p class="font-medium text-slate-800 mb-1">Template eficiente:</p>
              <p class="text-slate-700 text-sm">Inclui todos os elementos essenciais: título claro, resumo conciso, responsabilidades bem definidas, requisitos obrigatórios vs. desejáveis, e pacote de benefícios.</p>
            </div>
            <div class="bg-red-50 p-3 rounded border border-red-200">
              <p class="font-medium text-slate-800 mb-1">Template a evitar:</p>
              <p class="text-slate-700 text-sm">Descrição genérica, linguagem corporativa excessiva, requisitos ambíguos, benefícios vagos ("pacote atrativo") e falta de informações sobre próximos passos.</p>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Monitoramento de desempenho</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Acompanhe e otimize o desempenho de cada vaga em tempo real:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Dashboard analítico</strong>: Visualize métricas detalhadas sobre visualizações, cliques, inicios de candidatura e finalizações.</li>
            <li><strong>Análise de funil</strong>: Identifique em qual etapa do processo os candidatos estão desistindo para otimizar a experiência.</li>
            <li><strong>Comparativo de vagas</strong>: Compare o desempenho entre vagas similares para identificar melhores práticas.</li>
            <li><strong>Alertas personalizados</strong>: Configure notificações para métricas abaixo do esperado ou quando atingir objetivos.</li>
          </ul>
          <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <p class="text-sm"><strong>Métricas-chave a monitorar:</strong> Taxa de clique (CTR) do título, tempo médio de leitura da vaga, taxa de início de candidatura, taxa de conclusão de candidatura, e qualificação média dos candidatos.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Encerramento e arquivamento</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Gerencie adequadamente o ciclo final das suas vagas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Encerramento programado</strong>: Defina antecipadamente quando a vaga deve ser automaticamente fechada.</li>
            <li><strong>Notificação automática</strong>: Informe os candidatos quando uma vaga for encerrada ou preenchida.</li>
            <li><strong>Arquivamento inteligente</strong>: Mantenha histórico organizado de vagas passadas com todos os dados de performance.</li>
            <li><strong>Reabertura facilitada</strong>: Reactive rapidamente vagas arquivadas quando surgir necessidade similar.</li>
          </ul>
          <p class="mt-3 text-green-600 font-medium">💡 Dica profissional: Ao encerrar uma vaga, aproveite para exportar um relatório completo de desempenho para compartilhar com stakeholders internos.</p>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Recursos avançados disponíveis no plano Premium:</h4>
          <ul class="list-disc ml-6 space-y-1">
            <li>Publicação multicanal automática (LinkedIn, Indeed, Google Jobs)</li>
            <li>A/B testing de títulos e descrições de vagas</li>
            <li>Análise comparativa com mercado (benchmark de salários e benefícios)</li>
            <li>Personalização avançada da página da vaga com branding da empresa</li>
            <li>Indicadores preditivos de sucesso baseados em IA</li>
          </ul>
          <p class="mt-4 font-medium">Maximize seu investimento em recrutamento através de um gerenciamento eficiente de vagas. Empresas que atualizam regularmente suas vagas e utilizam recursos de destaque têm um tempo médio de preenchimento 47% menor.</p>
        </div>
      `,
      date: "2024-02-15"
    },
    // Novo artigo sobre Análise de Candidatos
    {
      id: "21",
      categoryId: "gestao-candidatos",
      title: "Análise e triagem avançada de candidatos",
      description: "Métodos eficientes para avaliar e classificar candidaturas",
      content: `
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Avaliação estratégica de candidatos</h2>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p class="font-medium">Nosso sistema de análise de candidatos combina automação inteligente com ferramentas de avaliação detalhada para ajudar sua equipe a identificar os melhores talentos rapidamente. Este guia explora as funcionalidades disponíveis no painel de candidaturas para otimizar seu processo seletivo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Visão centralizada de candidaturas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O painel de candidaturas oferece uma visão completa de todos os candidatos:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Acesso unificado</strong>: Visualize candidaturas de todas as vagas em <code>/dashboard/candidatos</code> ou filtre por vaga específica.</li>
            <li><strong>Classificação automática</strong>: Candidatos são pré-classificados por nível de correspondência aos requisitos da vaga (Alta/Média/Básica).</li>
            <li><strong>Visualização personalizada</strong>: Configure quais informações dos candidatos são exibidas na lista principal (ex: experiência, formação, localização).</li>
            <li><strong>Candidaturas recentes</strong>: Destaque automático para candidaturas novas que precisam de avaliação.</li>
          </ul>
          <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <p class="text-sm"><strong>Dados de performance:</strong> Empresas que avaliam candidaturas em até 48h após o recebimento têm 35% mais chances de contratar os candidatos de alta correspondência.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Ferramentas de triagem inicial</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Otimize a primeira etapa de avaliação com recursos inteligentes:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Filtros avançados</strong>: Refine candidatos por critérios como formação, anos de experiência, habilidades específicas, localização e disponibilidade.</li>
            <li><strong>Triagem por palavras-chave</strong>: Busque termos específicos nos currículos e cartas de apresentação para identificar rapidamente candidatos com experiências relevantes.</li>
            <li><strong>Comparação lado a lado</strong>: Selecione até 4 candidatos para uma visualização comparativa detalhada.</li>
            <li><strong>Tags personalizadas</strong>: Crie e aplique tags como "Entrevistar", "Potencial", "Considerar para outras vagas" para organizar candidatos.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Defina critérios de triagem antes de iniciar a análise para garantir consistência na avaliação entre todos os candidatos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Análise detalhada de currículos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Ferramentas para uma avaliação aprofundada da experiência e qualificações:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Visualizador inteligente</strong>: Destaque automático de palavras-chave relevantes para a vaga no currículo do candidato.</li>
            <li><strong>Verificação de lacunas</strong>: Identificação de períodos sem atividade profissional ou acadêmica para avaliação.</li>
            <li><strong>Análise de progressão</strong>: Visualize graficamente a evolução da carreira do candidato, incluindo progressão salarial quando disponível.</li>
            <li><strong>Extração de competências</strong>: Identificação automática das principais habilidades técnicas e comportamentais mencionadas no currículo.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div class="bg-purple-50 p-3 rounded border border-purple-200">
              <p class="font-medium text-slate-800 mb-1">O que observar:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Relevância das experiências anteriores</li>
                <li>Realizações quantificáveis</li>
                <li>Progressão consistente de carreira</li>
                <li>Habilidades complementares ao cargo</li>
              </ul>
            </div>
            <div class="bg-purple-50 p-3 rounded border border-purple-200">
              <p class="font-medium text-slate-800 mb-1">Sinais de atenção:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Mudanças frequentes de emprego sem progressão clara</li>
                <li>Descrições genéricas sem resultados específicos</li>
                <li>Inconsistências nas datas ou informações</li>
                <li>Ausência de habilidades essenciais para a função</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Avaliações e testes automáticos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Complemente a análise com ferramentas de avaliação objetiva:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Testes técnicos personalizados</strong>: Configure avaliações específicas por vaga, com correção automática.</li>
            <li><strong>Questionários eliminatórios</strong>: Crie perguntas de triagem para verificar requisitos essenciais.</li>
            <li><strong>Teste de fit cultural</strong>: Avalie a compatibilidade do candidato com os valores e cultura da empresa.</li>
            <li><strong>Integração com ferramentas externas</strong>: Conecte-se com plataformas especializadas em avaliações técnicas como HackerRank, Codility e TestGorilla.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Assegure-se de que todos os testes aplicados são relevantes para a função e livres de vieses que possam afetar grupos específicos de candidatos.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Sistema de classificação e feedback</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Mantenha um registro estruturado das avaliações:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Avaliação por estrelas</strong>: Classifique candidatos em diferentes critérios (experiência, qualificações, comunicação, etc).</li>
            <li><strong>Notas padronizadas</strong>: Utilize formulários de avaliação consistentes para todos os avaliadores.</li>
            <li><strong>Feedback colaborativo</strong>: Permita que diferentes membros da equipe avaliem o mesmo candidato e visualize um resumo consolidado.</li>
            <li><strong>Histórico de status</strong>: Acompanhe a jornada completa do candidato através das etapas do processo seletivo.</li>
          </ul>
          <p class="mt-3 text-purple-600 font-medium">💡 Dica profissional: Estabeleça critérios claros de pontuação para minimizar a subjetividade nas avaliações, especialmente quando múltiplos recrutadores estão envolvidos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Comunicação com candidatos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Gerencie interações eficientes diretamente da plataforma:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Templates personalizáveis</strong>: Utilize modelos pré-definidos para diferentes etapas do processo (triagem, agendamento, feedback).</li>
            <li><strong>Comunicação em massa</strong>: Envie atualizações para grupos específicos de candidatos simultaneamente.</li>
            <li><strong>Histórico centralizado</strong>: Acesse todas as conversas anteriores com cada candidato para manter a continuidade.</li>
            <li><strong>Notificações automáticas</strong>: Configure alertas para respostas de candidatos ou ações necessárias.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">A comunicação rápida e transparente impacta diretamente na experiência do candidato. 78% dos profissionais afirmam que a rapidez de resposta influencia sua percepção sobre a empresa.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Recursos avançados de análise disponíveis no plano Premium:</h4>
          <ul class="list-disc ml-6 space-y-1">
            <li>Verificação automatizada de referências profissionais</li>
            <li>Análise preditiva de performance com base em contratações anteriores</li>
            <li>Avaliação comportamental baseada em vídeo-entrevistas assíncronas</li>
            <li>Integração com sistemas de background check</li>
            <li>Análise comparativa de candidatos com profissionais do mercado</li>
          </ul>
          <p class="mt-4 font-medium">Uma avaliação estruturada e consistente não apenas melhora a qualidade das contratações, mas também reduz o tempo médio de preenchimento de vagas em até 40%. Invista tempo na configuração inicial do seu processo para colher resultados a longo prazo.</p>
        </div>
      `,
      date: "2024-02-28"
    },
    // Novo artigo sobre Relatórios e Métricas
    {
      id: "22",
      categoryId: "relatorios",
      title: "Relatórios e métricas de recrutamento",
      description: "Como utilizar dados para otimizar seu processo seletivo",
      content: `
        <h2 class="text-2xl font-bold text-yellow-700 mb-4">Analytics de recrutamento baseado em dados</h2>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p class="font-medium">O módulo de relatórios oferece métricas e insights que transformam dados brutos em informações estratégicas para seu departamento de RH. Este guia apresenta as principais funcionalidades analíticas disponíveis no dashboard para melhorar a eficiência e a qualidade das suas contratações.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Visão geral do dashboard analítico</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">O painel de métricas centraliza todos os indicadores-chave de recrutamento:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Acesso rápido</strong>: Visualize estatísticas em <code>/dashboard/relatorios</code> com opções de filtragem por período, departamento e fonte de recrutamento.</li>
            <li><strong>Indicadores em tempo real</strong>: Acompanhe métricas que se atualizam instantaneamente conforme novas ações são realizadas na plataforma.</li>
            <li><strong>Visualizações personalizáveis</strong>: Arraste e solte widgets para criar um dashboard personalizado com os indicadores mais relevantes para sua empresa.</li>
            <li><strong>Exportação facilitada</strong>: Gere relatórios em PDF, Excel ou apresentações em PowerPoint com um clique para compartilhar com stakeholders.</li>
          </ul>
          <div class="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
            <p class="text-sm"><strong>Melhores práticas:</strong> Realize reuniões semanais de análise de métricas com a equipe de recrutamento para identificar gargalos e oportunidades de melhoria nos processos.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Métricas de eficiência do processo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Acompanhe indicadores que medem a velocidade e efetividade do recrutamento:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Tempo médio de preenchimento</strong>: Meça o período desde a abertura da vaga até a aceitação da oferta, com breakdowns por departamento e senioridade.</li>
            <li><strong>Tempo por etapa</strong>: Identifique gargalos visualizando o tempo médio que candidatos permanecem em cada fase do processo.</li>
            <li><strong>Taxa de conversão por etapa</strong>: Acompanhe o percentual de candidatos que avançam de uma fase para a próxima.</li>
            <li><strong>Custo por contratação</strong>: Calcule automaticamente o investimento total para cada vaga preenchida, incluindo anúncios, ferramentas e horas de trabalho.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <p class="font-medium text-slate-800 mb-1">Benchmark do mercado:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Tempo médio de preenchimento: 30-45 dias</li>
                <li>Taxa de conversão CV → Entrevista: 15-20%</li>
                <li>Taxa de aceitação de ofertas: 70-85%</li>
                <li>Custo médio por contratação: R$ 5.000-8.000</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded border border-blue-200">
              <p class="font-medium text-slate-800 mb-1">Como usar estes dados:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Compare com médias do seu setor</li>
                <li>Estabeleça metas progressivas de melhoria</li>
                <li>Identifique anomalias que precisam atenção</li>
                <li>Reconheça equipes com melhor desempenho</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Análise de fontes e canais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Avalie a efetividade de diferentes canais de recrutamento:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Performance por fonte</strong>: Compare volume, qualidade e custo de candidatos provenientes de diferentes origens (LinkedIn, Indeed, site próprio, indicações).</li>
            <li><strong>ROI por canal</strong>: Visualize o retorno sobre investimento de cada plataforma de divulgação de vagas.</li>
            <li><strong>Funil por origem</strong>: Analise como candidatos de diferentes fontes progridem através do processo seletivo.</li>
            <li><strong>Atribuição de multicanal</strong>: Entenda a jornada completa do candidato que interagiu com múltiplas fontes antes da candidatura.</li>
          </ul>
          <p class="mt-3 text-yellow-600 font-medium">💡 Dica profissional: Distribua seu investimento em divulgação com base nos dados de ROI, priorizando canais que trazem não apenas mais candidatos, mas candidatos que chegam às etapas finais do processo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Métricas de qualidade das contratações</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Acompanhe indicadores que medem o sucesso das contratações:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Taxa de retenção</strong>: Monitore a permanência dos contratados após 90 dias, 6 meses e 1 ano.</li>
            <li><strong>Tempo até produtividade</strong>: Meça quanto tempo novos contratados levam para atingir níveis esperados de produtividade.</li>
            <li><strong>Avaliação de desempenho</strong>: Compare as avaliações iniciais dos contratados com as projeções feitas durante o recrutamento.</li>
            <li><strong>Feedback pós-contratação</strong>: Colete avaliações dos gestores e equipes sobre a adequação dos novos colaboradores.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Para métricas de qualidade de contratação, é essencial integrar seu sistema de RH com a plataforma de recrutamento. Configure esta integração em <code>Configurações > Integrações > HRIS</code>.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Análise de diversidade e inclusão</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Monitore e melhore seus indicadores de diversidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Distribuição demográfica</strong>: Visualize a composição de candidatos por gênero, faixa etária, origem geográfica e outros fatores demográficos (quando permitido por lei).</li>
            <li><strong>Análise de funil por grupos</strong>: Identifique se há desbalanceamentos na progressão de diferentes grupos pelo processo seletivo.</li>
            <li><strong>Efetividade de iniciativas</strong>: Meça o impacto de programas específicos para atrair talentos diversos.</li>
            <li><strong>Linguagem inclusiva</strong>: Avalie e receba sugestões para tornar suas descrições de vagas mais inclusivas.</li>
          </ul>
          <p class="mt-3 text-yellow-600 font-medium">💡 Dica profissional: Configure alertas para identificar possíveis vieses no processo seletivo, como taxas de aprovação significativamente diferentes entre grupos demográficos em determinadas etapas.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Relatórios agendados e compartilhamento</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Automatize a distribuição de informações relevantes:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Agendamento de relatórios</strong>: Configure o envio automático de relatórios específicos para stakeholders em intervalos regulares.</li>
            <li><strong>Dashboards compartilháveis</strong>: Crie links para visualizações específicas que podem ser compartilhadas com diferentes níveis de permissão.</li>
            <li><strong>Notificações inteligentes</strong>: Configure alertas baseados em condições específicas, como "tempo de vaga aberta > 45 dias".</li>
            <li><strong>Integração com BI</strong>: Exporte dados para ferramentas como Power BI, Tableau ou Looker para análises mais complexas.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Empresas que adotam decisões baseadas em dados no recrutamento reportam 45% maior satisfação dos gestores com as contratações e 32% menor rotatividade no primeiro ano.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Recursos avançados disponíveis no plano Enterprise:</h4>
          <ul class="list-disc ml-6 space-y-1">
            <li>Previsões baseadas em IA para tempo de preenchimento e chances de aceitação</li>
            <li>Análise preditiva de desempenho de candidatos baseada em contratações anteriores</li>
            <li>Benchmark competitivo com dados anônimos do mercado</li>
            <li>Simulações de cenários para planejamento de capacidade de recrutamento</li>
            <li>Integração com sistemas financeiros para ROI completo das contratações</li>
          </ul>
          <p class="mt-4 font-medium">A capacidade de usar dados de forma estratégica no recrutamento é um diferencial competitivo cada vez mais importante. Empresas que implementam uma cultura de recrutamento orientado a dados conseguem reduzir custos, acelerar contratações e melhorar significativamente a qualidade dos talentos adquiridos.</p>
        </div>
      `,
      date: "2024-03-05"
    },
    // Novo artigo sobre Agendamento de Entrevistas
    {
      id: "23",
      categoryId: "entrevistas",
      title: "Agendamento e gerenciamento de entrevistas",
      description: "Como organizar e conduzir entrevistas eficientes com candidatos",
      content: `
        <h2 class="text-2xl font-bold text-orange-700 mb-4">Entrevistas organizadas e eficientes</h2>
        
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <p class="font-medium">O módulo de agendamento de entrevistas simplifica todo o processo de coordenação, preparação e documentação de entrevistas com candidatos. Este guia apresenta as funcionalidades disponíveis para garantir um processo de entrevista profissional e produtivo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Agendamento inteligente de entrevistas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Organize entrevistas sem conflitos de agenda e esforço manual:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Integração com calendários</strong>: Sincronize automaticamente com Google Calendar, Outlook ou outros sistemas de calendário corporativo.</li>
            <li><strong>Disponibilidade em tempo real</strong>: Visualize a disponibilidade de todos os entrevistadores envolvidos no processo.</li>
            <li><strong>Agendamento automático</strong>: Ofereça múltiplos horários para candidatos escolherem, com confirmação instantânea.</li>
            <li><strong>Templates de convite</strong>: Personalize convites com informações relevantes como local, participantes, e preparação necessária.</li>
          </ul>
          <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <p class="text-sm"><strong>Estatística:</strong> Empresas que implementam agendamento automatizado reduzem em 80% o tempo dedicado à coordenação de entrevistas e diminuem em 65% o número de reagendamentos necessários.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Preparação para entrevistas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Garanta que todos os participantes estejam preparados adequadamente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Pacotes de preparação</strong>: Compartilhe automaticamente o perfil do candidato, currículo e histórico de interações com os entrevistadores.</li>
            <li><strong>Roteiros personalizados</strong>: Crie e distribua roteiros de entrevista específicos para cada função ou nível de senioridade.</li>
            <li><strong>Biblioteca de perguntas</strong>: Acesse um banco de perguntas categorizadas por competência, comportamento ou conhecimento técnico.</li>
            <li><strong>Lembretes automáticos</strong>: Configure notificações para entrevistadores e candidatos antes da entrevista.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div class="bg-orange-50 p-3 rounded border border-orange-200">
              <p class="font-medium text-slate-800 mb-1">Para entrevistadores:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Revise o currículo com antecedência</li>
                <li>Prepare perguntas específicas para o candidato</li>
                <li>Familiarize-se com o roteiro de entrevista</li>
                <li>Defina claramente seu papel na avaliação</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-3 rounded border border-orange-200">
              <p class="font-medium text-slate-800 mb-1">Para candidatos:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Confirme recebimento do convite</li>
                <li>Teste antecipadamente tecnologia (videoconferência)</li>
                <li>Prepare-se com informações sobre a empresa</li>
                <li>Tire dúvidas sobre logística com antecedência</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Condução de entrevistas remotas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Realize entrevistas online com todas as ferramentas necessárias:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Videoconferência integrada</strong>: Conduza entrevistas diretamente na plataforma ou integre com Zoom, Teams ou Google Meet.</li>
            <li><strong>Compartilhamento de tela</strong>: Facilite testes práticos ou discussões sobre portfólios com compartilhamento seguro de tela.</li>
            <li><strong>Gravação (com consentimento)</strong>: Armazene gravações de entrevistas para revisão posterior ou treinamento (sempre com consentimento explícito).</li>
            <li><strong>Controle de acesso</strong>: Gerencie quem pode participar da entrevista com salas de espera virtuais e convites específicos.</li>
          </ul>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Para entrevistas técnicas, use a função de whiteboard colaborativo que permite ao candidato resolver problemas em tempo real, com possibilidade de interação dos entrevistadores.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Avaliação estruturada pós-entrevista</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Capture feedback de forma consistente e objetiva:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Formulários de avaliação</strong>: Utilize templates padronizados para avaliação de candidatos por competências específicas.</li>
            <li><strong>Escalas quantitativas</strong>: Implemente escalas numéricas para facilitar comparação objetiva entre candidatos.</li>
            <li><strong>Feedback qualitativo</strong>: Inclua campos para observações detalhadas sobre pontos fortes e áreas de desenvolvimento.</li>
            <li><strong>Consolidação automática</strong>: Visualize resumos consolidados quando múltiplos avaliadores participam do processo.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Estabeleça prazos claros para submissão de avaliações (idealmente em até 24h após a entrevista) para garantir que as impressões estejam frescas e o processo não seja atrasado.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Gestão de painéis de entrevista</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Organize equipes de entrevistadores de forma eficiente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Painéis pré-configurados</strong>: Crie grupos de entrevistadores específicos para diferentes posições ou departamentos.</li>
            <li><strong>Balanceamento de carga</strong>: Distribua entrevistas equitativamente entre os membros da equipe para evitar sobrecarga.</li>
            <li><strong>Especialização por competência</strong>: Designe avaliadores específicos para diferentes aspectos (técnico, comportamental, cultural).</li>
            <li><strong>Rotação inteligente</strong>: Varie os entrevistadores para reduzir viés e fornecer diferentes perspectivas.</li>
          </ul>
          <p class="mt-3 text-orange-600 font-medium">💡 Dica profissional: Para posições seniores ou estratégicas, considere implementar entrevistas em série (ao invés de painel) para aprofundar diferentes aspectos do perfil do candidato sem sobrecarregá-lo.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Decisão colaborativa e próximos passos</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Facilite o processo de decisão após as entrevistas:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Reuniões de calibração</strong>: Agende automaticamente sessões de discussão entre entrevistadores para alinhamento de percepções.</li>
            <li><strong>Workflow de aprovação</strong>: Implemente fluxos de aprovação para avanço de candidatos entre etapas do processo.</li>
            <li><strong>Comunicação automática</strong>: Envie atualizações de status para candidatos conforme decisões são tomadas.</li>
            <li><strong>Propostas e ofertas</strong>: Gere documentos de oferta diretamente da plataforma, com aprovação dos responsáveis.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Um processo de entrevista bem estruturado não apenas seleciona os melhores candidatos, mas também proporciona uma experiência positiva que fortalece a marca empregadora. 83% dos candidatos afirmam que uma experiência de entrevista negativa pode mudar sua opinião sobre uma empresa que antes consideravam atraente.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Recursos avançados disponíveis nos planos superiores:</h4>
          <ul class="list-disc ml-6 space-y-1">
            <li>Entrevistas assíncronas por vídeo para triagem inicial</li>
            <li>Análise de expressões faciais e linguagem corporal (com consentimento)</li>
            <li>Transcrição automática de entrevistas para referência futura</li>
            <li>Simulações técnicas e práticas integradas para avaliação de habilidades</li>
            <li>Ambiente virtual para dinâmicas de grupo e avaliações coletivas</li>
          </ul>
          <p class="mt-4 font-medium">Invista na qualidade do seu processo de entrevistas. Entrevistadores bem preparados, processos estruturados e avaliações consistentes são fatores determinantes para identificar os melhores talentos para sua organização e proporcionar uma experiência positiva a todos os candidatos.</p>
        </div>
      `,
      date: "2024-03-12"
    },
    
    // Novo artigo sobre Comunicação com Candidatos
    {
      id: "24",
      categoryId: "mensagens",
      title: "Comunicação eficiente com candidatos",
      description: "Estratégias e ferramentas para uma comunicação clara e engajadora",
      content: `
        <h2 class="text-2xl font-bold text-cyan-700 mb-4">Comunicação profissional e engajadora</h2>
        
        <div class="bg-cyan-50 border-l-4 border-cyan-500 p-4 mb-6">
          <p class="font-medium">Uma comunicação eficaz com candidatos não apenas melhora a experiência deles durante o processo seletivo, mas também fortalece a marca empregadora da sua empresa. Este guia apresenta as melhores práticas e ferramentas disponíveis no nosso sistema de mensagens para otimizar sua comunicação com talentos.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Central unificada de mensagens</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Gerencie todas as suas comunicações em um único ambiente:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Caixa de entrada centralizada</strong>: Acesse todas as conversas com candidatos em <code>/dashboard/mensagens</code> com filtros intuitivos.</li>
            <li><strong>Histórico completo</strong>: Visualize todo o histórico de interações com cada candidato em uma única timeline.</li>
            <li><strong>Multiusuário</strong>: Permita que múltiplos recrutadores participem da mesma conversa com visibilidade completa.</li>
            <li><strong>Notificações inteligentes</strong>: Receba alertas personalizados para mensagens prioritárias ou que aguardam resposta.</li>
          </ul>
          <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <p class="text-sm"><strong>Melhores práticas:</strong> Estabeleça um tempo máximo de resposta para mensagens de candidatos (recomendamos dentro de 24h úteis) e configure alertas para mensagens sem resposta há mais de 1 dia.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Templates e respostas padronizadas</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Otimize o tempo de resposta com mensagens pré-formatadas de alta qualidade:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Biblioteca de templates</strong>: Crie, categorize e compartilhe modelos de mensagens para diferentes etapas do processo.</li>
            <li><strong>Campos dinâmicos</strong>: Personalize automaticamente templates com dados do candidato e da vaga (nome, cargo, empresa, etc).</li>
            <li><strong>Variações por contexto</strong>: Mantenha versões diferentes para cada situação (confirmação de recebimento, agendamento, feedback, etc).</li>
            <li><strong>Verificação de qualidade</strong>: Utilize o assistente de escrita para sugerir melhorias e verificar tom e clareza.</li>
          </ul>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <p class="font-medium text-slate-800 mb-1">Exemplo: Confirmação de Recebimento</p>
              <p class="text-sm italic text-slate-700">
                "Olá {nome},<br><br>
                Obrigado por se candidatar à vaga de {cargo} na {empresa}. Confirmamos o recebimento da sua candidatura e seu perfil será analisado pelo nosso time.<br><br>
                Entraremos em contato nos próximos {prazo} dias caso seu perfil seja selecionado para a próxima etapa.<br><br>
                Atenciosamente,<br>
                {seu_nome}<br>
                Time de Recrutamento"
              </p>
            </div>
            <div class="bg-amber-50 p-3 rounded border border-amber-200">
              <p class="font-medium text-slate-800 mb-1">Elementos essenciais:</p>
              <ul class="list-disc ml-4 text-sm">
                <li>Confirmação clara do recebimento</li>
                <li>Expectativa de próximos passos</li>
                <li>Definição de prazo para resposta</li>
                <li>Tom profissional mas acolhedor</li>
                <li>Personalização com dados específicos</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">3. Comunicação em massa com personalização</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Envie mensagens para múltiplos candidatos mantendo um toque pessoal:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Segmentação avançada</strong>: Filtre candidatos por vaga, etapa do processo, data de candidatura ou tags personalizadas.</li>
            <li><strong>Personalização em escala</strong>: Envie mensagens em massa com campos dinâmicos para cada candidato.</li>
            <li><strong>Agendamento inteligente</strong>: Programe envios para datas e horários específicos, respeitando fusos horários.</li>
            <li><strong>Relatórios de entrega</strong>: Monitore taxas de entrega, abertura e resposta das suas comunicações.</li>
          </ul>
          <p class="mt-3 text-cyan-600 font-medium">💡 Dica profissional: Mesmo em comunicações em massa, inclua pelo menos três elementos de personalização (nome, vaga específica, algo do perfil do candidato) para aumentar significativamente as taxas de engajamento.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Anexos e recursos visuais</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Enriqueça suas comunicações com conteúdo multimídia:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Compartilhamento seguro</strong>: Envie e receba documentos, imagens e apresentações com total segurança.</li>
            <li><strong>Visualização integrada</strong>: Veja previews de documentos e imagens diretamente na conversa, sem downloads.</li>
            <li><strong>Material de marca</strong>: Acesse a biblioteca corporativa para incluir logos, imagens e vídeos institucionais.</li>
            <li><strong>Integração com ATS</strong>: Anexe documentos diretamente do sistema de gestão de candidatos.</li>
          </ul>
          <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <p><strong>Importante:</strong> Lembre-se que anexos grandes podem dificultar o acesso em dispositivos móveis. Para arquivos maiores que 5MB, considere compartilhar um link para download ao invés de enviar como anexo.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Feedback estruturado e construtivo</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Forneça devolutivas valiosas mesmo para candidatos não selecionados:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Templates de feedback</strong>: Utilize modelos pré-aprovados para diferentes situações de retorno.</li>
            <li><strong>Feedback personalizado</strong>: Adicione comentários específicos sobre pontos fortes e áreas de desenvolvimento.</li>
            <li><strong>Assistente de redação</strong>: Receba sugestões para tornar feedback negativo mais construtivo e respeitoso.</li>
            <li><strong>Solicitação de avaliação</strong>: Convide candidatos a avaliar sua experiência no processo seletivo.</li>
          </ul>
          <div class="bg-cyan-50 p-3 rounded border border-cyan-200 mt-3">
            <p class="font-medium mb-1">Estrutura recomendada para feedback:</p>
            <ol class="list-decimal ml-5 text-sm space-y-1">
              <li>Agradecimento sincero pela participação</li>
              <li>Comunicação clara da decisão (sem ambiguidade)</li>
              <li>Pontos fortes identificados (específicos, não genéricos)</li>
              <li>Área(s) para desenvolvimento (quando apropriado e construtivo)</li>
              <li>Encorajamento para futuras oportunidades (quando pertinente)</li>
            </ol>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Analytics e otimização de comunicação</h3>
        <div class="ml-5 mb-6">
          <p class="mb-3">Utilize dados para melhorar continuamente sua comunicação:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li><strong>Métricas de engajamento</strong>: Acompanhe taxas de resposta, tempo médio até resposta e satisfação dos candidatos.</li>
            <li><strong>Análise de efetividade</strong>: Compare diferentes abordagens de comunicação para identificar as mais eficazes.</li>
            <li><strong>Sugestões de melhoria</strong>: Receba recomendações baseadas em IA para otimizar templates e mensagens.</li>
            <li><strong>Voice of Candidate</strong>: Colete e analise feedback sobre a comunicação durante o processo seletivo.</li>
          </ul>
          <div class="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
            <p class="font-medium">Uma comunicação clara, consistente e respeitosa impacta diretamente a percepção de sua marca empregadora. 87% dos candidatos relatam que feedback de qualidade melhora sua imagem da empresa, mesmo quando não são selecionados.</p>
          </div>
        </div>
        
        <div class="bg-slate-100 rounded-lg p-5 mt-8 border border-slate-200">
          <h4 class="font-bold text-lg mb-2">Recursos avançados disponíveis nos planos Premium e Enterprise:</h4>
          <ul class="list-disc ml-6 space-y-1">
            <li>Chatbot inteligente para respostas automáticas a perguntas frequentes</li>
            <li>Análise de sentimento para identificar candidatos em risco de desistência</li>
            <li>Tradução automática para comunicação multilingue</li>
            <li>Assistente de redação avançado com sugestões de conteúdo e tom</li>
            <li>Integração com canais adicionais (SMS, WhatsApp Business)</li>
          </ul>
          <p class="mt-4 font-medium">Invista em comunicação de qualidade durante todo o processo seletivo. Candidatos bem informados são mais engajados, têm maior probabilidade de aceitar ofertas e se tornam embaixadores da sua marca, independentemente do resultado final do processo.</p>
        </div>
      `,
      date: "2024-03-15"
    }
  ])

  // Estado inicial dos tickets - adaptado para empresa
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TC001",
      title: "Dificuldade ao publicar vaga com múltiplas localizações",
      category: "publicação",
      status: "aberto",
      date: "2024-03-08",
      createdTime: "09:32",
      lastResponseDate: "2024-03-08",
      lastResponseTime: "14:20",
      lastResponseBy: "Equipe"
    },
    {
      id: "TC002",
      title: "Erro ao exportar relatório de candidaturas",
      category: "relatórios",
      status: "em_andamento",
      date: "2024-03-07",
      createdTime: "15:45",
      lastResponseDate: "2024-03-08",
      lastResponseTime: "11:05",
      lastResponseBy: "Equipe"
    },
    {
      id: "TC003",
      title: "Solicitação de integração com sistema ATS interno",
      category: "integração",
      status: "pendente",
      date: "2024-03-05",
      createdTime: "10:22",
      lastResponseDate: "2024-03-06",
      lastResponseTime: "16:30",
      lastResponseBy: "Você"
    },
    {
      id: "TC004",
      title: "Dúvida sobre cobranças no plano Enterprise",
      category: "faturamento",
      status: "resolvido",
      date: "2024-03-02",
      createdTime: "08:15",
      lastResponseDate: "2024-03-03",
      lastResponseTime: "09:45", 
      lastResponseBy: "Equipe"
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
  
  // Estado para filtros de tickets
  const [statusFilter, setStatusFilter] = useState("todos");
  const [priorityFilter, setPriorityFilter] = useState("todas");
  const [ticketSearchQuery, setTicketSearchQuery] = useState("");

  const [ticketCategories] = useState([
    { value: "publicação", label: "Publicação de Vagas" },
    { value: "candidaturas", label: "Gestão de Candidaturas" },
    { value: "faturamento", label: "Faturamento e Pagamentos" },
    { value: "relatórios", label: "Relatórios e Analytics" },
    { value: "integração", label: "Integrações de Sistema" },
    { value: "outro", label: "Outros Assuntos" }
  ])

  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar tickets",
      icon: FileText,
      onClick: () => console.log("Exportar tickets")
    },
    {
      label: "Configurações de suporte",
      icon: Settings,
      onClick: () => console.log("Configurações de suporte")
    }
  ];

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
    router.push(`/dashboard/support/ticket/${ticketId}`)
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
      <PageHeader 
        title="Suporte à Empresa"
        description="Crie tickets de suporte e gerencie suas solicitações"
        icon={HelpCircle}
        dropdownActions={dropdownActions}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda sobre suporte")}
        primaryAction={{
          label: "Novo Ticket",
          icon: PlusCircle,
          onClick: () => setNewTicketOpen(true)
        }}
      />

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
                  {ticketCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
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
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <TabsList className="justify-start">
              <TabsTrigger 
                value="tickets" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Meus Tickets</span>
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Perguntas Frequentes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="knowledge" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Base de Conhecimento</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="tickets" className="mt-4">
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
        
        <TabsContent value="faq" className="mt-4">
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

        <TabsContent value="knowledge" className="mt-4">
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
                          category?.id === "publicacao-vagas" ? "bg-green-100" : 
                          category?.id === "gestao-candidatos" ? "bg-purple-100" :
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