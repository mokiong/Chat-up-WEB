import { ChakraProvider } from '@chakra-ui/core';
import React from 'react';
import { discordtheme } from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={discordtheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
