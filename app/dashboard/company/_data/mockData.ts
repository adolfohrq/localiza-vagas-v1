// Interface da empresa
export interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  email: string;
  logo: string;
  logoUrl: string;
  foundedYear: number;
  size: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  socialMedia: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  [key: string]: any; // Permite acesso dinâmico às propriedades
}

// Mock data para a empresa
export const mockCompany: Company = {
  id: "1",
  name: "TechCorp Solutions",
  description: "Empresa líder em soluções tecnológicas para o mercado corporativo.",
  website: "https://techcorp.example.com",
  email: "contato@techcorp.example.com",
  logo: "/placeholders/logo.svg",
  logoUrl: "/placeholders/logo.svg",
  foundedYear: 2010,
  size: "50-100",
  address: {
    street: "Av. Paulista",
    number: "1000",
    complement: "Andar 10, Sala 1001",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    zipCode: "01310-100"
  },
  socialMedia: {
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    instagram: "https://instagram.com/techcorp"
  }
}; 