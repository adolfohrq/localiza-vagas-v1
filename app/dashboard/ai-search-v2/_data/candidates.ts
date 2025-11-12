export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  duration: number;
  current: boolean;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  experience: number;
  yearsOfExperience: number;
  location: string;
  education: string;
  skills: string[];
  experiences: Experience[];
  matchScore: number;
  matchDetails: {
    skills: number;
    education: number;
    location: number;
    experience: number;
  };
  compatibleInfo: string[];
  avatar: string;
}

// Mock de candidatos para teste
export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Ana Silva",
    title: "Desenvolvedora Front-end Sênior",
    experience: 6,
    yearsOfExperience: 6,
    location: "São Paulo, SP",
    education: "Mestrado em Ciência da Computação",
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    experiences: [
      {
        title: "Desenvolvedora Front-end Sênior",
        company: "TechSolutions",
        location: "São Paulo, SP",
        period: "Jan 2020 - Presente",
        duration: 3,
        current: true,
        description: "Desenvolvimento de aplicações web com React e TypeScript. Implementação de arquitetura de componentes e integração com APIs GraphQL."
      },
      {
        title: "Desenvolvedora Front-end Pleno",
        company: "WebDev Inc",
        location: "São Paulo, SP",
        period: "Mar 2017 - Dez 2019",
        duration: 2,
        current: false,
        description: "Desenvolvimento de interfaces responsivas e acessíveis. Implementação de testes automatizados e CI/CD."
      }
    ],
    matchScore: 92,
    matchDetails: {
      skills: 95,
      education: 90,
      location: 100,
      experience: 85
    },
    compatibleInfo: [
      "Experiência com todas as tecnologias requeridas",
      "Formação acadêmica alinhada com a vaga",
      "Localização compatível"
    ],
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: "2",
    name: "Carlos Mendes",
    title: "Desenvolvedor Full Stack",
    experience: 4,
    yearsOfExperience: 4,
    location: "Curitiba, PR (Disponível para remoto)",
    education: "Graduação em Engenharia de Software",
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "Git", "Docker"],
    experiences: [
      {
        title: "Desenvolvedor Full Stack",
        company: "Inovação Tech",
        location: "Curitiba, PR",
        period: "Jun 2019 - Presente",
        duration: 4,
        current: true,
        description: "Desenvolvimento de aplicações web completas utilizando MERN stack. Implementação de microsserviços e APIs RESTful."
      }
    ],
    matchScore: 85,
    matchDetails: {
      skills: 90,
      education: 80,
      location: 75,
      experience: 75
    },
    compatibleInfo: [
      "Domínio da maioria das tecnologias requeridas",
      "Experiência em projetos similares"
    ],
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: "3",
    name: "Juliana Costa",
    title: "Desenvolvedora JavaScript Pleno",
    experience: 3,
    yearsOfExperience: 3,
    location: "Remoto",
    education: "Graduação em Sistemas de Informação",
    skills: ["React", "JavaScript", "Node.js", "Express", "PostgreSQL"],
    experiences: [
      {
        title: "Desenvolvedora JavaScript",
        company: "StartupXYZ",
        location: "Remoto",
        period: "Ago 2020 - Presente",
        duration: 3,
        current: true,
        description: "Desenvolvimento de aplicações web com foco em React e Node.js. Implementação de features e manutenção de código legado."
      }
    ],
    matchScore: 78,
    matchDetails: {
      skills: 85,
      education: 75,
      location: 100,
      experience: 65
    },
    compatibleInfo: [
      "Experiência com principais tecnologias front-end",
      "Disponibilidade para trabalho remoto"
    ],
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: "4",
    name: "Ricardo Souza",
    title: "Desenvolvedor Back-end Sênior",
    experience: 7,
    yearsOfExperience: 7,
    location: "Belo Horizonte, MG",
    education: "Especialização em Arquitetura de Software",
    skills: ["Node.js", "TypeScript", "MongoDB", "AWS", "Microservices", "Redis"],
    experiences: [
      {
        title: "Desenvolvedor Back-end Sênior",
        company: "Enterprise Solutions",
        location: "Belo Horizonte, MG",
        period: "Fev 2018 - Presente",
        duration: 5,
        current: true,
        description: "Desenvolvimento de APIs e microsserviços. Implementação de soluções escaláveis em cloud."
      },
      {
        title: "Desenvolvedor Back-end Pleno",
        company: "Tech Innovations",
        location: "São Paulo, SP",
        period: "Mar 2016 - Jan 2018",
        duration: 2,
        current: false,
        description: "Desenvolvimento de serviços backend com Node.js e MongoDB. Implementação de autenticação e autorização."
      }
    ],
    matchScore: 75,
    matchDetails: {
      skills: 80,
      education: 85,
      location: 70,
      experience: 90
    },
    compatibleInfo: [
      "Forte experiência em desenvolvimento back-end",
      "Conhecimento avançado em arquitetura de sistemas"
    ],
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: "5",
    name: "Marina Oliveira",
    title: "Desenvolvedora Web",
    experience: 2,
    yearsOfExperience: 2,
    location: "Rio de Janeiro, RJ (Disponível para relocação)",
    education: "Graduação em Ciência da Computação",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    experiences: [
      {
        title: "Desenvolvedora Web",
        company: "Digital Agency",
        location: "Rio de Janeiro, RJ",
        period: "Jul 2021 - Presente",
        duration: 2,
        current: true,
        description: "Desenvolvimento de websites e aplicações web com foco em experiência do usuário e performance."
      }
    ],
    matchScore: 68,
    matchDetails: {
      skills: 70,
      education: 80,
      location: 65,
      experience: 60
    },
    compatibleInfo: [
      "Conhecimento em React e desenvolvimento front-end",
      "Disponível para relocação"
    ],
    avatar: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    id: "6",
    name: "Pedro Santos",
    title: "Desenvolvedor Full Stack Pleno",
    experience: 4,
    yearsOfExperience: 4,
    location: "Remoto",
    education: "Graduação em Análise e Desenvolvimento de Sistemas",
    skills: ["React", "Node.js", "Express", "MySQL", "Docker", "AWS"],
    experiences: [
      {
        title: "Desenvolvedor Full Stack",
        company: "RemoteTech",
        location: "Remoto",
        period: "Mai 2019 - Presente",
        duration: 4,
        current: true,
        description: "Desenvolvimento de aplicações web completas, desde o frontend até o backend. Implementação de CI/CD e DevOps."
      }
    ],
    matchScore: 82,
    matchDetails: {
      skills: 85,
      education: 75,
      location: 100,
      experience: 75
    },
    compatibleInfo: [
      "Experiência com stack completo",
      "Trabalha remotamente há 3 anos"
    ],
    avatar: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    id: "7",
    name: "Fernanda Lima",
    title: "Desenvolvedora Frontend",
    experience: 3,
    yearsOfExperience: 3,
    location: "São Paulo, SP",
    education: "Graduação em Design e Desenvolvimento Web",
    skills: ["React", "TypeScript", "SASS", "Redux", "Jest"],
    experiences: [
      {
        title: "Desenvolvedora Frontend",
        company: "UX Solutions",
        location: "São Paulo, SP",
        period: "Abr 2020 - Presente",
        duration: 3,
        current: true,
        description: "Desenvolvimento de interfaces de usuário com React e TypeScript. Implementação de testes automatizados com Jest."
      }
    ],
    matchScore: 79,
    matchDetails: {
      skills: 85,
      education: 70,
      location: 100,
      experience: 65
    },
    compatibleInfo: [
      "Especialista em interfaces de usuário com React",
      "Experiência com testes automatizados"
    ],
    avatar: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    id: "8",
    name: "Gabriel Almeida",
    title: "Engenheiro de Software",
    experience: 5,
    yearsOfExperience: 5,
    location: "Florianópolis, SC (Disponível para remoto)",
    education: "Mestrado em Engenharia de Software",
    skills: ["TypeScript", "Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"],
    experiences: [
      {
        title: "Engenheiro de Software",
        company: "CloudTech",
        location: "Florianópolis, SC",
        period: "Jan 2019 - Presente",
        duration: 4,
        current: true,
        description: "Desenvolvimento de soluções em nuvem e arquitetura de sistemas distribuídos. Implementação de infraestrutura como código."
      },
      {
        title: "Desenvolvedor Backend",
        company: "Software Solutions",
        location: "Porto Alegre, RS",
        period: "Mar 2017 - Dez 2018",
        duration: 1,
        current: false,
        description: "Desenvolvimento de APIs e serviços backend com Node.js e TypeScript."
      }
    ],
    matchScore: 88,
    matchDetails: {
      skills: 90,
      education: 90,
      location: 80,
      experience: 85
    },
    compatibleInfo: [
      "Especialista em arquitetura e infraestrutura",
      "Formação acadêmica avançada na área"
    ],
    avatar: "https://randomuser.me/api/portraits/men/8.jpg"
  }
]; 