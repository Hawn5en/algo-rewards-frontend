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
} from "@chakra-ui/react";
import useActiveGovernancePeriod from "../../hooks/governance/useActiveGonvernancePeriod";
import useAlgorandPrice from "../../hooks/governance/useAlgorandPrice";
import { parseAlgoString } from "../../utils/parseAlgoString";

const ActiveGovernancePeriodCard: React.FC = () => {
  // 1. Fetch governance data
  const {
    data: governanceData,
    isLoading,
    error,
  } = useActiveGovernancePeriod();

  // 2. Fetch current ALGO price (USD)
  const { data: priceData, isLoading: priceLoading } = useAlgorandPrice();

  // 3. User input (already in normal ALGO format, e.g., "123.456789")
  const [committedAlgo, setCommittedAlgo] = useState<string>("0");

  // Loading / Error states
  if (isLoading || priceLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Text color="red.500">{error.message}</Text>;
  }
  if (!governanceData || !priceData) {
    return <Text>No governance data or price data found</Text>;
  }

  // 4. Convert API strings to numeric ALGO
  // Example: "517.992.783.522.431" => 517992783.522431 => numeric
  const totalStake = parseAlgoString(governanceData.total_committed_stake);
  const rewardPool = parseAlgoString(governanceData.algo_amount_in_reward_pool);

  // 5. Parse user input as floating ALGO
  const userStake = parseFloat(committedAlgo) || 0;

  // 6. Calculate 3-month reward (the entire governance period)
  //    Avoid dividing by zero.
  const userReward3Mo =
    totalStake > 0 ? (userStake / totalStake) * rewardPool : 0;

  // 7. Monthly reward = 3-mo reward / 3
  const userRewardPerMonth = userReward3Mo / 3;

  // 8. APR calculation:
  //    ( (3-mo yield) * 4 ) => annual, then * 100 => percentage
  //    3-mo yield = userReward3Mo / userStake
  let apr = 0;
  if (userStake > 0) {
    apr = (userReward3Mo / userStake) * 4 * 100;
  }

  // 9. Convert everything to USD using the fetched price
  const algoPriceUsd = priceData.algorand.usd;
  const userReward3MoUsd = userReward3Mo * algoPriceUsd;
  const userRewardPerMonthUsd = userRewardPerMonth * algoPriceUsd;
  const userStakeUsd = userStake * algoPriceUsd;

  // 10. Format date/time
  const startDate = new Date(governanceData.start_datetime).toLocaleString();
  const endDate = new Date(governanceData.end_datetime).toLocaleString();

  // Voting session info (if present)
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
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      maxW="600px"
      mx="auto"
      mt={8}
    >
      {/* Basic Info */}
      <Heading as="h2" size="lg" mb={2}>
        {governanceData.title}
      </Heading>
      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
        Period ID: {governanceData.id}
      </Text>

      <Text mt={4}>{governanceData.slug}</Text>

      {/* Description */}
      <Text mt={4} fontStyle="italic">
        {votingSession?.short_description}
      </Text>

      <Divider my={4} />

      {/* Dates */}
      <VStack align="start" spacing={2}>
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
      </VStack>

      <Divider my={4} />

      {/* Totals */}
      <VStack align="start" spacing={2}>
        <Text>
          <strong>Total Committed Stake (ALGO):</strong>{" "}
          {totalStake.toLocaleString(undefined, { maximumFractionDigits: 6 })}
        </Text>
        <Text>
          <strong>Governor Count:</strong> {governanceData.governor_count}
        </Text>
        <Text>
          <strong>Reward Pool (ALGO):</strong>{" "}
          {rewardPool.toLocaleString(undefined, { maximumFractionDigits: 6 })}
        </Text>
      </VStack>

      <Divider my={4} />

      {/* User Input */}
      <FormControl>
        <FormLabel>Enter Your Committed ALGO</FormLabel>
        <Input
          type="number"
          placeholder="0"
          step="0.000001"
          value={committedAlgo}
          onChange={(e) => setCommittedAlgo(e.target.value)}
          maxW="200px"
        />
      </FormControl>

      <Divider my={4} />

      {/* Rewards - 3 months */}
      <Stat>
        <StatLabel>3-Month Estimated Reward (ALGO)</StatLabel>
        <StatNumber>
          {userReward3Mo.toLocaleString(undefined, {
            maximumFractionDigits: 6,
          })}
        </StatNumber>
      </Stat>
      <Text mt={2}>
        3-Month Estimated Reward (USD):{" "}
        {userReward3MoUsd.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </Text>

      <Divider my={4} />

      {/* Monthly rewards */}
      <Stat>
        <StatLabel>Monthly Estimated Reward (ALGO)</StatLabel>
        <StatNumber>
          {userRewardPerMonth.toLocaleString(undefined, {
            maximumFractionDigits: 6,
          })}
        </StatNumber>
      </Stat>
      <Text mt={2}>
        Monthly Estimated Reward (USD):{" "}
        {userRewardPerMonthUsd.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </Text>

      <Divider my={4} />

      {/* APR */}
      <Stat>
        <StatLabel>Annual Percentage Yield (APR)</StatLabel>
        <StatNumber>{apr.toFixed(2)}%</StatNumber>
      </Stat>

      <Divider my={4} />

      {/* User's stake in USD */}
      <VStack align="start" spacing={2}>
        <Text>
          <strong>Your Stake (ALGO):</strong>{" "}
          {userStake.toLocaleString(undefined, { maximumFractionDigits: 6 })} (
          {((userStake / totalStake) * 100).toFixed(4)}%)
        </Text>
        <Text>
          <strong>Your Stake (USD):</strong>{" "}
          {userStakeUsd.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
      </VStack>
    </Box>
  );
};

export default ActiveGovernancePeriodCard;
