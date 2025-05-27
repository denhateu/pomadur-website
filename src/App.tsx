"use client";

import React, { useRef } from 'react';
import { Container, Box, Text, Button, Flex } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';

const App: React.FC = () => {
  const minutesTextRef = useRef<HTMLDivElement>(null);

  let totalPomodoroSeconds: number = 0;

  // Global Pomodoro interval
  let pomodoroIntervalId: number;

  const updateSeconds = () => {
    let minutesLeft = Math.floor(totalPomodoroSeconds / 60);
    let secondsLeft = totalPomodoroSeconds % 60;

    if (secondsLeft < 10) {
      secondsLeft = '0' + secondsLeft;
    }

    minutesTextRef.current.innerHTML = minutesLeft + ":" + secondsLeft;

    if (minutesLeft === 0 && secondsLeft === 0) {
      clearInterval(pomodoroIntervalId);
    }
  };

  const startPomodoroTimer = () => {
    // Gets minutes from element on page, for example, "25:00"
    const elementText = minutesTextRef.current.innerHTML;

    // Gets only minutes from timer string, example "25:00" -> "25"
    let pomodoroMinutes = elementText.split(":")[0];

    // Minutes to seconds
    totalPomodoroSeconds = Number.parseInt(pomodoroMinutes) * 60;

    pomodoroIntervalId = setInterval(() => {
       totalPomodoroSeconds--;
       updateSeconds();
    }, 1000);
  };

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
            <Text ref={minutesTextRef} mb={2} textAlign="center" textStyle="6xl" fontWeight="bold">25:00</Text>
            <Button w="full" onClick={startPomodoroTimer}>Начать</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
