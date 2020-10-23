import React from 'react';
import { Box } from '@chakra-ui/core';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mx="auto"
      maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%"
      border="solid"
    >
      {children}
    </Box>
  );
};
