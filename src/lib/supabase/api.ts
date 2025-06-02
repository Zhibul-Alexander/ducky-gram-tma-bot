"use client";

import { User, Task, UserTask } from '@/types';

export async function getOrCreateUser(telegramId: string): Promise<User | null> {
}

export async function getTasks(): Promise<Task[]> {
}

export async function getUserTasks(userId: string): Promise<UserTask[]> {
}

export async function completeTask(userId: string, taskId: string): Promise<boolean> {
}

export async function getCompletedTasksCount(userId: string): Promise<number> {
}

export async function getTotalTasksCount(): Promise<number> {
}

export async function completeQuest(userId: string, reward: number): Promise<boolean> {
}


export async function initializeDatabase(): Promise<boolean> {
}

export async function initializeDefaultTasks(): Promise<boolean> {
}