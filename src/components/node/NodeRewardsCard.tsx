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
  Show,
  Hide,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import useAlgorandPrice from "../../hooks/governance/useAlgorandPrice";
import { SiAlgorand } from "react-icons/si";

const NodeRewardsCard: React.FC = () => {
  // Editable constants with initial default values
  const [blockTimeSeconds, setBlockTimeSeconds] = useState<number>(2.74); // Block time in seconds
  const [onlineEligibleStake, setOnlineEligibleStake] =
    useState<number>(1340000000); // Online eligible stake in ALGO
  const [rewardPerBlock, setRewardPerBlock] = useState<number>(10); // Reward per block in ALGO

  // User input for their stake
  const [yourStake, setYourStake] = useState<string>("0");

  // Fetch ALGO price in USD
  const {
    data: priceData,
    // isLoading: priceLoading,
    // error: priceError,
  } = useAlgorandPrice();

  //   // Loading / Error states
  //   if (priceLoading) {
  //     return <Spinner />;
  //   }
  //   if (priceError) {
  //     return <Text color="red.500">{priceError?.message}</Text>;
  //   }

  // Parse user input
  const parsedYourStake = parseFloat(yourStake) || 0;

  // Prevent division by zero
  const validOnlineEligibleStake =
    onlineEligibleStake > 0 ? onlineEligibleStake : 1;

  // Calculations

  const yourProportion = parsedYourStake / validOnlineEligibleStake;
  const yourStakeUsd = priceData ? parsedYourStake * priceData.algorand.usd : 0;

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
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Node
      </Heading>

      {/* Input Section */}
      <VStack align="start" spacing={4}>
        <FormControl id="your-stake">
          <FormLabel>Enter Your Staked ALGO</FormLabel>
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
              value={yourStake}
              onChange={(e) => setYourStake(e.target.value)}
              maxW="200px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </InputGroup>
        </FormControl>
      </VStack>

      <Divider my={2} />

      {/* Stats/Calculations Section */}

      <VStack align="start" spacing={1} w="100%">
        <VStack align="start" spacing={1}>
          {" "}
          {/* Your Proportion */}
          <Text>
            <strong>Your Proportion:</strong>{" "}
            {(yourProportion * 100).toFixed(4)}%{" "}
          </Text>
          <Text>
            <strong>Your Stake:</strong>{" "}
            {yourStakeUsd.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </Text>
          {/* Daily Block Proposals */}
          <Text>
            {" "}
            <strong>Daily Block Proposals:</strong> {dailyBlockProposalsRounded}{" "}
            <Text as="span" color="gray.600">
              ({dailyBlockProposals.toFixed(2)})
            </Text>
          </Text>
        </VStack>

        <Divider my={2} />

        {/* Daily ALGO Rewards */}
        <Stat>
          <StatLabel>Daily Estimated Reward</StatLabel>
          <StatNumber>
            <Flex align={"center"}>
              <Text mr={1}>
                {Math.floor(dailyAlgoRewards)}{" "}
                <Icon as={SiAlgorand} w={4} h={4} />{" "}
                <Text fontSize="md" as="span" color="gray.600">
                  ({dailyAlgoRewards.toFixed(4)}{" "}
                  <Icon as={SiAlgorand} w={2.5} h={2.5} />)
                </Text>
              </Text>
            </Flex>
          </StatNumber>
        </Stat>
        <Text color="gray.600">
          {dailyAlgoRewardsUsd.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>

        <Divider my={2} />

        {/* Monthly ALGO Rewards */}
        <Stat>
          <StatLabel>Monthly Estimated Reward</StatLabel>
          <StatNumber>
            <Flex align={"center"}>
              <Text mr={1}>
                {monthlyAlgoRewardsFloored} <Icon as={SiAlgorand} w={4} h={4} />{" "}
                <Text fontSize="md" as="span" color="gray.600">
                  ({monthlyAlgoRewards.toFixed(4)}{" "}
                  <Icon as={SiAlgorand} w={2.5} h={2.5} />)
                </Text>
              </Text>
            </Flex>
          </StatNumber>
        </Stat>
        <Text color="gray.600">
          {monthlyAlgoRewardsUsd.toLocaleString(undefined, {
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

      {/* Footer Section */}
      <VStack align="start" spacing={6}>
        {/* Responsive Inputs */}
        <Show below="md">
          <VStack align="start" spacing={4}>
            {/* Block Time Input */}
            <FormControl id="block-time" color="gray.700">
              <FormLabel fontSize="sm">Block Time</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Text fontSize={13}>Sec</Text>
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>

            {/* Online Eligible Stake Input */}
            <FormControl id="online-eligible-stake" color="gray.700">
              <FormLabel fontSize="sm">Online Eligible Stake</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon
                    as={SiAlgorand}
                    w={3}
                    h={3}
                    color={"gray.600"}
                    // color={useColorModeValue("gray.500", "gray.300")}
                    aria-hidden="true"
                  />
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>

            {/* Reward Per Block Input */}
            <FormControl id="reward-per-block" color="gray.700">
              <FormLabel fontSize="sm">Reward Per Block</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon
                    as={SiAlgorand}
                    w={3}
                    h={3}
                    color={"gray.600"}
                    // color={useColorModeValue("gray.500", "gray.300")}
                    aria-hidden="true"
                  />
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>
          </VStack>
        </Show>
        <Hide below="md">
          <HStack spacing={2} w="100%">
            {/* Block Time Input */}
            <FormControl id="block-time" color="gray.700">
              <FormLabel fontSize="sm">Block Time</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Text fontSize={13}>Sec</Text>
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>

            {/* Online Eligible Stake Input */}
            <FormControl id="online-eligible-stake" color="gray.700">
              <FormLabel fontSize="sm">Online Eligible Stake</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon
                    as={SiAlgorand}
                    w={3}
                    h={3}
                    color={"gray.600"}
                    // color={useColorModeValue("gray.500", "gray.300")}
                    aria-hidden="true"
                  />
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>

            {/* Reward Per Block Input */}
            <FormControl id="reward-per-block" color="gray.700">
              <FormLabel fontSize="sm">Reward Per Block</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon
                    as={SiAlgorand}
                    w={3}
                    h={3}
                    color={"gray.600"}
                    // color={useColorModeValue("gray.500", "gray.300")}
                    aria-hidden="true"
                  />
                </InputLeftElement>
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
              </InputGroup>
            </FormControl>
          </HStack>
        </Hide>
      </VStack>
    </Box>
  );
};

export default NodeRewardsCard;
