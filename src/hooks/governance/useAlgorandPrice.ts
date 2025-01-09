import { useQuery } from "@tanstack/react-query";
import ms from "ms";

interface CoinGeckoResponse {
  algorand: {
    usd: number;
  };
}

const useAlgorandPrice = () => {
  return useQuery<CoinGeckoResponse, Error>({
    queryKey: ["algorandPrice"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ALGO price from CoinGecko");
      }
      return response.json() as Promise<CoinGeckoResponse>;
    },
    // Cache for 1 hour
    staleTime: ms("10m"),
  });
};

export default useAlgorandPrice;
