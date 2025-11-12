import { LucideIcon } from "lucide-react";

export interface SidebarItemBadge {
  content: string | number;
  variant?: "default" | "destructive" | "outline" | "secondary";
}

export interface SidebarItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  badge?: SidebarItemBadge;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
} 