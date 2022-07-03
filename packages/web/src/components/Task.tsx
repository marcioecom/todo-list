import React, { useState } from 'react'
import { Badge, Button as ChakraButton, Checkbox, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Select, Text, VStack } from '@chakra-ui/react'
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
  const { deleteTask, updateTask } = useTask()
  const [isEditing, setIsEditing] = useState(false)
  const [newStatus, setNewStatus] = useState(task.status)

  return (
    <Flex bg="gray.100" rounded="md" px={2} py={2} mb={4}>
      <Checkbox />
      <VStack align={'flex-start'} ml={4} flex={1}>
        <Text fontSize={'lg'}>{task.title}</Text>
        { task.description && <Text color="gray.500">{task.description}</Text> }
        <Badge colorScheme={taskStatus[task.status].color}>
          { taskStatus[task.status].text }
        </Badge>

        { isEditing && (
          <HStack>
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
            <Button onClick={() => updateTask(task.id, { ...task, status: newStatus })}>
              Salvar
            </Button>
          </HStack>
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
