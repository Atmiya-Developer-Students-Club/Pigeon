import type { Request, Response } from "express";

import { bulkEmailSchema } from "../schemas/bulkEmailSchema";
import { log, logError } from "../utils/logger";
import { sendBulk } from "../pkg/mailer";

export async function sendBulkEmail(req: Request, res: Response) {
  const parseResult = bulkEmailSchema.safeParse(req.body);
  if (!parseResult.success) {
    logError("Invalid payload", parseResult.error.flatten());
    return res.status(400).send("Invalid payload");
  }

  const { subject, html, recipients } = parseResult.data;
  log(`Request: subject='${subject}', recipients=${recipients.length}`);

  try {
    const results = await sendBulk({ subject, html, recipients });

    const failed = results.filter((r: any) => r.status === "rejected");
    if (failed.length > 0) {
      logError(`Failed to send to ${failed.length} recipients`);
    }

    res
      .status(200)
      .json({
        success: true,
        sent: recipients.length - failed.length,
        failed: failed.length,
      });
  } catch (e) {
    logError("Bulk send error", e);
    res.status(500).send("Internal error");
  }
}
