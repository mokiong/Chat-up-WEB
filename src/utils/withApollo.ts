import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { NextPageContext } from 'next';
import { useMemo } from 'react';

type ApolloState = NormalizedCacheObject | null;

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: 'include',
    }),
    // headers: {
    //   cookie: (typeof window === 'undefined' ? ctx.req.headers.cookie : undefined) || ""
    // },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allArticle: offsetLimitPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: ApolloState
): ApolloClient<NormalizedCacheObject> {
  // This should always create a new Apollo Client on the server
  // The browser will reuse the same Apollo Client if its defined already
  const tempApolloClient = apolloClient ?? createApolloClient();

  // If a page uses getStaticProps/getServerSideProps,
  // the initial state gets hydrated here so as to not refetch the data on the browser
  if (initialState) {
    // Get existing browser cache, loaded during client side data fetching
    const existingCache = tempApolloClient.extract(); // empty cache on server

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    tempApolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return tempApolloClient;
  }

  // Create/define the global Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = tempApolloClient;
  }

  return tempApolloClient;
}

// A react hook that returns the apollo client
export function useApollo(
  initialState: ApolloState
): ApolloClient<NormalizedCacheObject> {
  // Whenever initialState changes, re-initialize apollo client
  const client = useMemo(() => initializeApollo(initialState), [initialState]);

  return client;
}
