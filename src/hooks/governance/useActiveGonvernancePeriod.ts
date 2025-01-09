import { useQuery } from "@tanstack/react-query";
import ActiveGovernancePeriod from "../../entities/ActiveGovernancePeriod";
import APIClient from "../../services/api-client";
import ms from "ms";

const governanceApiClient = new APIClient<ActiveGovernancePeriod>(
  "/periods/active/"
);

const useActiveGovernancePeriod = () => {
  return useQuery<ActiveGovernancePeriod, Error>({
    queryKey: ["active-governance-period"],
    queryFn: () => governanceApiClient.getSingle(), // or a custom method
    staleTime: ms("5m"),
  });
};

export default useActiveGovernancePeriod;
