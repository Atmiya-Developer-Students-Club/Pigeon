import nodemailer from "nodemailer";

import { SMTP_CONFIG, BATCH_SIZE, BATCH_DELAY_MS } from "../utils/config";
import { log } from "../utils/logger";

export async function sendBatch({
  subject,
  html,
  recipients,
}: {
  subject: string;
  html: string;
  recipients: string[];
}) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);
  const sendPromises = recipients.map((to) =>
    transporter.sendMail({ from: SMTP_CONFIG.auth.user, to, subject, html })
  );
  return Promise.allSettled(sendPromises);
}

export async function sendBulk({
  subject,
  html,
  recipients,
}: {
  subject: string;
  html: string;
  recipients: string[];
}) {
  let results: any[] = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    log(`Sending batch ${i / BATCH_SIZE + 1} (${batch.length} emails)`);

    const batchResults = await sendBatch({ subject, html, recipients: batch });
    results.push(...batchResults);

    if (i + BATCH_SIZE < recipients.length) {
      log(`Waiting ${BATCH_DELAY_MS}ms before next batch...`);
      await new Promise((res) => setTimeout(res, BATCH_DELAY_MS));
    }
  }

  return results;
}
