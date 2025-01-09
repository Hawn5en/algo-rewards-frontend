import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} margin={"auto"}>
      Switch to {colorMode === "light" ? "Dark" : "Light"} mode
    </Button>
  );
};

export default ColorModeToggle;
