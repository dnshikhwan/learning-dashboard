export interface IGoal {
  id: number;
  skill_id: number;
  user_id: number;
  description: string;
  target_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
