export type UserRole = "student" | "teacher" | "admin";

export interface IUser {
  id: number;
  chat_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
