import nodemailer from "nodemailer";

import { SMTP_CONFIG, BATCH_SIZE, BATCH_DELAY_MS } from "../utils/config";
import { log } from "../utils/logger";

function renderTemplate(template: string, data: Record<string, any>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
    data[key] !== undefined ? String(data[key]) : ""
  );
}

export async function sendBatch({
  subject,
  html,
  recipients,
  attachments,
}: {
  subject: string;
  html: string;
  recipients: { email: string;[key: string]: any }[];
  attachments?: { filename: string; href: string }[];
}) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);
  const sendPromises = recipients.map((recipient) => {
    const personalizedHtml = renderTemplate(html, recipient);
    return transporter.sendMail({
      from: SMTP_CONFIG.auth.user,
      to: recipient.email,
      subject,
      html: personalizedHtml,
      attachments,
    });
  });
  return Promise.allSettled(sendPromises);
}

export async function sendBulk({
  subject,
  html,
  recipients,
  attachments,
}: {
  subject: string;
  html: string;
  recipients: { email: string;[key: string]: any }[];
  attachments?: { filename: string; href: string }[];
}) {
  let results: any[] = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    log(`Sending batch ${i / BATCH_SIZE + 1} (${batch.length} emails)`);

    const batchResults = await sendBatch({ subject, html, recipients: batch, attachments });
    results.push(...batchResults);

    if (i + BATCH_SIZE < recipients.length) {
      log(`Waiting ${BATCH_DELAY_MS}ms before next batch...`);
      await new Promise((res) => setTimeout(res, BATCH_DELAY_MS));
    }
  }

  return results;
}
