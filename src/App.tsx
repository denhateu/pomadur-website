"use client"

import React, { useRef, useState } from "react"
import { Container, Box, Text, Button, Flex, Stack } from "@chakra-ui/react"
import { ColorModeButton } from "./components/ui/color-mode"

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isPause, setIsPause] = useState(false)

  let timerTextRef = useRef<HTMLDivElement>(null)
  let pomodoroIntervalId = useRef<number | null>(null)
  let totalPomodoroSeconds = useRef<number | null>(null)

  let minutesText: string = ""
  if (timerTextRef.current) {
    minutesText = timerTextRef.current.innerHTML
  }

  const updateSeconds = (seconds: number = 0) => {
    let minutesLeft = Math.floor(seconds / 60)
    let secondsLeft = seconds % 60

    if (secondsLeft < 10) {
      secondsLeft = "0" + secondsLeft
    }

    if (timerTextRef.current) {
      timerTextRef.current.innerHTML = minutesLeft + ":" + secondsLeft
    }

    // Checks if timer time is 0 minutes and 0 seconds and stop pomodoro timer interval
    if (minutesLeft === 0 && secondsLeft === 0) {
      stopPomodoroTimer()
    }
  }

  const startPomodoroTimer = () => {
    if (timerTextRef.current) {
      // Gets minutes from element on page, for example, "25:00"
      const elementText = timerTextRef.current.innerHTML

      // Gets only minutes from timer string, example "25:00" -> "25"
      let pomodoroMinutes = elementText.split(":")[0]

      // Minutes to seconds
      totalPomodoroSeconds.current = Number.parseInt(pomodoroMinutes) * 60

      // If interval started, do nothing
      if (pomodoroIntervalId.current) return;

      // Starting pomodoro timer interval
      pomodoroIntervalId.current = setInterval(() => {
        totalPomodoroSeconds.current--
        updateSeconds(totalPomodoroSeconds.current)
      }, 1000)

      setIsRunning(true)
      setIsPause(false)
    }
  }

  const stopPomodoroTimer = () => {
    if (pomodoroIntervalId.current) {
      // Reset timer
      totalPomodoroSeconds.current = Number.parseInt(minutesText) * 60;
      updateSeconds(totalPomodoroSeconds.current)

      clearInterval(pomodoroIntervalId.current)
      pomodoroIntervalId.current = null

      setIsRunning(false)
    } else {
      // Reset timer
      totalPomodoroSeconds.current = Number.parseInt(minutesText) * 60;
      updateSeconds(totalPomodoroSeconds.current)
    }
  }

  const pausePomodoroTimer = () => {
    if (pomodoroIntervalId.current) {
      clearInterval(pomodoroIntervalId.current)
      pomodoroIntervalId.current = null

      setIsPause(true)
    }
  }

  const resumePomodoroTimer = () => {
    console.log(totalPomodoroSeconds.current)
    console.log("resume")

    pomodoroIntervalId.current = setInterval(() => {
      totalPomodoroSeconds.current--
      updateSeconds(totalPomodoroSeconds.current)
    }, 1000)

    setIsRunning(true)
    setIsPause(false)
  }

  return (
    <Box>
      <Box py={4}>
        <Container>
          <Flex align="center" justify="space-between">
            <Text textStyle="2xl" fontWeight="bold">
              Pomadur
            </Text>
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>
      <Box pt="80px">
        <Container>
          <Box>
            <Text
              ref={timerTextRef}
              mb={2}
              textAlign="center"
              textStyle="6xl"
              fontWeight="bold"
            >
              25:00
            </Text>
            {isRunning ? (
              <Stack>
                {isPause ? (
                  <Button w="full" onClick={resumePomodoroTimer}>
                    Продолжить
                  </Button>
                ) : (
                  <Button w="full" onClick={pausePomodoroTimer}>
                    Пауза
                  </Button>
                )}
                <Button w="full" onClick={stopPomodoroTimer}>
                  Стоп
                </Button>
              </Stack>
            ) : (
              <Button w="full" onClick={startPomodoroTimer}>
                Начать
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default App
