import { createContext, ReactNode, useEffect, useState } from "react";
import { taskStatus } from "../components/Task";
import { api } from "../services/api";

export type Task = {
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
  tasks: Task[];
  createTask: (task: ICreateTask) => Promise<void>;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get<Task[]>("/tasks")
      .then((res) => setTasks(res.data))
      .catch(err => console.log(err));
  }, [])

  async function createTask(task: ICreateTask) {
    const { data } = await api.post("/tasks", task)
    setTasks([...tasks, data])
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask }}>
      {children}
    </TaskContext.Provider>
  )
}
