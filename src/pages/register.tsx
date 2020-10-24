import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Box,
  Center,
  Heading,
} from '@chakra-ui/core';
import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper';
import { Layout } from '../components/Layout';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Layout>
      <Wrapper variant="small">
        <Center p={4} bg="custom.layout">
          <Flex w="100%" direction="column">
            <Heading as="h1" size="2xl" w="100%">
              Chat-Up
            </Heading>
            <Formik
              initialValues={{ username: '', email: '', password: '' }}
              onSubmit={(values) => console.log(values)}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                  <Box mt={4}>
                    <InputField
                      name="email"
                      placeholder="email"
                      label="Email"
                    />
                  </Box>
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
                      register
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </Flex>
        </Center>
      </Wrapper>
    </Layout>
  );
};

export default Register;
