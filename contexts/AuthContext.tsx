"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// Definição do tipo de usuário
export type User = {
  id: string
  name: string
  email: string
  role: "candidate" | "recruiter" | "admin"
  avatar?: string
}

// Definição do contexto de autenticação
type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  getUserRole: (email: string) => "candidate" | "recruiter" | "admin" | null
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Lista de usuários pré-cadastrados para simulação
export const USERS: Record<string, { user: User; password: string }> = {
  "candidato@candidato.com.br": {
    user: {
      id: "1",
      name: "Candidato Teste",
      email: "candidato@candidato.com.br",
      role: "candidate",
      avatar: "/avatars/candidate.png"
    },
    password: "candidato"
  },
  "admin@admin.com": {
    user: {
      id: "2",
      name: "Administrador",
      email: "admin@admin.com",
      role: "admin",
      avatar: "/avatars/admin.png"
    },
    password: "admin123"
  },
  "recrutador@empresa.com": {
    user: {
      id: "3",
      name: "Recrutador Empresa",
      email: "recrutador@empresa.com",
      role: "recruiter",
      avatar: "/avatars/recruiter.png"
    },
    password: "recruiter123"
  }
}

// Provider do contexto de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verifica se há um usuário salvo no localStorage ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Função para obter o papel do usuário com base no email
  const getUserRole = (email: string): "candidate" | "recruiter" | "admin" | null => {
    const userRecord = USERS[email.toLowerCase()]
    return userRecord ? userRecord.user.role : null
  }

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userRecord = USERS[email.toLowerCase()]
    
    if (userRecord && userRecord.password === password) {
      // Definir o usuário no estado e no localStorage
      setUser(userRecord.user)
      localStorage.setItem("user", JSON.stringify(userRecord.user))
      
      console.log("Login bem-sucedido:", userRecord.user)
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        getUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

