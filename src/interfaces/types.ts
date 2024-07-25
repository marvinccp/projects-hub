export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  photoURL: string;
  projects: Project[];
}

export interface Task {
  id: string;
  task: string;
  state: boolean;
  projectId: string;
  createdAt: string;
  updateAt: string;
}

export interface Project {
  id: string;
  title:string;
  active:boolean;
  project: string;
  time: number;
  userId: string | null;
  createdAt: string;
  updateAt: string;
  tasks: Task[];
}

export type allUser = User | Task | Project;
