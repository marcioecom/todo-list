import { useContext } from 'react'
import { TaskContext } from '../contexts/TasksContext'

export function useTask() {
  const value = useContext(TaskContext)
  return value
}
