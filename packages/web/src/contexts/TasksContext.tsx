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

interface ITaskContext {
  tasks: Task[];
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <TaskContext.Provider value={{ tasks }}>
      {children}
    </TaskContext.Provider>
  )
}
