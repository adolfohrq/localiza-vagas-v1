// Pacotes individuais
export interface Package {
  days: number
  price: number
  recommended: boolean
}

export const singlePackages: Package[] = [
  {
    days: 15,
    price: 50.0,
    recommended: false,
  },
  {
    days: 30,
    price: 100.0,
    recommended: true,
  },
  {
    days: 60,
    price: 150.0,
    recommended: false,
  },
  {
    days: 90,
    price: 180.0,
    recommended: false,
  },
] 