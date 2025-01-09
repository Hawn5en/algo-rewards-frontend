import { Container, Heading, Text } from "@chakra-ui/react";
import ColorModeToggle from "../components/ColorModeToggle";
import ActiveGovernanceComponent from "../components/governance/ActiveGovernancePeriodCard";

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
      <ActiveGovernanceComponent />
      <ColorModeToggle />
    </Container>
  );
};

export default MainPage;
