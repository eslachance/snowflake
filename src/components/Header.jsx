import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaKey } from "react-icons/fa";

import userStore from '../store/userStore';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const user = userStore(state => state.userData) // state => state.nuts
  console.log(user)

  if(location.pathname.startsWith('/door/')) {
    return (<div></div>)
  }

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
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          BLOG
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
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
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link to="/unit">Units</Link></MenuItems>
        <MenuItems><Link to="/packages">Packages</Link></MenuItems>
        <MenuItems><Link to="/users">Users</Link></MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {(!user || !user.authenticated) && (
          <Button as={Link} to="/login" leftIcon={<FaKey />} bg="transparent" border="1px">
            Login
          </Button>
        )}
      </Box>
      {user && user.authenticated && (
        <>
          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button as={Link} to="/api/logout" bg="transparent" border="1px">
              Logout
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Header;
