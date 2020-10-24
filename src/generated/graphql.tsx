import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  channels: Array<Channel>;
  channel: ChannelOutput;
  me: Me;
  users: Array<User>;
  user: User;
  messages: Array<Message>;
};


export type QueryChannelArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['Int'];
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
  messages: Array<Message>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  channels: Participant;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  userId: Scalars['Float'];
  channelId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  channelId: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type ChannelOutput = {
  __typename?: 'ChannelOutput';
  error?: Maybe<Scalars['String']>;
  channel?: Maybe<Channel>;
};

export type Me = {
  __typename?: 'Me';
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  joinChannel: Participant;
  leaveChannel: Scalars['Boolean'];
  login: UserResponse;
  createUser: User;
  logout: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
};


export type MutationJoinChannelArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateUserArgs = {
  args: UserInput;
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = (
  { __typename?: 'Query' }
  & { channels: Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name'>
  )> }
);


export const ChannelsDocument = gql`
    query Channels {
  channels {
    id
    name
  }
}
    `;

/**
 * __useChannelsQuery__
 *
 * To run a query within a React component, call `useChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
        return Apollo.useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
      }
export function useChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          return Apollo.useLazyQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsQueryResult = Apollo.QueryResult<ChannelsQuery, ChannelsQueryVariables>;