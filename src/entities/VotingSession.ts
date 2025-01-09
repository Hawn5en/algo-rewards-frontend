export interface VotingSession {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  voting_start_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  voting_end_datetime: string; // e.g. "2019-08-24T14:15:22Z"
  topic_count: string;
  cooldown_end_datetime: string; // e.g. "2019-08-24T14:15:22Z"
}
