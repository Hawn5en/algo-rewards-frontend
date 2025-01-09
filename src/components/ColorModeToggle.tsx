import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      Switch to {colorMode === "light" ? "Dark" : "Light"} mode
    </Button>
  );
};

export default ColorModeToggle;
