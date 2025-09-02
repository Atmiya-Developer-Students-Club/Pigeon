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

export async function sendSingleEmail(req: Request, res: Response) {
  const parseResult = bulkEmailSchema.safeParse(req.body);
  if (!parseResult.success) {
    logError("Invalid payload", parseResult.error.flatten());
    return res.status(400).send("Invalid payload");
  }

  const { subject, html, recipients } = parseResult.data;
  if (!Array.isArray(recipients) || recipients.length !== 1) {
    logError("Invalid payload for single email: must provide exactly one recipient", req.body);
    return res.status(400).send("Invalid payload: must provide exactly one recipient");
  }

  log(`Request: subject='${subject}', recipient=${recipients[0]?.email ?? "unknown"}`);
  try {
    const results = await sendBulk({ subject, html, recipients });

    const failed = results.filter((r: any) => r.status === "rejected");
    if (failed.length > 0) {
      logError(`Failed to send to recipient: ${recipients[0]?.email ?? "Unknown"}`);
    }

    res.status(200).json({ success: failed.length === 0, sent: failed.length === 0 ? 1 : 0, failed: failed.length });
  } catch (e) {
    logError("Single send error", e);
    res.status(500).send("Internal error");
  }
}
