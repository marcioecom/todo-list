import { createContext, ReactNode, useEffect, useState } from "react";
import { taskStatus } from "../components/Task";
import { api } from "../services/api";

export type ITask = {
  id: string;
  title: string;
  description?: string;
  status: keyof typeof taskStatus;
  createdAt: string;
  updatedAt: string;
}

type ICreateTask = {
  title: string;
  description?: string;
}

interface ITaskContext {
  tasks: ITask[];
  createTask: (task: ICreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    api.get<ITask[]>("/tasks")
      .then((res) => setTasks(res.data))
      .catch(err => console.log(err));
  }, [])

  async function createTask(task: ICreateTask) {
    const { data } = await api.post("/tasks", task)
    setTasks([...tasks, data])
  }

  async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`)
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
