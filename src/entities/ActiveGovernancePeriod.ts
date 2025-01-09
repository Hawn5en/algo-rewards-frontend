import { VotingSession } from "./VotingSession";

export default interface ActiveGovernancePeriod {
  id: string;
  title: string;
  slug: string;
  sign_up_address: string;
  xgov_escrow_address: string;
  registration_end_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  start_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  active_state_end_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  end_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  is_active: boolean;
  total_committed_stake: string;
  total_committed_algo: string;
  total_committed_lp_tokens_in_algo: string;
  total_committed_stake_for_extra_rewards: string;
  algo_amount_in_reward_pool: string;
  algo_rewards_reserved_for_non_defi_participants: string;
  algo_rewards_reserved_for_defi_participants: string;
  governor_count: number;
  voting_sessions: VotingSession[];
}
