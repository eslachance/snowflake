import React, { useState } from 'react';
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
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';

import userStore from '../store/userStore';

// import Jumbotron from '../components/Jumbotron.js';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const user = userStore(state => state.userData);
  const login = userStore(state => state.login);
  const history = useHistory();

  if (user.authenticated) {
    // console.log(user);
    return (
      <Redirect to="/" />
    );
  }

  const badgeRadius = 4;

  function handleToggle(e) {
    e.preventDefault();
    setShowPass(!showPass);
  }

  function handleSubmit(data) {
    login(data)
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
      {/* <Jumbotron title="WLIH Login" subtext="Identify yourself, stranger!" /> */}
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
        <Flex
          alignItems="center"
          justifyContent="center"
          size={`${badgeRadius * 2}em`}
          borderRadius="50%"
          mb={`-${badgeRadius}em`}
          shadow="sm"
          zIndex="docked"
        >
          <Icon
            name="WarningIcon"
            size={`${badgeRadius + 1}em`}
            mt={`${badgeRadius / 6}em`}
          />
        </Flex>
        <Box
          w="sm"
          p={4}
          pt={`${badgeRadius + 1}em`}
          borderRadius="md"
          shadow="lg"
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={handleSubmit}
            >
              {() =>
                <Form>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon name="account" />
                        </InputLeftElement>
                        <Field type="text" name="username" placeholder="Username">
                          {({ field, form }) =>
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                              <FormLabel htmlFor="name">Username</FormLabel>
                              <Input {...field} id="username" placeholder="Username" />
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          }
                        </Field>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon name="lock" />
                        </InputLeftElement>
                        <Field name="password" placeholder="password">
                          {({ field, form }) =>
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                              <FormLabel htmlFor="name">Password</FormLabel>
                              <Input {...field} type={showPass ? 'text' : 'password'} id="password" placeholder="password" />
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          }
                        </Field>
                        <InputRightElement>
                          <IconButton
                            icon={showPass ? 'hide' : 'show'}
                            variant="ghost"
                            size="sm"
                            onClick={handleToggle}
                            title={`${showPass ? 'Hide' : 'Show'} Password`}
                          />
                        </InputRightElement>
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
