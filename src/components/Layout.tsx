import { Box } from '@chakra-ui/core';
import { FC } from 'react';

export const Layout: FC = ({ children }) => {
  return (
    <Box
      w="100%"
      minH="100vh"
      padding="30px"
      border="1px solid black"
      mx="auto"
      textAlign="center"
      bg="custom.bg"
    >
      {children}
    </Box>
  );
};
