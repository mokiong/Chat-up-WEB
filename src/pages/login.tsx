import { Center, Flex, Heading, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { InputField } from '../components/inputField';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { getUser } from '../utils/getUser';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {}

const login: FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  if (getUser()) {
    // user already logged in
    router.push('/');
  }

  return (
    <Layout>
      <Wrapper variant="small">
        <Center p={4} bg="custom.layout">
          <Flex w="100%" direction="column">
            <Heading as="h1" size="2xl" w="100%">
              Chat-Up
            </Heading>
            <Box mt={4} paddingLeft="50px" paddingRight="50px">
              <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login({
                    variables: { ...values },
                  });

                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    router.push('/');
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      name="usernameOrEmail"
                      placeholder="username or email"
                      label="Username or Email"
                    />
                    <Box mt={4}>
                      <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        type="password"
                      />
                    </Box>
                    <Center>
                      <Button
                        mt={4}
                        isLoading={isSubmitting}
                        type="submit"
                        background="custom.primary"
                        color="custom.bg"
                      >
                        login
                      </Button>
                    </Center>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Center>
      </Wrapper>
    </Layout>
  );
};

export default login;
