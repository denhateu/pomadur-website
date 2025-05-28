import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      radii: {
        standartRadius: { value: "1rem" }
      }
    }
  }
})

const system = createSystem(defaultConfig, config)

export default system
