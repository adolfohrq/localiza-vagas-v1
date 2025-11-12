"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  Bell,
  User,
  Briefcase,
  Building,
  BookOpen,
  HelpCircle,
  FileText,
  ChevronRight,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  MessageSquare,
  ChevronDown,
  Code,
  Terminal,
  Database,
  Server,
  Cpu,
  Globe,
  Cloud,
  Lock,
  Zap,
  Layers,
  Monitor,
  Home,
  Github
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function HeaderTech() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Detecta o scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        isScrolled
          ? "bg-[#0f172a] shadow-lg border-b border-[#1e293b] py-2"
          : "bg-[#0f172a] py-4"
      )}
    >
      {/* Top bar com informações técnicas */}
      <div className={cn(
        "w-full text-gray-400 text-xs transition-all duration-300 border-b border-[#1e293b]",
        isScrolled ? "hidden" : "block py-2 mb-2"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Terminal className="h-3 w-3 mr-1" />
              <span>v2.4.1</span>
            </div>
            <div className="flex items-center">
              <Server className="h-3 w-3 mr-1" />
              <span>Status: Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/docs" className="hover:text-cyan-400 transition-colors">Docs</Link>
            <Link href="/api" className="hover:text-cyan-400 transition-colors">API</Link>
            <Link href="https://github.com/localizavagas" className="hover:text-cyan-400 transition-colors flex items-center">
              <Github className="h-3 w-3 mr-1" />
              GitHub
            </Link>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white">Tech<span className="text-cyan-400">Vagas</span></span>
              <p className="text-xs text-gray-400 font-mono">// Plataforma para Devs</p>
            </div>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">
              <Home className="h-4 w-4 mr-1.5" />
              Início
            </NavLink>
            <NavLink href="/vagas">
              <Briefcase className="h-4 w-4 mr-1.5" />
              Vagas
            </NavLink>
            <NavLink href="/tecnologias">
              <Cpu className="h-4 w-4 mr-1.5" />
              Tecnologias
            </NavLink>
            <NavLink href="/empresas">
              <Building className="h-4 w-4 mr-1.5" />
              Empresas
            </NavLink>
            <NavLink href="/cursos">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Cursos
            </NavLink>
            <NavLink href="/comunidade">
              <Globe className="h-4 w-4 mr-1.5" />
              Comunidade
            </NavLink>
          </nav>

          {/* Ações do usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-cyan-400 hover:bg-slate-800 rounded-md relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cyan-500">3</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md">
                      <User className="h-4 w-4 mr-1" />
                      <span className="font-mono">{user?.name?.split(' ')[0]}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-gray-300">
                    <DropdownMenuLabel className="font-mono text-gray-400">Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <User className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <Briefcase className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Minhas Vagas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <Code className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Projetos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <Layers className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Stack</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <Settings className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem className="hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400">
                      <LogOut className="h-4 w-4 mr-2 text-cyan-500" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-md">
                  <Zap className="h-4 w-4 mr-1" />
                  Aplicar
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-md">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-cyan-400 hover:bg-slate-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-slate-800 text-gray-300">
              <SheetHeader>
                <SheetTitle className="text-gray-300 font-mono">Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-1">
                  <MobileNavItem href="/" icon={Home}>Início</MobileNavItem>
                  <MobileNavItem href="/vagas" icon={Briefcase}>Vagas</MobileNavItem>
                  <MobileNavItem href="/tecnologias" icon={Cpu}>Tecnologias</MobileNavItem>
                  <MobileNavItem href="/empresas" icon={Building}>Empresas</MobileNavItem>
                  <MobileNavItem href="/cursos" icon={BookOpen}>Cursos</MobileNavItem>
                  <MobileNavItem href="/comunidade" icon={Globe}>Comunidade</MobileNavItem>
                </div>
                
                <div className="border-t border-slate-800 my-4 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <MobileNavItem href="/perfil" icon={User}>Perfil</MobileNavItem>
                      <MobileNavItem href="/minhas-vagas" icon={Briefcase}>Minhas Vagas</MobileNavItem>
                      <MobileNavItem href="/projetos" icon={Code}>Projetos</MobileNavItem>
                      <MobileNavItem href="/stack" icon={Layers}>Stack</MobileNavItem>
                      <MobileNavItem href="/configuracoes" icon={Settings}>Configurações</MobileNavItem>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 rounded-md">
                          <Zap className="h-4 w-4 mr-2" />
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full border-slate-700 text-gray-300 hover:bg-slate-800 hover:text-cyan-400">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md transition-colors flex items-center"
    >
      {children}
    </Link>
  )
}

function MobileNavItem({ 
  children, 
  href, 
  icon: Icon 
}: { 
  children: React.ReactNode; 
  href: string; 
  icon: React.ComponentType<{ className?: string }> 
}) {
  return (
    <Link
      href={href}
      className="flex items-center py-2 px-3 text-base font-medium rounded-md hover:bg-slate-800 hover:text-cyan-400 transition-colors"
    >
      <Icon className="h-5 w-5 mr-3 text-cyan-500" />
      {children}
    </Link>
  )
} 