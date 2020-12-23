import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
// import { FaKey } from 'react-icons/fa';

import userStore from '../store/userStore';

const MenuItems = ({ children }) =>
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
;

const Header = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const user = userStore(state => state.userData); // state => state.nuts
  const logout = userStore(state => state.logout);
  console.log(user);

  const handleLogout = () => {
    logout().then(() => {
      history.push('/');
    });
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#2A9FD6"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Snowflake
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        mt={{ base: 4, md: 0 }}
        alignItems="flex-end"
      >
        {user && user.authenticated &&
          <>
            <MenuItems><a onClick={handleLogout} href="">Logout</a></MenuItems>
            {user.isAdmin &&
              <>
                <MenuItems><Link to="/admin">Admin</Link></MenuItems>
              </>
            }
            <MenuItems><Link to="/profile"><b>{user.username}</b></Link></MenuItems>
          </>
        }
        {(!user || !user.authenticated) &&
          <>
            <MenuItems><Link to="/register">Register</Link></MenuItems>
            <MenuItems><Link to="/login">Login</Link></MenuItems>
          </>
        }
      </Box>
    </Flex>
  );
};

export default Header;
