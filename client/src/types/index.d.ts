export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  password?: string;
}

export interface NewTodo {
  title: string;
  description: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface Todo extends NewTodo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface UpdateTodo extends NewTodo {
  id: number;
}

export interface LoginUser extends Omit<NewUser, "username"> {}

export interface UpdateUser extends Omit<NewUser, "password"> {
  password?: string;
}
