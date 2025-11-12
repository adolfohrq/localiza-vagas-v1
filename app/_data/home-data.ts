// Interfaces
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  logo: string;
  postedAt: string;
  isHot?: boolean;
  isNew?: boolean;
  isUrgent?: boolean;
  benefits?: string[];
}

export interface Category {
  name: string;
  count: number;
}

export interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Dados das categorias
export const categories: Category[] = [
  {
    name: "Tecnologia",
    count: 1243
  },
  {
    name: "Design",
    count: 532
  },
  {
    name: "Marketing",
    count: 768
  },
  {
    name: "Atendimento",
    count: 621
  },
  {
    name: "Segurança",
    count: 298
  },
  {
    name: "Administração",
    count: 875
  },
  {
    name: "Vendas",
    count: 945
  },
  {
    name: "Redes",
    count: 324
  },
  {
    name: "Saúde",
    count: 578
  },
  {
    name: "Infraestrutura",
    count: 412
  }
]

// Dados das vagas em destaque
export const featuredJobs: Job[] = [
  {
    id: "1",
    title: "Desenvolvedor Frontend Senior",
    company: "TechCorp",
    location: "São Paulo, SP",
    salary: "R$ 12.000 - R$ 15.000",
    type: "Remoto",
    tags: ["React", "TypeScript", "Next.js", "UI/UX"],
    logo: "/logos/techcorp.svg",
    postedAt: "2 dias atrás",
    isHot: true,
    isNew: true,
    benefits: ["Plano de saúde", "VR/VA", "Horário flexível", "Gympass"]
  },
  {
    id: "2",
    title: "Engenheiro de Machine Learning",
    company: "DataIA",
    location: "Rio de Janeiro, RJ",
    salary: "R$ 15.000 - R$ 18.000",
    type: "Híbrido",
    tags: ["Python", "TensorFlow", "AWS", "Data Science"],
    logo: "/logos/dataia.svg",
    postedAt: "3 dias atrás",
    isUrgent: true,
    benefits: ["PLR", "Plano de saúde", "VR/VA", "Home office"]
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeStudio",
    location: "Curitiba, PR",
    salary: "R$ 8.000 - R$ 10.000",
    type: "Presencial",
    tags: ["Figma", "Adobe XD", "Sketch", "Design Systems"],
    logo: "/logos/creativestudio.svg",
    postedAt: "1 semana atrás",
    isNew: true,
    benefits: ["Vale-transporte", "VR/VA", "Plano de carreira"]
  },
  {
    id: "4",
    title: "Analista DevOps",
    company: "CloudTech",
    location: "Belo Horizonte, MG",
    salary: "R$ 10.000 - R$ 13.000",
    type: "Híbrido",
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    logo: "/logos/cloudtech.svg",
    postedAt: "5 dias atrás",
    isHot: true,
    benefits: ["PLR", "Seguro de vida", "Curso de idiomas"]
  },
  {
    id: "5",
    title: "Tech Lead",
    company: "InnovaSys",
    location: "Florianópolis, SC",
    salary: "R$ 18.000 - R$ 22.000",
    type: "Remoto",
    tags: ["Arquitetura", "Gestão", "Node.js", "Microservices"],
    logo: "/logos/innovasys.svg",
    postedAt: "2 semanas atrás",
    benefits: ["Bônus anual", "Ações da empresa", "Plano de saúde internacional"]
  },
  {
    id: "6",
    title: "Desenvolvedor Backend",
    company: "PaySystem",
    location: "Brasília, DF",
    salary: "R$ 9.000 - R$ 12.000",
    type: "Remoto",
    tags: ["Java", "Spring Boot", "Microsserviços", "API RESTful"],
    logo: "/logos/paysystem.svg",
    postedAt: "3 dias atrás",
    isNew: true,
    benefits: ["VR/VA", "Plano de saúde", "Day off no aniversário"]
  },
  {
    id: "7",
    title: "Marketing Digital Specialist",
    company: "Global Marketing",
    location: "Remoto",
    salary: "R$ 7.000 - R$ 9.000",
    type: "Tempo Integral",
    tags: ["SEO", "Social Media", "Google Ads", "Analytics"],
    logo: "/placeholder.svg?height=56&width=56",
    isNew: true,
    postedAt: "3 dias atrás",
    benefits: ["Bônus por performance", "Horário flexível", "Plano de saúde"]
  },
  {
    id: "8",
    title: "UX/UI Designer Senior",
    company: "Digital Experience",
    location: "Híbrido - São Paulo",
    salary: "R$ 10.000 - R$ 13.000",
    type: "Tempo Integral",
    tags: ["UX Research", "Figma", "Design Thinking", "Prototyping"],
    logo: "/placeholder.svg?height=56&width=56",
    isHot: true,
    postedAt: "1 dia atrás",
    benefits: ["Vale alimentação", "Plano de saúde", "Day off no aniversário"]
  },
  {
    id: "9",
    title: "Desenvolvedor Mobile",
    company: "AppTech",
    location: "Remoto",
    salary: "R$ 8.000 - R$ 12.000",
    type: "Tempo Integral",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    logo: "/placeholder.svg?height=56&width=56",
    postedAt: "4 dias atrás",
    benefits: ["Plano de saúde", "Vale refeição", "Horário flexível"]
  },
  {
    id: "10",
    title: "Analista de Recursos Humanos",
    company: "People First",
    location: "Presencial - Belo Horizonte",
    salary: "R$ 5.000 - R$ 7.000",
    type: "Tempo Integral",
    tags: ["Recrutamento", "Seleção", "Benefícios", "Treinamento"],
    logo: "/placeholder.svg?height=56&width=56",
    postedAt: "1 semana atrás",
    benefits: ["Vale transporte", "Plano de saúde", "Seguro de vida"]
  },
  {
    id: "11",
    title: "Gerente de Vendas",
    company: "Sales Pro",
    location: "Híbrido - Rio de Janeiro",
    salary: "R$ 12.000 - R$ 18.000",
    type: "Tempo Integral",
    tags: ["B2B", "Gestão de Equipe", "CRM", "Negociação"],
    logo: "/placeholder.svg?height=56&width=56",
    isUrgent: true,
    postedAt: "2 dias atrás",
    benefits: ["Comissões", "Carro da empresa", "Plano de saúde"]
  },
]

// Dados dos recursos
export const features: Feature[] = [
  {
    title: "Busca Inteligente",
    description: "Algoritmos avançados que encontram as vagas mais compatíveis com seu perfil e habilidades."
  },
  {
    title: "Matching por IA",
    description: "Nossa tecnologia de inteligência artificial identifica com precisão as melhores correspondências entre candidatos e empresas."
  },
  {
    title: "Perfil Destacado",
    description: "Ferramentas para criar um perfil profissional que se destaque e atraia as melhores oportunidades."
  },
  {
    title: "Multicanais",
    description: "Integração com múltiplas plataformas para ampliar o alcance das suas vagas e candidaturas."
  },
  {
    title: "Processos Otimizados",
    description: "Ferramentas que reduzem o tempo de contratação e melhoram a eficiência do recrutamento."
  },
  {
    title: "Comunicação Direta",
    description: "Canal direto entre candidatos e recrutadores para facilitar o processo seletivo."
  }
]

// Dados dos depoimentos
export const testimonials: Testimonial[] = [
  {
    content: "A plataforma revolucionou nosso processo de recrutamento. Encontramos candidatos qualificados em tempo recorde, com uma taxa de conversão muito superior a qualquer outra solução que já utilizamos.",
    author: "Ana Silva",
    role: "Diretora de RH",
    company: "TechCorp",
    avatar: "/avatars/ana-silva.jpg"
  },
  {
    content: "Como profissional de TI, já testei diversas plataformas de emprego, mas esta é simplesmente a melhor. O matching por IA me conectou com oportunidades que realmente faziam sentido para minha carreira.",
    author: "Pedro Santos",
    role: "Desenvolvedor Full Stack",
    company: "DataTech",
    avatar: "/avatars/pedro-santos.jpg"
  },
  {
    content: "A interface intuitiva e as ferramentas de filtragem avançada economizam muito tempo no processo de busca. Consegui minha posição atual através da plataforma em apenas duas semanas!",
    author: "Juliana Costa",
    role: "UX Designer",
    company: "CreativeStudio",
    avatar: "/avatars/juliana-costa.jpg"
  }
]

// Dados dos planos
export const plans: Plan[] = [
  {
    name: "Básico",
    price: "Grátis",
    description: "Ideal para pequenas empresas começando a contratar",
    features: [
      "Até 3 vagas ativas",
      "Ferramentas de triagem básicas",
      "Página da empresa",
      "Relatórios básicos"
    ]
  },
  {
    name: "Profissional",
    price: "R$ 299/mês",
    description: "Perfeito para empresas em crescimento",
    features: [
      "Até 10 vagas ativas",
      "Matching por IA",
      "Ferramentas de avaliação",
      "Integrações com ATS",
      "Suporte prioritário"
    ],
    popular: true
  },
  {
    name: "Empresarial",
    price: "R$ 799/mês",
    description: "Para grandes empresas com alto volume de contratação",
    features: [
      "Vagas ilimitadas",
      "Análises avançadas de candidatos",
      "API completa",
      "Suporte dedicado",
      "Personalização completa",
      "Relatórios avançados"
    ]
  }
]

// Dados das perguntas frequentes
export const faqs: FAQ[] = [
  {
    question: "Como funciona o sistema de matching por IA?",
    answer: "Nossa tecnologia analisa o perfil dos candidatos, incluindo habilidades, experiências e preferências, e os compara com as requisições das vagas para encontrar as correspondências mais compatíveis, economizando tempo tanto para recrutadores quanto para candidatos."
  },
  {
    question: "É possível utilizar a plataforma gratuitamente?",
    answer: "Sim! Oferecemos um plano básico gratuito para candidatos e empresas. Candidatos têm acesso a todas as ferramentas essenciais para busca de vagas, enquanto empresas podem publicar um número limitado de vagas no plano gratuito."
  },
  {
    question: "Como posso destacar meu perfil para recrutadores?",
    answer: "Recomendamos manter seu perfil completo e atualizado, destacar projetos relevantes, certificações e habilidades específicas. Nossos algoritmos favorecem perfis bem detalhados e alinhados com as necessidades do mercado."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos cartões de crédito, boleto bancário e transferência PIX para todos os planos pagos. Empresas com necessidades específicas podem entrar em contato para discutir opções de faturamento personalizadas."
  },
  {
    question: "É possível cancelar a assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. O acesso aos recursos premium continuará disponível até o final do período já pago."
  }
] 