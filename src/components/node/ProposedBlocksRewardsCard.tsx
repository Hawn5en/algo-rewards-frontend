import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Divider,
  useColorModeValue,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import useAlgorandPrice from "../../hooks/governance/useAlgorandPrice";
import { SiAlgorand } from "react-icons/si";
import { ProposedBlocksResponse } from "../../entities/ProposedBlocksResponse";

const ProposedBlocksRewardsCard: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [totalBlocks, setTotalBlocks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { data: priceData } = useAlgorandPrice();

  const fetchProposedBlocks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<ProposedBlocksResponse>(
        "https://mainnet.lab.algorpc.pro/graphql",
        {
          query: `
            query ($pubKey: String!) {
              blocks(
                condition: { proposerAddr: $pubKey }
       
              ) {
                totalCount
              }
            }
          `,
          variables: {
            pubKey: publicKey,
            // start: "2025-01-12T08:14:40.000Z",
            // end: "2025-01-13T08:14:40.000Z",
          },
        }
      );
      setTotalBlocks(response.data.data.blocks.totalCount);
    } catch (err) {
      setError("Failed to fetch proposed blocks");
    } finally {
      setIsLoading(false);
    }
  };

  const rewardPerBlock = 10;
  const totalAlgoRewards = totalBlocks * rewardPerBlock;
  const algoPriceUsd = priceData ? priceData.algorand.usd : 0;
  const totalAlgoRewardsUsd = totalAlgoRewards * algoPriceUsd;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg={useColorModeValue("white", "#17cac6")}
      shadow="md"
      maxW="700px"
      mx="auto"
      mt={8}
      mb={2}
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Proposed Blocks Rewards
      </Heading>

      <VStack align="start" spacing={4}>
        <FormControl>
          <FormLabel>Enter Address</FormLabel>

          <Input
            type="text"
            placeholder=""
            _placeholder={{ color: "black" }}
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            maxW="400px"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
        </FormControl>
        <Button
          onClick={fetchProposedBlocks}
          disabled={isLoading}
          color={"black"}
          borderColor={useColorModeValue("gray.300", "gray.600")}
          backgroundColor={useColorModeValue("gray.100", "accent.400")}
        >
          {isLoading ? "Loading..." : "Calculate Rewards"}
        </Button>
      </VStack>

      {error && <Text color="red.500">{error}</Text>}

      <Divider my={2} />

      <VStack align="start" spacing={1} w="100%">
        <Stat>
          <StatLabel>Total Proposed Blocks</StatLabel>
          <StatNumber>{totalBlocks}</StatNumber>
        </Stat>

        <Divider my={2} />

        <Stat>
          <StatLabel>Total Estimated Reward</StatLabel>
          <StatNumber>
            <Flex align={"center"}>
              <Text mr={1}>{totalAlgoRewards}</Text>
              <Icon as={SiAlgorand} w={4} h={4} />
            </Flex>
          </StatNumber>
        </Stat>
        <Text color="gray.600">
          {totalAlgoRewardsUsd.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
      </VStack>
    </Box>
  );
};

export default ProposedBlocksRewardsCard;
