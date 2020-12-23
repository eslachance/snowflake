import React from 'react';
import { Field, Form, Formik } from 'formik';

import { useHistory, Redirect } from 'react-router-dom';

import {
  Box,
  Button,
  CSSReset,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react';

import userStore from '../store/userStore';
import postStore from '../store/postStore';

import Jumbotron from '../components/Jumbotron.js';

const LoginPage = () => {
  const user = userStore(state => state.userData);
  const { newPost } = postStore();
  const history = useHistory();

  if (user && !user.authenticated) {
    console.log(user);
    return (
      <Redirect to="/" />
    );
  }

  const badgeRadius = 4;

  function handleSubmit(data) {
    newPost(data)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        history.push('/');
      });
  }

  return (
    <div styles={{ position: 'relative' }}>
      <CSSReset />
      <Jumbotron title="New Blog Post" subtext="A penny for your thoughts" />
      <Flex
        // position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="sm"
          p={4}
          pt={`${badgeRadius + 1}em`}
          borderRadius="md"
          shadow="lg"
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ title: '', content: '' }}
              onSubmit={handleSubmit}
            >
              {() =>
                <Form>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <InputGroup>
                        <Field type="text" name="title" placeholder="title">
                          {({ field, form }) =>
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                              <FormLabel htmlFor="name">Post Title</FormLabel>
                              <Input {...field} id="title" placeholder="title" />
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          }
                        </Field>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <InputGroup>
                        <Field component="textarea" name="content" placeholder="content">
                          {({ field, form }) =>
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                              <FormLabel htmlFor="name">content</FormLabel>
                              <textarea {...field} id="content" placeholder="content"></textarea>
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          }
                        </Field>
                      </InputGroup>
                    </FormControl>
                    <Divider />
                    <Button disabled={false} variantColor="blue" type="submit" shadow="md">
                      Login
                    </Button>
                  </Stack>
                </Form>
              }
            </Formik>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default LoginPage;
