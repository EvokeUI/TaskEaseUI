export interface Task {
  title: string;
  description: string;
  createdDate: string;       
  completionDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tasks: Task[];
}
