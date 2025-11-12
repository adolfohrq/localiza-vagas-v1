'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchTasks } from "@/app/dashboard/_actions/tasks/fetch-tasks";

// Tipos para tarefas
interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

interface RelatedItem {
  type: "job" | "candidate" | "interview" | "project";
  title: string;
  id: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "urgent" | "high" | "medium" | "low";
  assignee?: Assignee;
  relatedTo?: RelatedItem;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Dados de exemplo
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Revisar currículos para vaga de UX Designer",
    description: "Analisar 15 currículos recebidos e selecionar os 5 melhores candidatos para a primeira entrevista",
    dueDate: "Hoje, 18:00",
    status: "pending",
    priority: "high",
    assignee: {
      id: "user-1",
      name: "Ana Silva",
      avatar: "/placeholder-user.jpg"
    },
    relatedTo: {
      type: "job",
      title: "UX Designer",
      id: "job-2"
    },
    tags: ["Recrutamento", "Design"],
    createdAt: "2023-03-10T10:00:00Z",
    updatedAt: "2023-03-11T14:30:00Z"
  },
  {
    id: "2",
    title: "Agendar entrevistas técnicas",
    description: "Coordenar com a equipe técnica para agendar entrevistas com os candidatos selecionados",
    dueDate: "Amanhã, 12:00",
    status: "in-progress",
    priority: "medium",
    assignee: {
      id: "user-2",
      name: "Carlos Oliveira",
      avatar: "/placeholder-user.jpg"
    },
    relatedTo: {
      type: "job",
      title: "Desenvolvedor Frontend",
      id: "job-1"
    },
    tags: ["Entrevistas", "Desenvolvimento"],
    createdAt: "2023-03-09T09:15:00Z",
    updatedAt: "2023-03-11T11:20:00Z"
  },
  {
    id: "3",
    title: "Preparar relatório de contratações do mês",
    description: "Compilar dados de todas as contratações realizadas no mês para apresentação à diretoria",
    dueDate: "Sexta-feira",
    status: "in-progress",
    priority: "medium",
    assignee: {
      id: "user-3",
      name: "Mariana Costa",
      avatar: "/placeholder-user.jpg"
    },
    tags: ["Relatório", "Contratações"],
    createdAt: "2023-03-08T15:45:00Z",
    updatedAt: "2023-03-10T16:20:00Z"
  },
  {
    id: "4",
    title: "Atualizar descrições de vagas",
    description: "Revisar e atualizar as descrições de vagas abertas para melhorar a qualidade dos candidatos",
    dueDate: "Quinta-feira",
    status: "pending",
    priority: "low",
    assignee: {
      id: "user-1",
      name: "Ana Silva",
      avatar: "/placeholder-user.jpg"
    },
    relatedTo: {
      type: "job",
      title: "Múltiplas vagas",
      id: "job-all"
    },
    tags: ["Vagas", "Descrições"],
    createdAt: "2023-03-07T13:30:00Z",
    updatedAt: "2023-03-11T09:15:00Z"
  },
  {
    id: "5",
    title: "Entrevista com candidato senior",
    description: "Realizar entrevista técnica com candidato para a vaga de Desenvolvedor Full Stack Senior",
    dueDate: "Hoje, 15:30",
    status: "completed",
    priority: "urgent",
    assignee: {
      id: "user-4",
      name: "Juliana Lima",
      avatar: "/placeholder-user.jpg"
    },
    relatedTo: {
      type: "candidate",
      title: "Ricardo Mendes",
      id: "candidate-7"
    },
    tags: ["Entrevista", "Senior", "Desenvolvimento"],
    createdAt: "2023-03-08T09:45:00Z",
    updatedAt: "2023-03-11T16:00:00Z"
  },
  {
    id: "6",
    title: "Feedback para candidatos rejeitados",
    description: "Enviar emails com feedback construtivo para os candidatos que não foram selecionados",
    dueDate: "Sexta-feira",
    status: "cancelled",
    priority: "medium",
    assignee: {
      id: "user-1",
      name: "Ana Silva", 
      avatar: "/placeholder-user.jpg"
    },
    tags: ["Feedback", "Candidatos"],
    createdAt: "2023-03-09T11:30:00Z",
    updatedAt: "2023-03-11T09:20:00Z"
  }
];

interface TasksContextType {
  tasks: Task[];
  filteredTasks: Task[];
  sortedTasks: Task[];
  isLoading: boolean;
  isTaskModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  currentTask: Task | null;
  selectedTask: string | null;
  activeView: string;
  searchTerm: string;
  filterStatus: string;
  filterPriority: string;
  filterAssignee: string;
  sortBy: "dueDate" | "priority" | "title";
  sortOrder: "asc" | "desc";
  contextMenu: {
    x: number;
    y: number;
    taskId: string;
    visible: boolean;
  };
  // Form states
  formTitle: string;
  formDescription: string;
  formDueDate: string;
  formPriority: string;
  formStatus: string;
  formAssignee: string;
  formTags: string;
  formRelatedType: string;
  formRelatedItem: string;
  // Actions
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  setFilterPriority: React.Dispatch<React.SetStateAction<string>>;
  setFilterAssignee: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<"dueDate" | "priority" | "title">>;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setContextMenu: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
    taskId: string;
    visible: boolean;
  }>>;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
  // Form actions
  setFormTitle: React.Dispatch<React.SetStateAction<string>>;
  setFormDescription: React.Dispatch<React.SetStateAction<string>>;
  setFormDueDate: React.Dispatch<React.SetStateAction<string>>;
  setFormPriority: React.Dispatch<React.SetStateAction<string>>;
  setFormStatus: React.Dispatch<React.SetStateAction<string>>;
  setFormAssignee: React.Dispatch<React.SetStateAction<string>>;
  setFormTags: React.Dispatch<React.SetStateAction<string>>;
  setFormRelatedType: React.Dispatch<React.SetStateAction<string>>;
  setFormRelatedItem: React.Dispatch<React.SetStateAction<string>>;
  // Task functions
  openNewTaskModal: () => void;
  openEditTaskModal: (taskId: string) => void;
  saveTask: () => void;
  deleteTask: () => void;
  toggleTaskStatus: (taskId: string) => void;
  handleTaskClick: (taskId: string) => void;
  handleSort: (column: "dueDate" | "priority" | "title") => void;
  updateTaskStatus: (taskId: string, newStatus: "pending" | "in-progress" | "completed" | "cancelled") => void;
  duplicateTask: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeView, setActiveView] = useState<string>("list");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "title">("dueDate");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  // Estados para o modal de tarefa
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  
  // Estados para o formulário
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formDueDate, setFormDueDate] = useState<string>("");
  const [formPriority, setFormPriority] = useState<string>("medium");
  const [formStatus, setFormStatus] = useState<string>("pending");
  const [formAssignee, setFormAssignee] = useState<string>("");
  const [formTags, setFormTags] = useState<string>("");
  const [formRelatedType, setFormRelatedType] = useState<string>("");
  const [formRelatedItem, setFormRelatedItem] = useState<string>("");

  // Estado para o menu de contexto
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    taskId: string;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    taskId: "",
    visible: false,
  });

  // Simular carregamento para demonstrar estado de loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  // Carregar tarefas do localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('dashboard_tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Erro ao carregar tarefas do localStorage:', error);
        // Em caso de erro, usar os dados de exemplo
        setTasks(sampleTasks);
      }
    }
  }, []);

  // Salvar tarefas no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Função para filtrar tarefas
  const filteredTasks = tasks.filter(task => {
    // Filtro por status
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    
    // Filtro por prioridade
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    
    // Filtro por responsável
    if (filterAssignee !== "all" && task.assignee?.id !== filterAssignee) return false;
    
    // Filtro por texto de pesquisa
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Ordenar tarefas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Primeiro, colocar tarefas concluídas por último
    if (a.status === "completed" && b.status !== "completed") {
      return 1; // a vem depois de b
    }
    if (a.status !== "completed" && b.status === "completed") {
      return -1; // a vem antes de b
    }
    
    // Se ambas são concluídas ou ambas não são concluídas, usar o critério de ordenação normal
    // Prioridades em ordem numérica (urgent: 3, high: 2, medium: 1, low: 0)
    const priorityOrder: Record<string, number> = {
      "urgent": 3,
      "high": 2,
      "medium": 1,
      "low": 0
    };

    if (sortBy === "priority") {
      return sortOrder === "asc" 
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    if (sortBy === "dueDate") {
      // Simplificando por agora, em um cenário real, deveria converter para Date
      return sortOrder === "asc" 
        ? a.dueDate.localeCompare(b.dueDate)
        : b.dueDate.localeCompare(a.dueDate);
    }
    
    // Default: ordenar por título
    return sortOrder === "asc" 
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  // Função para abrir modal de nova tarefa
  const openNewTaskModal = () => {
    setCurrentTask(null);
    // Resetar formulário
    setFormTitle("");
    setFormDescription("");
    setFormDueDate("");
    setFormPriority("medium");
    setFormStatus("pending");
    setFormAssignee("none");
    setFormTags("");
    setFormRelatedType("none");
    setFormRelatedItem("");
    setIsTaskModalOpen(true);
  };

  // Função para abrir modal de edição de tarefa
  const openEditTaskModal = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    setCurrentTask(task);
    // Preencher formulário com dados da tarefa
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormDueDate(task.dueDate);
    setFormPriority(task.priority);
    setFormStatus(task.status);
    setFormAssignee(task.assignee?.id || "none");
    setFormTags(task.tags?.join(", ") || "");
    setFormRelatedType(task.relatedTo?.type || "none");
    setFormRelatedItem(task.relatedTo?.id || "");
    
    setIsTaskModalOpen(true);
  };

  // Função para salvar tarefa (criar nova ou atualizar existente)
  const saveTask = () => {
    if (!formTitle.trim()) return; // Validação mínima
    
    const tagsArray = formTags
      ? formTags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
      
    const relatedTo = formRelatedType && formRelatedItem && formRelatedType !== "none" && formRelatedItem !== "none"
      ? {
          type: formRelatedType as "job" | "candidate" | "interview" | "project",
          title: formRelatedType === "job" ? "Vaga" : 
                 formRelatedType === "candidate" ? "Candidato" : 
                 formRelatedType === "interview" ? "Entrevista" : "Projeto",
          id: formRelatedItem
        }
      : undefined;
      
    const assignee = formAssignee && formAssignee !== "none"
      ? {
          id: formAssignee,
          name: formAssignee === "user-1" ? "Ana Silva" :
                formAssignee === "user-2" ? "Carlos Oliveira" :
                formAssignee === "user-3" ? "Mariana Costa" :
                formAssignee === "user-4" ? "Juliana Lima" : "Roberto Alves",
          avatar: "/placeholder-user.jpg"
        }
      : undefined;
    
    const newTask: Task = {
      id: currentTask?.id || `task-${Date.now()}`,
      title: formTitle,
      description: formDescription,
      dueDate: formDueDate || "Em breve",
      status: formStatus as "pending" | "in-progress" | "completed" | "cancelled",
      priority: formPriority as "urgent" | "high" | "medium" | "low",
      assignee,
      relatedTo,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      createdAt: currentTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (currentTask) {
      // Atualizar tarefa existente
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === currentTask.id ? newTask : task
        )
      );
    } else {
      // Adicionar nova tarefa
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    
    setIsTaskModalOpen(false);
  };

  // Função para excluir tarefa
  const deleteTask = () => {
    if (!currentTask) return;
    
    setTasks(prevTasks => 
      prevTasks.filter(task => task.id !== currentTask.id)
    );
    
    setIsDeleteDialogOpen(false);
    setIsTaskModalOpen(false);
  };

  // Função para marcar tarefa como concluída
  const toggleTaskStatus = (taskId: string) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: task.status === "completed" ? "pending" : "completed",
              updatedAt: new Date().toISOString()
            } 
          : task
      )
    );
  };

  // Função para destacar uma tarefa
  const handleTaskClick = (taskId: string) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  // Função para alterar a ordenação
  const handleSort = (column: "dueDate" | "priority" | "title") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Função para atualizar status da tarefa (para o Kanban)
  const updateTaskStatus = (taskId: string, newStatus: "pending" | "in-progress" | "completed" | "cancelled") => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus,
              updatedAt: new Date().toISOString()
            } 
          : task
      )
    );
  };

  // Função para duplicar tarefa
  const duplicateTask = (taskId: string) => {
    const taskToDuplicate = tasks.find(task => task.id === taskId);
    if (!taskToDuplicate) return;
    
    const duplicatedTask: Task = {
      ...taskToDuplicate,
      id: `task-${Date.now()}`,
      title: `${taskToDuplicate.title} (Cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, duplicatedTask]);
  };

  const value = {
    tasks,
    filteredTasks,
    sortedTasks,
    isLoading,
    isTaskModalOpen,
    isDeleteDialogOpen,
    currentTask,
    selectedTask,
    activeView,
    searchTerm,
    filterStatus,
    filterPriority,
    filterAssignee,
    sortBy,
    sortOrder,
    contextMenu,
    // Form states
    formTitle,
    formDescription,
    formDueDate,
    formPriority,
    formStatus,
    formAssignee,
    formTags,
    formRelatedType,
    formRelatedItem,
    // Actions
    setTasks,
    setIsLoading,
    setSelectedTask,
    setActiveView,
    setSearchTerm,
    setFilterStatus,
    setFilterPriority,
    setFilterAssignee,
    setSortBy,
    setSortOrder,
    setContextMenu,
    setIsTaskModalOpen,
    setIsDeleteDialogOpen,
    setCurrentTask,
    // Form actions
    setFormTitle,
    setFormDescription,
    setFormDueDate,
    setFormPriority,
    setFormStatus,
    setFormAssignee,
    setFormTags,
    setFormRelatedType,
    setFormRelatedItem,
    // Task functions
    openNewTaskModal,
    openEditTaskModal,
    saveTask,
    deleteTask,
    toggleTaskStatus,
    handleTaskClick,
    handleSort,
    updateTaskStatus,
    duplicateTask
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
} 