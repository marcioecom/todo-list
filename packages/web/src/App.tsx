import * as React from 'react'
import { Box, Container, Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Button } from './components/Button'
import { CreateTaskModal } from './components/CreateTaskModal'
import { Task } from './components/Task'
import { useTask } from './hooks/useTask'

function App() {
  const { tasks } = useTask()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Heading bg="#2FC18C" color="white" textAlign="center" py={2}>
        Ebytr
      </Heading>
      <Container maxW="container.lg" mt={8}>
        <Flex justify="space-between" align="center">
          <VStack align="flex-start">
            <Heading size="lg">Olá Márcio</Heading>
            <Text>Você tem {tasks.length} tarefas</Text>
          </VStack>

          <CreateTaskModal isOpen={isOpen} onClose={onClose} />
          <Button colorScheme="teal" onClick={onOpen}>
            Criar tarefa
          </Button>
        </Flex>

        <Box mt={8}>
          { tasks.length >= 1
            ? tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
            />
            ))
            : <Text textAlign="center">Nenhuma tarefa encontrada</Text>}
        </Box>
      </Container>
    </Box>
  )
}

export default App
