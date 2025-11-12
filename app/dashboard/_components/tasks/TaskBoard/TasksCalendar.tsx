'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Plus, 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  X,
  Edit,
  Info,
  Tag
} from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { useState, useEffect } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { TaskViewModal } from "./TaskViewModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * Componente de visualização em calendário das tarefas
 * Versão aprimorada com foco em experiência do usuário
 */
export function TasksCalendar() {
  const { 
    tasks, 
    openEditTaskModal, 
    openNewTaskModal, 
    toggleTaskStatus, 
    updateTaskStatus, 
    setFormDueDate,
    setCurrentTask
  } = useTasks();
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Estado para controlar o modal de visualização/criação
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{day: number, month: number, year: number} | null>(null);
  
  // Nomes dos meses em português
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Nomes dos dias da semana em português
  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  // Função para navegar para o mês anterior
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Função para navegar para o próximo mês
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Função para navegar para o mês atual
  const goToCurrentMonth = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  };
  
  // Função para gerar os dias do mês atual
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const calendarDays = [];
    
    // Adicionar dias do mês anterior para preencher o início do mês
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = daysInPrevMonth - startingDayOfWeek + i + 1;
      calendarDays.push({ 
        day: prevMonthDay, 
        isCurrentMonth: false,
        month: prevMonth,
        year: prevMonthYear
      });
    }
    
    // Adicionar os dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ 
        day, 
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear
      });
    }
    
    // Adicionar dias do próximo mês para completar a última semana
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 7 - (calendarDays.length % 7);
    
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push({ 
          day: i, 
          isCurrentMonth: false,
          month: nextMonth,
          year: nextMonthYear
        });
      }
    }
    
    return calendarDays;
  };
  
  // Função para analisar a data de uma tarefa
  const parseTaskDate = (dateStr: string) => {
    // Formato esperado: DD/MM/YYYY
    if (!dateStr) return null;
    
    // Tentar extrair dia, mês e ano da string de data
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Mês em JavaScript é 0-indexed
      const year = parseInt(parts[2], 10);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return { day, month, year };
      }
    }
    
    // Verificar se a string contém "hoje"
    if (dateStr.toLowerCase().includes('hoje')) {
      const today = new Date();
      return { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
    }
    
    // Verificar se a string contém "amanhã"
    if (dateStr.toLowerCase().includes('amanhã')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { day: tomorrow.getDate(), month: tomorrow.getMonth(), year: tomorrow.getFullYear() };
    }
    
    // Fallback: verificar se a string contém números que podem ser dias
    const dayMatch = dateStr.match(/\b(\d{1,2})\b/);
    if (dayMatch) {
      const day = parseInt(dayMatch[1], 10);
      if (day >= 1 && day <= 31) {
        return { day, month: currentMonth, year: currentYear };
      }
    }
    
    return null;
  };
  
  // Função para verificar se um dia tem tarefas
  const getTasksForDay = (day: number | null, month: number, year: number) => {
    if (!day) return [];
    
    return tasks.filter(task => {
      const taskDate = parseTaskDate(task.dueDate);
      
      if (taskDate && taskDate.day === day && taskDate.month === month && taskDate.year === year) {
        return true;
      }
      
      return false;
    });
  };
  
  // Função para criar uma nova tarefa em um dia específico
  const createTaskForDay = (day: number, month: number, year: number) => {
    // Definir a data selecionada
    setSelectedDate({ day, month, year });
    
    // Formatar a data para o formato esperado pelo modal
    const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
    
    // Definir a data de vencimento no contexto
    setFormDueDate(formattedDate);
    
    // Indicar que estamos criando uma nova tarefa
    setIsCreatingTask(true);
    
    // Limpar qualquer tarefa selecionada
    setSelectedTaskId(null);
    
    // Abrir o modal
    setViewModalOpen(true);
  };
  
  // Função para abrir o modal de visualização de uma tarefa existente
  const openViewModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsCreatingTask(false);
    setViewModalOpen(true);
  };
  
  // Função para fechar o modal
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedTaskId(null);
    setIsCreatingTask(false);
    setSelectedDate(null);
  };
  
  // Função para renderizar o indicador de prioridade
  const renderPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <div className="w-1 h-full absolute left-0 top-0 bg-red-500"></div>;
      case 'high':
        return <div className="w-1 h-full absolute left-0 top-0 bg-orange-500"></div>;
      case 'medium':
        return <div className="w-1 h-full absolute left-0 top-0 bg-blue-500"></div>;
      case 'low':
        return <div className="w-1 h-full absolute left-0 top-0 bg-green-500"></div>;
      default:
        return null;
    }
  };
  
  // Função para renderizar o ícone de status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />;
      case 'in-progress':
        return <ArrowRight className="h-3 w-3 text-blue-500 flex-shrink-0" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-amber-500 flex-shrink-0" />;
      default:
        return null;
    }
  };
  
  // Função para renderizar o badge de prioridade
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500 text-white text-xs">Urgente</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white text-xs">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 text-white text-xs">Média</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white text-xs">Baixa</Badge>;
      default:
        return null;
    }
  };
  
  // Gerar os dias do calendário
  const calendarDays = generateCalendarDays();
  
  // Verificar se hoje está no mês atual
  const today = new Date();
  const isCurrentMonthYear = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const currentDate = today.getDate();
  
  // Obter tarefas para o dia selecionado
  const selectedDayTasks = selectedDay 
    ? getTasksForDay(selectedDay, selectedMonth, selectedYear) 
    : [];
  
  // Efeito para limpar o dia selecionado ao mudar de mês
  useEffect(() => {
    setSelectedDay(null);
  }, [currentMonth, currentYear]);
  
  return (
    <div className="flex flex-col h-full relative">
      <TooltipProvider>
        <Card className="border shadow-sm w-full flex flex-col overflow-hidden">
          <CardHeader className="p-3 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                {!isCurrentMonthYear && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs gap-1"
                    onClick={goToCurrentMonth}
                  >
                    <Calendar className="h-3 w-3" />
                    <span>Hoje</span>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth} className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextMonth} className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-px bg-muted flex-shrink-0">
              {weekdayNames.map((day, index) => (
                <div key={index} className="p-1 text-center text-xs font-medium bg-white dark:bg-gray-800">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-px bg-muted flex-1 overflow-hidden auto-rows-fr">
              {calendarDays.map((dayObj, index) => {
                const { day, isCurrentMonth, month, year } = dayObj;
                const isToday = day === currentDate && month === today.getMonth() && year === today.getFullYear();
                const isSelected = day === selectedDay && month === selectedMonth && year === selectedYear;
                const tasksForDay = getTasksForDay(day, month, year);
                
                // Verificar se há tarefas urgentes ou atrasadas
                const hasUrgentTasks = tasksForDay.some(task => task.priority === 'urgent');
                const hasHighPriorityTasks = tasksForDay.some(task => task.priority === 'high');
                const hasOverdueTasks = tasksForDay.some(task => {
                  const taskDate = parseTaskDate(task.dueDate);
                  if (!taskDate) return false;
                  
                  const taskDateTime = new Date(taskDate.year, taskDate.month, taskDate.day);
                  return taskDateTime < today && task.status !== 'completed' && task.status !== 'cancelled';
                });
                
                return (
                  <div 
                    key={index} 
                    className={`p-1 bg-white dark:bg-gray-800 relative transition-colors flex flex-col
                      ${!isCurrentMonth ? 'opacity-40 hover:opacity-60' : 'hover:bg-muted/10'}
                      ${isToday ? 'bg-primary/5 ring-1 ring-primary/20' : ''}
                      ${isSelected ? 'bg-primary/10 ring-1 ring-primary/30' : ''}
                      ${hasUrgentTasks ? 'ring-1 ring-red-200' : ''}
                      ${hasOverdueTasks ? 'ring-1 ring-amber-200' : ''}
                      cursor-pointer
                    `}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedMonth(month);
                      setSelectedYear(year);
                    }}
                  >
                    {day && (
                      <>
                        <div className="flex items-center justify-between mb-0.5 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center
                              ${isToday ? 'bg-primary text-white' : ''}
                              ${isSelected && !isToday ? 'bg-primary/20 text-primary' : ''}
                            `}>
                              {day}
                            </span>
                            
                            {hasUrgentTasks && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Tarefas urgentes</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            
                            {hasHighPriorityTasks && !hasUrgentTasks && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Tarefas de alta prioridade</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            
                            {hasOverdueTasks && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Tarefas atrasadas</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          
                          {isCurrentMonth && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100">
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  createTaskForDay(day, month, year);
                                }}>
                                  <Plus className="mr-2 h-4 w-4" />
                                  Nova tarefa
                                </DropdownMenuItem>
                                
                                {tasksForDay.length > 0 && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedDay(day);
                                      setSelectedMonth(month);
                                      setSelectedYear(year);
                                    }}>
                                      <Calendar className="mr-2 h-4 w-4" />
                                      Ver todas ({tasksForDay.length})
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        
                        {/* Tarefas do dia - limitado a 2 visíveis */}
                        <div className="flex-1 overflow-hidden">
                          {tasksForDay.slice(0, 2).map(task => (
                            <div 
                              key={task.id}
                              className={`text-[10px] py-0.5 px-1 rounded relative overflow-hidden cursor-pointer mb-0.5
                                ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' : 
                                  task.status === 'in-progress' ? 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200' : 
                                  task.status === 'cancelled' ? 'bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-300' : 
                                  task.priority === 'urgent' ? 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200' :
                                  task.priority === 'high' ? 'bg-orange-50 text-orange-900 dark:bg-orange-950 dark:text-orange-200' :
                                  'bg-muted/50'}
                                hover:brightness-95 transition-all group
                              `}
                              onClick={(e) => {
                                e.stopPropagation();
                                openViewModal(task.id);
                              }}
                            >
                              {renderPriorityIndicator(task.priority)}
                              <div className="flex items-center gap-0.5 pl-1.5">
                                {renderStatusIcon(task.status)}
                                <span className={`truncate ${task.status === 'completed' || task.status === 'cancelled' ? 'line-through opacity-70' : ''}`}>
                                  {task.title}
                                </span>
                              </div>
                            </div>
                          ))}
                          {tasksForDay.length > 2 && (
                            <div className="text-[10px] text-muted-foreground text-center">
                              +{tasksForDay.length - 2} mais
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
      
      {/* Modal para visualização e criação de tarefas */}
      <TaskViewModal 
        isOpen={viewModalOpen} 
        onClose={closeViewModal} 
        taskId={selectedTaskId}
        isCreatingTask={isCreatingTask}
        selectedDate={selectedDate}
      />
      
      {/* Popup modal para detalhes do dia selecionado */}
      {selectedDay && (
        <div className="fixed top-0 right-0 h-full w-80 bg-background border-l shadow-lg z-50 animate-in slide-in-from-right duration-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium text-sm">
                {selectedDay} de {monthNames[selectedMonth]}
                {selectedDay === currentDate && 
                 selectedMonth === today.getMonth() && 
                 selectedYear === today.getFullYear() && 
                 <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-[10px]">Hoje</Badge>
                }
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => {
                setSelectedDay(null);
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          
          <div className="p-4 border-b">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={() => createTaskForDay(selectedDay, selectedMonth, selectedYear)}
            >
              <Plus className="h-4 w-4" />
              <span>Nova tarefa para este dia</span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {selectedDayTasks.length > 0 ? (
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Tarefas para este dia ({selectedDayTasks.length})
                  </h4>
                  
                  {selectedDayTasks.map(task => (
                    <div 
                      key={task.id}
                      className="border rounded-md p-3 hover:shadow-sm transition-shadow cursor-pointer relative group"
                      onClick={() => openViewModal(task.id)}
                    >
                      {renderPriorityIndicator(task.priority)}
                      <div className="flex items-start gap-2 pl-1">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              {renderStatusIcon(task.status)}
                              <h4 className={`font-medium text-sm ${task.status === 'completed' || task.status === 'cancelled' ? 'line-through opacity-70' : ''}`}>
                                {task.title}
                              </h4>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {renderPriorityBadge(task.priority)}
                            <Badge variant="outline" className="text-xs">
                              {task.dueDate}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              openEditTaskModal(task.id);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              toggleTaskStatus(task.id);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              {task.status === 'completed' ? 'Marcar como pendente' : 'Concluir'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
                <h3 className="font-medium text-sm mb-1">Nenhuma tarefa</h3>
                <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">
                  Não há tarefas agendadas para {selectedDay} de {monthNames[selectedMonth]}.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => createTaskForDay(selectedDay, selectedMonth, selectedYear)}
                >
                  <Plus className="h-3 w-3" />
                  <span>Adicionar tarefa</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 