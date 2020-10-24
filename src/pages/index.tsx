import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../utils/withApollo';

const MyQuery = gql`
  query MyQuery {
    users {
      id
      username
    }
  }
`;

export default function Index() {
  const { data, loading } = useQuery(MyQuery);

  if (loading) return <span>loading...</span>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo(null);

  await apolloClient.query({
    query: MyQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
