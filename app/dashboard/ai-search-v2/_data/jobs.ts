export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  requiredSkills: string[];
  desiredEducation: string;
  experienceLevel: string;
  desiredExperience: number;
  postedDate: string;
  applications: number;
}

// Mock data para vagas disponíveis
export const availableJobs: Job[] = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    location: "Remoto",
    requiredSkills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    desiredEducation: "Graduação em Ciência da Computação ou áreas relacionadas",
    experienceLevel: "Sênior",
    desiredExperience: 5,
    postedDate: "há 5 dias",
    applications: 12
  },
  {
    id: "2",
    title: "UX/UI Designer Senior",
    department: "Design",
    location: "São Paulo, SP",
    requiredSkills: ["Figma", "Adobe XD", "UI Design", "Pesquisa de Usuário", "Prototipagem"],
    desiredEducation: "Graduação em Design ou áreas relacionadas",
    experienceLevel: "Sênior",
    desiredExperience: 5,
    postedDate: "há 7 dias",
    applications: 8
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Produto",
    location: "São Paulo, SP",
    requiredSkills: ["Jira", "Scrum", "Roadmap de Produto", "Análise de Dados", "Priorização"],
    desiredEducation: "Graduação em Administração, Engenharia ou áreas relacionadas",
    experienceLevel: "Pleno/Sênior",
    desiredExperience: 4,
    postedDate: "há 3 dias",
    applications: 5
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Infraestrutura",
    location: "Remoto",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    desiredEducation: "Graduação em Ciência da Computação ou áreas relacionadas",
    experienceLevel: "Pleno",
    desiredExperience: 3,
    postedDate: "há 10 dias",
    applications: 15
  },
  {
    id: "5",
    title: "Data Scientist",
    department: "Data",
    location: "Belo Horizonte, MG",
    requiredSkills: ["Python", "SQL", "Machine Learning", "TensorFlow", "Power BI"],
    desiredEducation: "Mestrado em Ciência de Dados, Estatística ou áreas afins",
    experienceLevel: "Pleno/Sênior",
    desiredExperience: 4,
    postedDate: "há 2 dias",
    applications: 7
  }
]; 