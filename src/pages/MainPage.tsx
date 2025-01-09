import { Container, Heading, Button, Text } from "@chakra-ui/react";
import ColorModeToggle from "../components/ColorModeToggle";

const MainPage = () => {
  return (
    <Container
      minW="100vw"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // bg="gray.50"
      p={4}
    >
      <Heading mb={4}>Algorand Themed App</Heading>
      <Text mb={4}>Light or dark mode, all in one theme!</Text>
      <ColorModeToggle />
    </Container>
  );
};

export default MainPage;
