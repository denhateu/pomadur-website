import React from 'react';
import { Box, AbsoluteCenter, Text, Button } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter w="full">
        <Box w="full" maxW="300px">
          <Text mb={4} textAlign="center" textStyle="6xl" fontWeight="bold">25:00</Text>
          <Button w="full">Начать</Button>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
};

export default App;
