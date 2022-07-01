import { Badge, Button, Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { FiEdit, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { ITask } from "../contexts/TasksContext";
import { useTask } from "../hooks/useTask";

export const taskStatus = {
  TODO: {
    color: "orange",
    text: "a fazer",
  },
  IN_PROGRESS: {
    color: "yellow",
    text: "em andamento",
  },
  DONE:  {
    color: "green",
    text: "feito",
  },
}

export function Task({ task }: { task: ITask }) {
  const { deleteTask } = useTask();

  return (
    <Flex bg="gray.100" rounded="md" px={2} py={2} mb={4}>
      <Checkbox />
      <VStack align={"flex-start"} ml={4} flex={1}>
        <Text fontSize={"lg"}>{task.title}</Text>
        { task.description && <Text color="gray.500">{task.description}</Text> }
        <Badge colorScheme={taskStatus[task.status].color}>
          { taskStatus[task.status].text }
        </Badge>
      </VStack>

      <Menu>
        <MenuButton as={Button}>
          <FiMoreHorizontal size={20} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <FiEdit style={{ marginRight: '8px'}} />
            Editar
          </MenuItem>
          <MenuItem
            color="red"
            onClick={() => deleteTask(task.id)}
          >
            <FiTrash2 style={{ marginRight: '8px'}} />
            Deletar
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
