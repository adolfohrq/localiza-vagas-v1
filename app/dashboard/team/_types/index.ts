export type TeamMemberRole = 'admin' | 'manager' | 'recruiter' | 'viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  status: 'active' | 'invited' | 'inactive';
  dateAdded: string;
  lastActive?: string;
}

export interface TeamMemberFormData {
  name: string;
  email: string;
  role: TeamMemberRole;
  department?: string;
  position?: string;
  phone?: string;
}

export interface TeamStats {
  total: number;
  active: number;
  invited: number;
  inactive: number;
  byRole: {
    admin: number;
    manager: number;
    recruiter: number;
    viewer: number;
  };
} 