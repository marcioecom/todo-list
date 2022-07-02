import * as React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { Button } from './Button'

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const toast = useToast()
  const { createTask } = useTask()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleCreateTask() {
    try {
      await createTask({ title, description })

      toast({
        position: 'top-right',
        title: 'Tarefa criada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      onClose()
    } catch (err: any) {
      toast({
        position: 'top-right',
        title: 'Erro ao criar tarefa',
        description: err.response.data.message[0],
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={6} isRequired>
            <FormLabel color="gray.600" htmlFor="title">Título</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb={8}>
            <FormLabel color="gray.600" htmlFor="description">Descrição</FormLabel>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Button w="full" onClick={handleCreateTask}>
            Criar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
