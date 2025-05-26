import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <Box p={5} textAlign="center">
      <Heading mb={4}>Добро пожаловать в Chakra UI с Vite и TypeScript!</Heading>
      <Text fontSize="lg" mb={4}>
        Используйте готовые компоненты для быстрого создания интерфейсов.
      </Text>
      <Button colorScheme="teal">Кнопка</Button>
    </Box>
  );
};

export default App;
