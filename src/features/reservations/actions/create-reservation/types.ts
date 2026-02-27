import { Database } from "@/types/supabase";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

export type ActionState =
  | {
      success: true;
      message: string;
      data: Reservation;
    }
  | {
      success: false;
      message: string;
      errors: Record<string, string[]>;
    };
