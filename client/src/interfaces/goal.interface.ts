export interface IGoal {
  id: number;
  skill_id: string;
  user_id: number;
  description: string;
  target_date: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
