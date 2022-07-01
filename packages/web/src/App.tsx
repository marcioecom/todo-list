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
          <Text>Você tem 7 tarefas</Text>
        </VStack>

        <CreateTaskModal isOpen={isOpen} onClose={onClose} />
        <Button colorScheme="teal" onClick={onOpen}>
          Criar tarefa
        </Button>
      </Flex>

      <Box mt={8}>
        { tasks && tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        ))}
      </Box>
    </Container>
  )
}

export default App
