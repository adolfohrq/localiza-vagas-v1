"use client"

import { DataTable, DataTableRecord, StatusStyle } from "./DataTable"
import { Edit, Eye, Trash, Star } from "lucide-react"
import { useState } from "react"

const mockStatusStyles: Record<string, StatusStyle> = {
  new: { label: "Novo", variant: "default", color: "text-blue-700 bg-blue-50" },
  reviewing: { label: "Em Análise", variant: "secondary", color: "text-purple-700 bg-purple-50" },
  interviewed: { label: "Entrevistado", variant: "outline", color: "text-green-700 bg-green-50" },
  approved: { label: "Aprovado", variant: "default", color: "text-green-700 bg-green-50" },
  rejected: { label: "Rejeitado", variant: "destructive", color: "text-red-700 bg-red-50" },
  offer: { label: "Oferta", variant: "secondary", color: "text-amber-700 bg-amber-50" },
  hired: { label: "Contratado", variant: "default", color: "text-green-700 bg-green-50" }
}

// Dados de exemplo
const initialData: DataTableRecord[] = [
  {
    id: "1",
    name: "João Silva",
    avatar: "/avatars/avatar-1.png",
    position: "Desenvolvedor Full Stack",
    status: "new",
    matchScore: 92,
    date: "2023-05-15T10:30:00",
    viewed: true,
    favorite: true
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "/avatars/avatar-2.png",
    position: "UX Designer",
    status: "interviewing",
    matchScore: 85,
    date: "2023-05-14T09:15:00",
    viewed: true,
    favorite: false
  },
  {
    id: "3",
    name: "Pedro Costa",
    avatar: "/avatars/avatar-3.png",
    position: "Product Manager",
    status: "approved",
    matchScore: 78,
    date: "2023-05-13T14:45:00",
    viewed: false,
    favorite: true
  },
  {
    id: "4",
    name: "Ana Rodrigues",
    avatar: "/avatars/avatar-4.png",
    position: "DevOps Engineer",
    status: "rejected",
    matchScore: 62,
    date: "2023-05-12T11:00:00",
    viewed: true,
    favorite: false
  },
  {
    id: "5",
    name: "Lucas Mendes",
    avatar: "/avatars/avatar-5.png",
    position: "Data Scientist",
    status: "new",
    matchScore: 95,
    date: "2023-05-11T16:20:00",
    viewed: false,
    favorite: false
  }
]

export function DataTableExample() {
  const [data, setData] = useState<DataTableRecord[]>(initialData)
  
  const handleRowClick = (record: DataTableRecord) => {
    console.log("Clicou no registro:", record)
    // Simulação de marcação como visualizado
    setData(prev => prev.map(item => 
      item.id === record.id ? { ...item, viewed: true } : item
    ))
  }
  
  const handleStatusChange = (ids: string[], newStatus: string) => {
    console.log(`Alterando status de ${ids.length} item(s) para ${newStatus}`)
    setData(prev => prev.map(item => 
      ids.includes(item.id) ? { ...item, status: newStatus } : item
    ))
  }
  
  const handleFavoriteToggle = (id: string) => {
    console.log(`Alterando favorito: ${id}`)
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ))
  }
  
  const getActionItems = (record: DataTableRecord) => [
    {
      label: "Visualizar perfil",
      onClick: () => console.log(`Visualizando perfil de ${record.name}`),
      icon: <Eye className="h-4 w-4" />
    },
    {
      label: "Editar",
      onClick: () => console.log(`Editando ${record.name}`),
      icon: <Edit className="h-4 w-4" />
    },
    {
      label: "Recomendar",
      onClick: () => console.log(`Recomendando ${record.name}`),
      icon: <Star className="h-4 w-4" />,
      separator: true
    },
    {
      label: "Excluir",
      onClick: () => console.log(`Excluindo ${record.name}`),
      icon: <Trash className="h-4 w-4" />
    }
  ]
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Candidatos</h1>
      <DataTable 
        data={data}
        statusStyles={mockStatusStyles}
        onRowClick={handleRowClick}
        onStatusChange={handleStatusChange}
        onFavoriteToggle={handleFavoriteToggle}
        actionItems={getActionItems}
      />
    </div>
  )
} 