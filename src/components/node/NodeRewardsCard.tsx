// src/components/NodeRewardsCard.tsx

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
  HStack,
  useColorModeValue,
  Spinner,
  Show,
  Hide,
} from "@chakra-ui/react";
import useAlgorandPrice from "../../hooks/governance/useAlgorandPrice";

const NodeRewardsCard: React.FC = () => {
  // Editable constants with initial default values
  const [blockTimeSeconds, setBlockTimeSeconds] = useState<number>(2.74); // Block time in seconds
  const [onlineEligibleStake, setOnlineEligibleStake] =
    useState<number>(1290000000); // Online eligible stake in ALGO
  const [rewardPerBlock, setRewardPerBlock] = useState<number>(10); // Reward per block in ALGO

  // User input for their stake
  const [yourStake, setYourStake] = useState<string>("0");

  // Fetch ALGO price in USD
  const {
    data: priceData,
    isLoading: priceLoading,
    error: priceError,
  } = useAlgorandPrice();

  // Parse user input
  const parsedYourStake = parseFloat(yourStake) || 0;

  // Prevent division by zero
  const validOnlineEligibleStake =
    onlineEligibleStake > 0 ? onlineEligibleStake : 1;

  // Calculations
  const yourProportion = parsedYourStake / validOnlineEligibleStake;

  const blocksPerDay = 86400 / blockTimeSeconds; // Total blocks per day

  const dailyBlockProposals = yourProportion * blocksPerDay;
  const dailyBlockProposalsRounded = Math.floor(dailyBlockProposals);

  const dailyAlgoRewards = dailyBlockProposals * rewardPerBlock;
  const dailyAlgoRewardsUsd = priceData
    ? Math.floor(dailyAlgoRewards) * priceData.algorand.usd
    : 0;

  const monthlyAlgoRewardsFloored = Math.floor(dailyAlgoRewards) * 30;
  const monthlyAlgoRewards = dailyAlgoRewards * 30;
  const monthlyAlgoRewardsUsd = priceData
    ? monthlyAlgoRewardsFloored * priceData.algorand.usd
    : 0;

  const apr =
    parsedYourStake > 0
      ? ((monthlyAlgoRewards * 12) / parsedYourStake) * 100
      : 0;

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
      {/* Header */}
      <Heading as="h2" size="lg" mb={2} textAlign="center">
        Node
      </Heading>

      {/* Input Fields */}
      <VStack align="start" spacing={4}>
        {/* User Stake Input */}
        <FormControl id="your-stake">
          <FormLabel>Enter Your Stake (ALGO)</FormLabel>
          <Input
            type="number"
            placeholder="0"
            step="0.000001"
            value={yourStake}
            onChange={(e) => setYourStake(e.target.value)}
            maxW="200px"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
        </FormControl>
      </VStack>

      <Divider my={6} />

      {/* Calculations */}
      {priceLoading ? (
        <Spinner />
      ) : priceError ? (
        <Text color="red.500">
          Error fetching ALGO price: {priceError.message}
        </Text>
      ) : (
        <VStack align="start" spacing={2} w="100%">
          {/* Your Proportion */}
          <Box>
            <Text>
              <strong>Your Proportion:</strong>{" "}
              {(yourProportion * 100).toFixed(4)}%
            </Text>
          </Box>

          {/* Daily Block Proposals */}
          <Box>
            <Text>
              <strong>Daily Block Proposals:</strong>{" "}
              {dailyBlockProposalsRounded}{" "}
              <Text as="span" color="gray.600">
                ({dailyBlockProposals.toFixed(2)})
              </Text>
            </Text>
          </Box>
          <Divider my={4} />
          {/* Daily ALGO Rewards */}
          <Box>
            <Stat>
              <StatLabel>Daily ALGO Rewards</StatLabel>
              <StatNumber>
                {Math.floor(dailyAlgoRewards)}{" "}
                <Text fontSize="md" as="span" color="gray.600">
                  ({dailyAlgoRewards.toFixed(4)})
                </Text>
              </StatNumber>
            </Stat>
            <Text color="gray.600">
              Daily ALGO Rewards (USD):{" "}
              {dailyAlgoRewardsUsd.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Box>
          <Divider my={4} />
          {/* Monthly ALGO Rewards */}
          <Box>
            <Stat>
              <StatLabel>Monthly ALGO Rewards</StatLabel>
              <StatNumber>
                {monthlyAlgoRewardsFloored}{" "}
                <Text fontSize="md" as="span" color="gray.600">
                  ({monthlyAlgoRewards.toFixed(4)})
                </Text>
              </StatNumber>
            </Stat>
            <Text color="gray.600">
              Monthly ALGO Rewards (USD):{" "}
              {monthlyAlgoRewardsUsd.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Box>
          <Divider my={4} />
          {/* APR */}
          <Box>
            <Stat>
              <StatLabel>Annual Percentage Yield (APR)</StatLabel>
              <StatNumber>{apr.toFixed(2)}%</StatNumber>
            </Stat>
          </Box>
        </VStack>
      )}
      <Divider my={6} />
      <Show below="md">
        {/* Block Time Input */}
        <FormControl id="block-time" color="gray.700">
          <FormLabel fontSize="sm">Block Time (seconds)</FormLabel>
          <Input
            fontSize="sm"
            type="number"
            placeholder="2.74"
            step="0.01"
            value={blockTimeSeconds}
            onChange={(e) =>
              setBlockTimeSeconds(parseFloat(e.target.value) || 0)
            }
            maxW="200px"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
        </FormControl>

        {/* Online Eligible Stake Input */}
        <FormControl id="online-eligible-stake" color="gray.700">
          <FormLabel fontSize="sm">Online Eligible Stake</FormLabel>
          <Input
            fontSize="sm"
            type="number"
            placeholder="1,290,000"
            step="1"
            value={onlineEligibleStake}
            onChange={(e) =>
              setOnlineEligibleStake(parseFloat(e.target.value) || 0)
            }
            maxW="200px"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
        </FormControl>

        {/* Reward Per Block Input */}
        <FormControl id="reward-per-block" color="gray.700">
          <FormLabel fontSize="sm">Reward Per Block</FormLabel>
          <Input
            fontSize="sm"
            type="number"
            placeholder="10"
            step="0.1"
            value={rewardPerBlock}
            onChange={(e) => setRewardPerBlock(parseFloat(e.target.value) || 0)}
            maxW="200px"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
        </FormControl>
      </Show>
      <Hide below="md">
        {" "}
        <HStack spacing={2} w="100%">
          {/* Block Time Input */}
          <FormControl id="block-time" color="gray.700">
            <FormLabel fontSize="sm">Block Time (seconds)</FormLabel>
            <Input
              fontSize="sm"
              type="number"
              placeholder="2.74"
              step="0.01"
              value={blockTimeSeconds}
              onChange={(e) =>
                setBlockTimeSeconds(parseFloat(e.target.value) || 0)
              }
              maxW="200px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>

          {/* Online Eligible Stake Input */}
          <FormControl id="online-eligible-stake" color="gray.700">
            <FormLabel fontSize="sm">Online Eligible Stake</FormLabel>
            <Input
              fontSize="sm"
              type="number"
              placeholder="1,290,000"
              step="1"
              value={onlineEligibleStake}
              onChange={(e) =>
                setOnlineEligibleStake(parseFloat(e.target.value) || 0)
              }
              maxW="200px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>

          {/* Reward Per Block Input */}
          <FormControl id="reward-per-block" color="gray.700">
            <FormLabel fontSize="sm">Reward Per Block</FormLabel>
            <Input
              fontSize="sm"
              type="number"
              placeholder="10"
              step="0.1"
              value={rewardPerBlock}
              onChange={(e) =>
                setRewardPerBlock(parseFloat(e.target.value) || 0)
              }
              maxW="200px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>
        </HStack>
      </Hide>
    </Box>
  );
};

export default NodeRewardsCard;
