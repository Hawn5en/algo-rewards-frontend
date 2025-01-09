import { Button, useColorMode } from "@chakra-ui/react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} margin={"auto"}>
      {colorMode === "light" ? <CiDark /> : <MdOutlineLightMode />}
    </Button>
  );
};

export default ColorModeToggle;
