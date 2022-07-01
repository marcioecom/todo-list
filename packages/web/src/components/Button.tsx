import * as React from 'react';
import { Button as ButtonChakra, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: Props) {
  return (
    <ButtonChakra
      size="md"
      color='white'
      fontWeight="normal"
      bg='#5850ec'
      _hover={{ bg: '#6875f5' }}
      { ...rest }
    >
      { children }
    </ButtonChakra>
  )
}