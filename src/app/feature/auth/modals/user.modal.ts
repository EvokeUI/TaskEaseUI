// export interface Task {
//   title: string;
//   description: string;
//   createdDate: string;       
//   completionDate: string;
//   status: 'pending' | 'in-progress' | 'completed';
// }

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tasks: Task[];
}
export interface Task {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string;
  storyPoints: number;
  priority: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  completionDate?: string;  
  createdDate: string;
}

