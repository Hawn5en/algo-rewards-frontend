import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ColorModeToggle from "../components/ColorModeToggle";
import ActiveGovernanceComponent from "../components/governance/ActiveGovernancePeriodCard";
import NodeRewardsCard from "../components/node/NodeRewardsCard";
import AlgoPriceDisplay from "../components/AlgoPriceDisplay";
import ProposedBlocksRewardsCard from "../components/node/ProposedBlocksRewardsCard";

const MainPage = () => {
  return (
    <Box
      minW="100vw"
      minH="100vh"
      position="relative" // To position the ColorModeToggle absolutely within this Box
      p={4}
    >
      {/* Color Mode Toggle positioned at the top-right corner */}
      <Box position="absolute" top="4" right="8">
        <>
          <HStack>
            <AlgoPriceDisplay />
            <ColorModeToggle />
          </HStack>
        </>
      </Box>

      {/* Main Content Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} // 1 column on small screens, 2 on medium and up
        gap={6}
        alignItems="start"
        justifyContent="center"
        maxW="90%"
        mx="auto" // Center the grid horizontally
        mt={{ base: "16", md: "8" }} // Add top margin to avoid overlapping with the toggle
      >
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          gridColumn="1 / -1"
          color={useColorModeValue("gray.800", "white")}
        >
          Algorand Rewards
        </Heading>
        {/* Active Governance Period Card */}
        <GridItem>
          <ActiveGovernanceComponent />
        </GridItem>

        {/* Node Rewards Card */}
        <GridItem>
          <NodeRewardsCard />
        </GridItem>

        {/* Node Calculated Rewards Card */}
        <GridItem>
          <ProposedBlocksRewardsCard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainPage;
