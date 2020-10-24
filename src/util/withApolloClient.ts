import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createIsomorphicLink = () => {
  if (typeof window === 'undefined') {
    // server
    console.log('at server');
  } else {
    // client
    const { HttpLink } = require('@apollo/client/link/http');
    return new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
