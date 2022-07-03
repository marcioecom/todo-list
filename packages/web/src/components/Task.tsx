import React, { useState } from 'react'
import {
  Badge,
  Button as ChakraButton,
  // Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { ITask } from '../contexts/TasksContext'
import { useTask } from '../hooks/useTask'
import { Button } from './Button'

export const taskStatus = {
  TODO: {
    color: 'orange',
    text: 'pendente'
  },
  IN_PROGRESS: {
    color: 'yellow',
    text: 'em andamento'
  },
  DONE: {
    color: 'green',
    text: 'pronto'
  }
}

export function Task({ task }: { task: ITask }) {
  const toast = useToast()
  const { deleteTask, updateTask } = useTask()
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const [newDescription, setNewDescription] = useState(task.description)
  const [newStatus, setNewStatus] = useState(task.status)

  async function handleEditMessage(taskId: string) {
    try {
      await updateTask(taskId, {
        ...task,
        title: newTitle,
        description: newDescription,
        status: newStatus
      })
      setIsEditing(false)
    } catch (err: any) {
      console.log(err.response.data.message)
      toast({
        position: 'top-right',
        title: err.response.data.message[0],
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Flex bg="gray.100" rounded="md" px={2} py={2} mb={4}>
      {/* <Checkbox /> */}
      <VStack align={'flex-start'} ml={2} flex={1}>
        { isEditing
          ? (
            <FormControl>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Input
                id="title"
                bg="white"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fontSize={'lg'}
              />
            </FormControl>
            )
          : <Text fontSize={'lg'}>{task.title}</Text>
        }

        { isEditing && task.description
          ? (
            <FormControl>
              <FormLabel htmlFor="desc">Descrição</FormLabel>
              <Input
                id="desc"
                bg="white"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                fontSize={'lg'}
              />
            </FormControl>
            )
          : <Text color="gray.500">{task.description}</Text>
        }

        { isEditing
          ? (
            <HStack align="flex-end">
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  bg="white"
                  value={newStatus}
                  onChange={
                    (e) => setNewStatus(e.target.value as ITask['status'])
                  }>
                  <option value="TODO">Pendente</option>
                  <option value="IN_PROGRESS">Em Andamento</option>
                  <option value="DONE">Pronto</option>
                </Select>
              </FormControl>
              <Button onClick={() => handleEditMessage(task.id)}>
                Salvar
              </Button>
            </HStack>
            )
          : (
          <Badge colorScheme={taskStatus[task.status].color}>
            { taskStatus[task.status].text }
          </Badge>
            )}
      </VStack>

      <Menu>
        <MenuButton as={ChakraButton}>
          <FiMoreHorizontal size={20} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setIsEditing(!isEditing)}>
            <FiEdit style={{ marginRight: '8px' }} />
            Editar
          </MenuItem>
          <MenuItem
            color="red"
            onClick={() => deleteTask(task.id)}
          >
            <FiTrash2 style={{ marginRight: '8px' }} />
            Deletar
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
