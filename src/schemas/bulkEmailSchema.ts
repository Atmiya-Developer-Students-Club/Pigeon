import { z } from "zod";

export const bulkEmailSchema = z.object({
  subject: z.string(),
  html: z.string(),
  recipients: z.array(z.string()),
});
