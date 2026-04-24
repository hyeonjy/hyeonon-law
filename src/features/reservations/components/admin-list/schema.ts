import { z } from "zod";

export const reservationListSearchParamsSchema = z.object({
  page: z.string().optional(),
  caseTypeId: z.string().optional(),
  consultDate: z.string().optional(),
  status: z.string().optional(),
});

export const privateFiltersCookieSchema = z.object({
  v: z.literal(1),
  name: z.string().optional(),
  phone: z.string().optional(),
});
