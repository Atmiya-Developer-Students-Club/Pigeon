import { z } from "zod";

export const bulkEmailSchema = z.object({
  subject: z.string(),
  html: z.string(),
  recipients: z
    .array(
      z
        .object({
          email: z.string().email(),
        })
        .catchall(z.any()) // allow any extra fields
    )
    .nonempty(),
  attachments: z.array(
    z.object({
      filename: z.string(),
      href: z.string(),
    })
  ).optional()
});
