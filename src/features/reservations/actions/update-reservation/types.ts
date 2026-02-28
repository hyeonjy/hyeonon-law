import { Database } from "@/types/supabase";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

export type ActionState = {
  success: boolean;
  message: string;
  data?: Reservation;
  errors?: Record<string, string[]>;
};
