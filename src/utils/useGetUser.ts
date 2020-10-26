import { useMeQuery } from '../generated/graphql';

export const useGetUser = () => {
  const { data } = useMeQuery({
    skip: typeof window === 'undefined',
  });
  console.log('atSerevr: ', typeof window === 'undefined');
  return data?.me?.username;
};
