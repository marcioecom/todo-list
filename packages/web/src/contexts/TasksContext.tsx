import { createContext } from "react";

interface ITaskContext {}

export const TaskContext = createContext<ITaskContext>({});

export function TaskProvider() {}
