// src/components/ActiveGovernancePeriodCard.tsx

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
  Spinner,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import useActiveGovernancePeriod from "../../hooks/governance/useActiveGonvernancePeriod";
import useAlgorandPrice from "../../hooks/governance/useAlgorandPrice";
import { parseAlgoString } from "../../utils/parseAlgoString";
import { SiAlgorand } from "react-icons/si";

const ActiveGovernancePeriodCard: React.FC = () => {
  // 1. Fetch governance data
  const {
    data: governanceData,
    isLoading,
    error,
  } = useActiveGovernancePeriod();

  // 2. Fetch current ALGO price (USD)
  const {
    data: priceData,
    isLoading: priceLoading,
    error: priceError,
  } = useAlgorandPrice();

  // 3. User input
  const [committedAlgo, setCommittedAlgo] = useState<string>("0");

  // Loading / Error states
  //   if (isLoading || priceLoading) {
  //     return <Spinner />;
  //   }
  //   if (error || priceError) {
  //     return <Text color="red.500">{error?.message || priceError?.message}</Text>;
  //   }
  if (!governanceData) {
    return <Text>No governance data found</Text>;
  }

  // 4. Convert API strings to numeric ALGO
  const totalStake = parseAlgoString(governanceData.total_committed_stake);
  const rewardPool = parseAlgoString(governanceData.algo_amount_in_reward_pool);

  // 5. Parse user input as floating ALGO
  const userStake = parseFloat(committedAlgo) || 0;

  // 6. Calculate 3-month reward
  const userReward3Mo =
    totalStake > 0 ? (userStake / totalStake) * rewardPool : 0;

  // 7. Monthly reward
  const userRewardPerMonth = userReward3Mo / 3;

  // 8. APR calculation
  let apr = 0;
  if (userStake > 0) {
    apr = (userReward3Mo / userStake) * 4 * 100;
  }

  // 9. Convert to USD
  const algoPriceUsd = priceData ? priceData.algorand.usd : 0;
  const userReward3MoUsd = userReward3Mo * algoPriceUsd;
  const userRewardPerMonthUsd = userRewardPerMonth * algoPriceUsd;
  const userStakeUsd = userStake * algoPriceUsd;

  // 10. Format date/time
  const startDate = new Date(governanceData.start_datetime).toLocaleString();
  const endDate = new Date(governanceData.end_datetime).toLocaleString();

  // Voting session info
  const votingSession = governanceData.voting_sessions?.[0];
  const votingStart = votingSession?.voting_start_datetime
    ? new Date(votingSession.voting_start_datetime).toLocaleString()
    : "";
  const votingEnd = votingSession?.voting_end_datetime
    ? new Date(votingSession.voting_end_datetime).toLocaleString()
    : "";

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
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        {governanceData.title}
      </Heading>

      {/* Input Section */}
      <VStack align="start" spacing={4}>
        <FormControl>
          <FormLabel>Enter Your Committed ALGO</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon
                as={SiAlgorand}
                w={4}
                h={4}
                // color={useColorModeValue("gray.500", "gray.300")}
                aria-hidden="true"
              />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="0"
              step="0.000001"
              value={committedAlgo}
              onChange={(e) => setCommittedAlgo(e.target.value)}
              maxW="200px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              pr="2.5rem" // Adds padding to the right to prevent text overlap with the icon
            />
          </InputGroup>
        </FormControl>
      </VStack>

      <Divider my={2} />

      {/* Stats/Calculations Section */}
      <VStack align="start" spacing={1} w="100%">
        {/* User's stake in USD */}
        <VStack align="start" spacing={1}>
          <Text>
            <strong>Your Proportion:</strong>{" "}
            {((userStake / totalStake) * 100).toFixed(4)}%
            {/* {userStake.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
            <Text as="span" color="gray.600">
              ({((userStake / totalStake) * 100).toFixed(4)}%)
            </Text> */}
          </Text>

          <Text>
            <strong>Your Stake:</strong>{" "}
            {userStakeUsd.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </Text>
          {/* Placeholder */}
          <Text visibility="hidden">Placeholder</Text>
        </VStack>
        <Divider my={2} />
        {/* Rewards - 3 months */}
        <Stat>
          <StatLabel>3-Month Estimated Reward</StatLabel>
          <StatNumber>
            <Flex align={"center"}>
              <Text mr={1}>
                {userReward3Mo.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </Text>
              <Icon as={SiAlgorand} w={4} h={4} />
            </Flex>
          </StatNumber>
        </Stat>
        <Text color="gray.600">
          {userReward3MoUsd.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
        <Divider my={2} />
        {/* Monthly rewards */}
        <Stat>
          <StatLabel>Monthly Estimated Reward</StatLabel>
          <StatNumber>
            <Flex align={"center"}>
              <Text mr={1}>
                {userRewardPerMonth.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </Text>
              <Icon as={SiAlgorand} w={4} h={4} />
            </Flex>
          </StatNumber>{" "}
        </Stat>
        <Text color="gray.600">
          {userRewardPerMonthUsd.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
        <Divider my={2} />
        {/* APR */}
        <Stat>
          <StatLabel>Annual Percentage Return (APR)</StatLabel>
          <StatNumber>{apr.toFixed(2)}%</StatNumber>
        </Stat>
      </VStack>

      <Divider my={2} />

      {/* Dates & Additional Info */}
      <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
        <VStack align="start" spacing={2}>
          <Text>
            <strong>Total Committed Stake:</strong>{" "}
            {totalStake.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            <Icon as={SiAlgorand} w={2.5} h={2.5} />
          </Text>
          <Text>
            <strong>Governor Count:</strong> {governanceData.governor_count}
          </Text>
          <Text>
            <strong>Reward Pool:</strong>{" "}
            {rewardPool.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            <Icon as={SiAlgorand} w={2.5} h={2.5} />
          </Text>
        </VStack>
        <Divider my={1} />
        <Text>
          <strong>Start:</strong> {startDate}
        </Text>
        <Text>
          <strong>End:</strong> {endDate}
        </Text>
        <Text>
          <strong>Voting Start:</strong> {votingStart}
        </Text>
        <Text>
          <strong>Voting End:</strong> {votingEnd}
        </Text>
        {/* Description */}
        <Text mt={4} fontStyle="italic">
          {votingSession?.short_description}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Period ID: {governanceData.id}
        </Text>
      </VStack>
    </Box>
  );
};

export default ActiveGovernancePeriodCard;
