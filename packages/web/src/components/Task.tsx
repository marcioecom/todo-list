import { Badge, Checkbox, Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";

interface ITask {
  title: string;
  description?: string;
  status: keyof typeof taskStatus;
}

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

export function Task({ title, description, status }: ITask) {
  return (
    <Flex bg="gray.100" rounded="md" px={2} py={1} mb={4}>
      <Checkbox />
      <VStack align={"flex-start"} ml={4} flex={1}>
        <Text fontSize={"lg"}>{title}</Text>
        { description && <Text color="gray.500">{description}</Text> }
        <Badge colorScheme={taskStatus[status].color}>
          { taskStatus[status].text }
        </Badge>
      </VStack>

      <IconButton aria-label="edit-btn" icon={<FiMoreHorizontal size={20} />} />
    </Flex>
  )
}
