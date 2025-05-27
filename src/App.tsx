"use client"

import React, { useRef, useState } from "react"
import { Container, Box, Text, Button, Flex, Stack } from "@chakra-ui/react"
import { ColorModeButton } from "./components/ui/color-mode"

const App: React.FC = () => {
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false)
  const [isPomodoroPause, setIsPomodoroPause] = useState(false)

  const timerTimeRef = useRef(null)
  const pomodoroIntervalId = useRef<number | null>(null)
  const pomodoroMinutes = useRef<number | null>(0)

  let totalPomodoroSeconds = useRef<number | undefined>(0)

  if (pomodoroMinutes.current == 0) {
    if (timerTimeRef.current) {
      pomodoroMinutes.current = timerTimeRef.current.innerHTML
    }
  }

  const getTimerSeconds = () => {
    if (timerTimeRef.current) {
      // Gets minutes from element on page, for example, "25:00"
      const timerMinutes = timerTimeRef.current.innerHTML

      // Gets only minutes from timer string, example "25:00" -> "25"
      let pomodoroMinutes = timerMinutes.split(":")[0]

      // Minutes to seconds
      return Number.parseInt(pomodoroMinutes) * 60
    }
  }

  const updateTimer = (totalSeconds: number = 0) => {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    if (timerTimeRef.current) {
      timerTimeRef.current.innerHTML = minutes + ":" + seconds
    }

    // Checks if timer time is 0 minutes and 0 seconds and stop pomodoro timer interval
    if (minutes === 0 && seconds === 0) {
      pomodoro("stop")
    }
  }

  const startTimer = () => {
    // Starting pomodoro timer interval
    pomodoroIntervalId.current = setInterval(() => {
      totalPomodoroSeconds.current--
      updateTimer(totalPomodoroSeconds.current)
    }, 1000)
  }

  const stopTimer = () => {
    if (pomodoroIntervalId.current) {
      // Stopping pomodoro timer interval
      clearInterval(pomodoroIntervalId.current)
    }
  }

  const resetTimer = () => {
    if (timerTimeRef.current) {
      // totalPomodoroSeconds.current = pomodoroMinutes.current
      timerTimeRef.current.innerHTML = pomodoroMinutes.current
    }
  }

  const pomodoro = (action: string = "") => {
    if (action == "start") {
      totalPomodoroSeconds.current = getTimerSeconds()
      startTimer()
      setIsPomodoroRunning(true)
    } else if (action == "stop") {
      stopTimer()
      resetTimer()
      setIsPomodoroRunning(false)
    } else if (action == "pause") {
      stopTimer()
      setIsPomodoroPause(true)
    } else if (action == "resume") {
      startTimer()
      setIsPomodoroPause(false)
    }
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
              ref={timerTimeRef}
              mb={2}
              textAlign="center"
              textStyle="6xl"
              fontWeight="bold"
            >
              25:00
            </Text>
            {isPomodoroRunning ? (
              <Stack>
                {isPomodoroPause ? (
                  <Button w="full" onClick={() => pomodoro("resume")}>
                    Продолжить
                  </Button>
                ) : (
                  <Button w="full" onClick={() => pomodoro("pause")}>
                    Пауза
                  </Button>
                )}
                <Button w="full" onClick={() => pomodoro("stop")}>
                  Стоп
                </Button>
              </Stack>
            ) : (
              <Button w="full" onClick={() => pomodoro("start")}>
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
