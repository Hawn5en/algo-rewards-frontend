import React from "react";
import { Box, Text, Spinner, useColorModeValue } from "@chakra-ui/react";
import useAlgorandPrice from "../hooks/governance/useAlgorandPrice";

const AlgoPriceDisplay: React.FC = () => {
  const { data: priceData, isLoading, error } = useAlgorandPrice();

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  if (error || !priceData) {
    return <Text color="red.500">Price Unavailable</Text>;
  }

  const algoPriceUsd = priceData.algorand.usd;

  return (
    <Box
      bg={bgColor}
      px={3}
      py={1}
      borderRadius="md"
      boxShadow="sm"
      display="flex"
      alignItems="center"
    >
      <Text fontWeight="bold" color={textColor}>
        ALGO ${algoPriceUsd.toFixed(4)}
      </Text>
    </Box>
  );
};

export default AlgoPriceDisplay;
