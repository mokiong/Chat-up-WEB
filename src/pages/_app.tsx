import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/core';
import React from 'react';
import { discordtheme } from '../theme';
import { useApollo } from '../util/withApolloClient';

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  console.log(pageProps);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={discordtheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
