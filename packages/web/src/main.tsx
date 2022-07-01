import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { TaskProvider } from './contexts/TasksContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
