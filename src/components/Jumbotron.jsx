import React from 'react';
import { Box, Container, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

const Jumbotron = (props) => {
  const { title, subtext, action, actionLink } = props;
  return (
    <Container w="100%" p={0} centerContent>
      <Box borderRadius="md" padding={4} bg="gray.100" w="100%">
        <Heading as="h1" size="2xl">{title}</Heading>
        {subtext && <Heading as="h2" size="xl">{subtext}</Heading>}
        {action && <Button colorScheme="blue" as={Link} to={actionLink}>{action}</Button>}
      </Box>
    </Container>
  );
};

export default Jumbotron;
