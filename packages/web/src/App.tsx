import { Box, Container, Flex, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { Button } from "./components/Button";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { Task } from "./components/Task"
import { useTask } from "./hooks/useTask"

function App() {
  const { tasks } = useTask();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="container.lg" mt={8}>
      <Flex justify="space-between" align="center">
        <VStack align="flex-start">
          <Heading>Olá Márcio</Heading>
          <Text>Você tem {tasks.length} tarefas</Text>
        </VStack>

        <CreateTaskModal isOpen={isOpen} onClose={onClose} />
        <Button colorScheme="teal" onClick={onOpen}>
          Criar tarefa
        </Button>
      </Flex>

      <Box mt={8}>
        { tasks.length >= 1 ? tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
          />
        )) : <Text textAlign="center">Nenhuma tarefa encontrada</Text>}
      </Box>
    </Container>
  )
}

export default App
