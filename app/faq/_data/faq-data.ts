import { HelpCircle, Briefcase, Users } from "lucide-react"
import { LucideIcon } from "lucide-react"

// Interface para as perguntas frequentes
export interface FAQ {
  question: string
  answer: string
}

// Interface para as categorias
export interface Category {
  id: string
  name: string
  icon: LucideIcon
}

// Dados simulados para as perguntas frequentes de candidatos
export const candidatesFAQs: FAQ[] = [
  {
    question: "Como criar uma conta na plataforma?",
    answer: "Para criar uma conta, clique no botão 'Cadastre-se' no canto superior direito da página inicial. Você pode se registrar usando seu e-mail, Google ou LinkedIn. Após preencher as informações básicas, você receberá um e-mail de confirmação para ativar sua conta."
  },
  {
    question: "Como criar um currículo atrativo na plataforma?",
    answer: "Para criar um currículo atrativo, preencha todas as seções do seu perfil com informações detalhadas e relevantes. Destaque suas principais habilidades, experiências profissionais e formação acadêmica. Adicione palavras-chave relacionadas à sua área de atuação para aumentar a visibilidade do seu perfil para recrutadores. Mantenha seu perfil sempre atualizado e inclua conquistas quantificáveis sempre que possível."
  },
  {
    question: "Como me candidatar a uma vaga?",
    answer: "Para se candidatar a uma vaga, navegue até a seção 'Vagas' e utilize os filtros para encontrar oportunidades que correspondam ao seu perfil. Ao encontrar uma vaga interessante, clique no botão 'Candidatar-se' na página de detalhes da vaga. Dependendo das configurações da empresa, você poderá precisar responder algumas perguntas específicas ou realizar testes antes de finalizar sua candidatura."
  },
  {
    question: "Posso acompanhar o status das minhas candidaturas?",
    answer: "Sim, você pode acompanhar o status de todas as suas candidaturas na seção 'Minhas Candidaturas' do seu painel. Lá você verá informações sobre cada vaga que se candidatou, incluindo o status atual (Enviada, Em análise, Entrevista agendada, Aprovado, Recusado). Você também receberá notificações por e-mail sempre que houver atualizações importantes em suas candidaturas."
  },
  {
    question: "Como funciona o sistema de recomendação de vagas?",
    answer: "Nosso sistema de recomendação de vagas utiliza inteligência artificial para analisar seu perfil, histórico de candidaturas e preferências. Com base nesses dados, identificamos oportunidades que melhor se alinham às suas habilidades e objetivos de carreira. Para melhorar a precisão das recomendações, mantenha seu perfil atualizado e interaja regularmente com a plataforma, salvando vagas de interesse e atualizando suas preferências de busca."
  },
  {
    question: "É possível salvar vagas para visualizar mais tarde?",
    answer: "Sim, você pode salvar vagas para visualizar mais tarde clicando no ícone de favorito (coração) que aparece em cada card de vaga. Todas as vagas salvas ficam disponíveis na seção 'Vagas Salvas' do seu painel, onde você pode gerenciá-las e se candidatar quando estiver pronto. Esta funcionalidade é útil para comparar diferentes oportunidades antes de decidir para quais vagas deseja se candidatar."
  },
  {
    question: "Como configurar alertas de novas vagas?",
    answer: "Para configurar alertas de novas vagas, acesse a seção 'Alertas' no seu painel e clique em 'Criar Novo Alerta'. Defina os critérios de busca como cargo, localização, faixa salarial e tipo de contrato. Escolha a frequência com que deseja receber as notificações (diária, semanal) e o método de recebimento (e-mail, notificação no app). Você pode criar múltiplos alertas para diferentes tipos de vagas e gerenciá-los a qualquer momento."
  },
  {
    question: "Meu perfil é visível para todas as empresas?",
    answer: "Por padrão, seu perfil é visível para todas as empresas cadastradas na plataforma que buscam candidatos com seu perfil. No entanto, você pode ajustar suas configurações de privacidade na seção 'Configurações > Privacidade' para controlar a visibilidade do seu perfil. É possível ocultar seu perfil de empresas específicas (como seu empregador atual) ou torná-lo visível apenas quando você se candidata ativamente a uma vaga."
  },
  {
    question: "Como me preparar para entrevistas através da plataforma?",
    answer: "Nossa plataforma oferece diversos recursos para ajudar na preparação para entrevistas. Na seção 'Desenvolvimento Profissional', você encontrará guias sobre como se preparar para diferentes tipos de entrevistas, dicas específicas para cada setor e função, e simuladores de entrevista com perguntas comuns. Além disso, oferecemos webinars gratuitos sobre técnicas de entrevista e feedback personalizado para usuários premium."
  },
  {
    question: "A plataforma oferece recursos para desenvolvimento profissional?",
    answer: "Sim, oferecemos diversos recursos para desenvolvimento profissional. Na seção 'Aprendizado', você encontrará cursos online, webinars, artigos e guias sobre diversos temas relacionados à carreira. Temos conteúdos sobre desenvolvimento de habilidades técnicas e comportamentais, tendências do mercado de trabalho, dicas para networking e muito mais. Usuários premium têm acesso a mentorias individuais e avaliações de perfil por especialistas em RH."
  }
]

// Dados simulados para as perguntas frequentes de empresas
export const companiesFAQs: FAQ[] = [
  {
    question: "Como criar uma conta empresarial?",
    answer: "Para criar uma conta empresarial, acesse nossa página inicial e clique em 'Para Empresas' e depois em 'Cadastre sua empresa'. Preencha o formulário com as informações da empresa, incluindo CNPJ, nome, setor e tamanho. Após a verificação inicial, um de nossos consultores entrará em contato para confirmar os detalhes e apresentar os planos disponíveis para sua empresa."
  },
  {
    question: "Quais são os planos disponíveis para empresas?",
    answer: "Oferecemos diferentes planos para atender às necessidades específicas de cada empresa. O plano Básico permite publicar até 5 vagas por mês e acessar nosso banco de currículos de forma limitada. O plano Profissional oferece publicação ilimitada de vagas e acesso completo ao banco de talentos. O plano Enterprise inclui todos os benefícios anteriores, além de ferramentas avançadas de recrutamento, ATS integrado, relatórios personalizados e um gerente de conta dedicado. Entre em contato com nossa equipe comercial para obter informações detalhadas sobre preços e condições."
  },
  {
    question: "Como publicar uma vaga na plataforma?",
    answer: "Para publicar uma vaga, acesse seu painel de empresa e clique em 'Publicar Nova Vaga'. Preencha o formulário com todas as informações relevantes, como título da vaga, descrição, requisitos, benefícios, faixa salarial e localização. Você pode personalizar o processo seletivo adicionando etapas específicas, como testes, entrevistas ou dinâmicas. Após revisar todas as informações, clique em 'Publicar' para que a vaga fique disponível para os candidatos."
  },
  {
    question: "Como gerenciar candidaturas recebidas?",
    answer: "Todas as candidaturas recebidas podem ser gerenciadas na seção 'Candidaturas' do seu painel. Lá você pode visualizar os perfis dos candidatos, filtrar por critérios específicos, adicionar notas, avaliar candidatos e movê-los entre as diferentes etapas do processo seletivo. Nossa plataforma permite que você colabore com outros recrutadores da sua empresa, atribuindo tarefas e compartilhando avaliações sobre os candidatos."
  },
  {
    question: "É possível buscar candidatos no banco de talentos?",
    answer: "Sim, dependendo do seu plano, você pode buscar candidatos ativamente em nosso banco de talentos. Utilize nossa ferramenta de busca avançada para encontrar profissionais com base em critérios como habilidades, experiência, formação, localização e disponibilidade. Você pode salvar buscas frequentes, criar listas de talentos para futuras oportunidades e entrar em contato diretamente com candidatos que se destacam, mesmo que eles não tenham se candidatado às suas vagas."
  },
  {
    question: "Como destacar minha empresa para atrair mais candidatos?",
    answer: "Para destacar sua empresa, complete o perfil corporativo com informações detalhadas sobre a cultura, valores, benefícios e oportunidades de crescimento. Adicione fotos do ambiente de trabalho, depoimentos de funcionários e conquistas recentes. Mantenha uma página de empresa atrativa e atualizada regularmente com novidades. Além disso, você pode investir em vagas patrocinadas para aumentar a visibilidade das suas oportunidades e utilizar nossa ferramenta de employer branding para criar campanhas personalizadas."
  },
  {
    question: "A plataforma oferece integração com outros sistemas de RH?",
    answer: "Sim, nossa plataforma oferece integração com diversos sistemas de RH e ATS (Applicant Tracking Systems). Temos APIs e conectores prontos para sistemas populares como Workday, SAP SuccessFactors, BambooHR, Gupy, Kenoby, entre outros. Para integrações personalizadas, nossa equipe técnica pode desenvolver soluções específicas para atender às necessidades da sua empresa. Essas integrações permitem sincronizar vagas, candidaturas e feedback entre sistemas, otimizando seu processo de recrutamento."
  },
  {
    question: "Como obter relatórios e métricas de recrutamento?",
    answer: "Na seção 'Relatórios' do seu painel, você tem acesso a diversas métricas e análises sobre seus processos seletivos. Você pode visualizar dados como número de candidaturas por vaga, tempo médio de preenchimento, fontes de candidatos mais eficientes, taxas de conversão em cada etapa do funil e custo por contratação. É possível personalizar os relatórios de acordo com suas necessidades específicas e exportá-los em diferentes formatos para apresentações e análises mais detalhadas."
  },
  {
    question: "Existe suporte para processos seletivos complexos?",
    answer: "Sim, nossa plataforma suporta processos seletivos complexos e personalizados. Você pode configurar múltiplas etapas, incluindo triagem inicial, testes técnicos, avaliações comportamentais, entrevistas em grupo, dinâmicas e entrevistas finais. Para cada etapa, é possível definir critérios de avaliação específicos, formulários personalizados e fluxos de aprovação. Também oferecemos ferramentas para agendamento automático de entrevistas, videoconferências integradas e avaliações colaborativas entre diferentes avaliadores."
  },
  {
    question: "Como garantir a diversidade nos processos seletivos?",
    answer: "Nossa plataforma oferece diversas ferramentas para promover a diversidade e inclusão nos processos seletivos. Você pode utilizar recursos como triagem às cegas (que oculta informações que podem gerar viés, como nome, idade e foto), análise de linguagem inclusiva nas descrições de vagas, metas de diversidade para funis de recrutamento e relatórios específicos sobre diversidade. Além disso, oferecemos consultoria especializada para implementar as melhores práticas de recrutamento inclusivo na sua empresa."
  }
]

// Categorias de FAQ para candidatos
export const candidateCategories: Category[] = [
  { id: "account", name: "Conta e Perfil", icon: Users },
  { id: "applications", name: "Candidaturas", icon: Briefcase },
  { id: "features", name: "Recursos e Ferramentas", icon: HelpCircle }
]

// Categorias de FAQ para empresas
export const companyCategories: Category[] = [
  { id: "account", name: "Conta e Planos", icon: Users },
  { id: "recruitment", name: "Recrutamento", icon: Briefcase },
  { id: "tools", name: "Ferramentas e Integrações", icon: HelpCircle }
] 