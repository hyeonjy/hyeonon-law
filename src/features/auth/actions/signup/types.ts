import { z } from "zod";
import { signupSchema } from "./schema";

export type SignupSchemaType = z.infer<typeof signupSchema>;

export type SignupActionState = {
  success: boolean;
  message?: string;
};
