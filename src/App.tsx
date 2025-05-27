"use client";

import React from 'react';
import { Container, Box, Text, Button, Flex } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';

const App: React.FC = () => {
  return (
    <Box>
      <Box py={4}>
        <Container>
          <Flex align="center" justify="space-between">
            <Text textStyle="2xl" fontWeight="bold">Pomadur</Text>
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>
      <Box pt="80px">
        <Container>
          <Box>
            <Text mb={2} textAlign="center" textStyle="6xl" fontWeight="bold">25:00</Text>
            <Button w="full">Начать</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
