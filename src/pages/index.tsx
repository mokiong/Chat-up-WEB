import { gql, useQuery } from '@apollo/client';
import { Textarea } from '@chakra-ui/core';
import { useMeQuery } from '../generated/graphql';
import { initializeApollo } from '../utils/withApollo';

export default function Index() {
  const { data, loading } = useMeQuery();

  if (loading) return <span>loading...</span>;
  if (!data?.me) return <span>no data found</span>;

  return (
    <div>
      <pre>{data.me.username}</pre>
    </div>
  );
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo(null);

//   await apolloClient.query({
//     query: MyQuery,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
