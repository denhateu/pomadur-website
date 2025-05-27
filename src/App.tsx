import React from 'react';
import { Container, Box, Text, Button } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <Box>
      <Container>
        <Box>
          <Text mb={2} textAlign="center" textStyle="6xl" fontWeight="bold">25:00</Text>
          <Button w="full">Начать</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
