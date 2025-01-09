import { Container, Heading } from "@chakra-ui/react";
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
      <Heading mb={4}>Algorand Rewards</Heading>
      <ActiveGovernanceComponent />
      <ColorModeToggle />
    </Container>
  );
};

export default MainPage;
