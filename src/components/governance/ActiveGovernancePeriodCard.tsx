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
} from "@chakra-ui/react";
import useActiveGovernancePeriod from "../../hooks/governance/useActiveGonvernancePeriod";

const ActiveGovernancePeriodCard: React.FC = () => {
  const { data, isLoading, error } = useActiveGovernancePeriod();
  const [committedAlgo, setCommittedAlgo] = useState<string>("0");

  // Loading / Error states (optional)
  if (isLoading) return <Text>Loading Active Governance Period...</Text>;
  if (error) return <Text color="red.500">{error.message}</Text>;
  if (!data) return null; // no data

  // Parse numeric fields from response (they are strings according to your interface).
  const totalStake = parseFloat(data.total_committed_stake) || 0;
  const rewardPool = parseFloat(data.algo_amount_in_reward_pool) || 0;

  // Convert user input to a number
  const userStake = parseFloat(committedAlgo) || 0;

  // Calculate user’s share:
  // ( userStake / totalStake ) * totalRewardPool
  const userReward = totalStake > 0 ? (userStake / totalStake) * rewardPool : 0;

  // Format some date/time strings for display
  // In production, you'd likely use date-fns or dayjs to format these nicely
  const startDate = new Date(data.start_datetime).toLocaleString();
  const endDate = new Date(data.end_datetime).toLocaleString();
  const votingStart = data.voting_sessions?.[0]?.voting_start_datetime
    ? new Date(data.voting_sessions[0].voting_start_datetime).toLocaleString()
    : "";
  const votingEnd = data.voting_sessions?.[0]?.voting_end_datetime
    ? new Date(data.voting_sessions[0].voting_end_datetime).toLocaleString()
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
      {/* Title & Basic Info */}
      <Heading as="h2" size="lg" mb={2}>
        {data.title}
      </Heading>
      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
        Period ID: {data.id}
      </Text>
      <Text mt={4}>{data.slug}</Text>

      {/* Short Description */}
      <Text mt={4} fontStyle="italic">
        {data.voting_sessions?.[0]?.short_description}
      </Text>

      <Divider my={4} />

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
          {totalStake.toLocaleString()}
        </Text>
        <Text>
          <strong>Governor Count:</strong> {data.governor_count}
        </Text>
        <Text>
          <strong>Reward Pool (ALGO):</strong> {rewardPool.toLocaleString()}
        </Text>
      </VStack>

      <Divider my={4} />

      {/* User Input: Committed ALGO */}
      <FormControl>
        <FormLabel>Enter your committed ALGO</FormLabel>
        <Input
          type="number"
          placeholder="0"
          value={committedAlgo}
          onChange={(e) => setCommittedAlgo(e.target.value)}
          maxW="200px"
        />
      </FormControl>

      {/* Calculated Reward */}
      <Stat mt={4}>
        <StatLabel>Your Estimated Reward (ALGO)</StatLabel>
        <StatNumber>{userReward.toFixed(2)}</StatNumber>
      </Stat>
    </Box>
  );
};

export default ActiveGovernancePeriodCard;
