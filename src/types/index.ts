export interface User {
  id: string;
  telegram_id: string;
  created_at: string;
  balance: number;
  language: string;
  theme: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  image_url: string;
}

export interface UserTask {
  id: string;
  user_id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ru';
