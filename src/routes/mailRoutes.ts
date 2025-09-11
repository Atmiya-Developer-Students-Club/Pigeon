import { Router } from "express";
import { checkApiKey } from "../middlewares/authMiddleware";
import { sendBulkEmail, sendSingleEmail } from "../controllers/mailController";

const router = Router();

/**
 * @openapi
 * /bulk:
 *   post:
 *     summary: Send bulk emails
 *     description: Send an email to multiple recipients in batches. Requires API key in Authorization header.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - html
 *               - recipients
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Email subject
 *               html:
 *                 type: string
 *                 description: Email HTML body
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of recipient email addresses
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     href:
 *                       type: string
 *                 description: List of attachments with filename and href
 *     responses:
 *       200:
 *         description: Bulk email send result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sent:
 *                   type: integer
 *                 failed:
 *                   type: integer
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 */
router.post("/bulk", checkApiKey, sendBulkEmail);

/**
 * @openapi
 * /single:
 *   post:
 *     summary: Send a single email
 *     description: Send an email to a single recipient. Requires API key in Authorization header.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - html
 *               - recipients
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Email subject
 *               html:
 *                 type: string
 *                 description: Email HTML body
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array with a single recipient email address
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     href:
 *                       type: string
 *                 description: List of attachments with filename and href
 *     responses:
 *       200:
 *         description: Single email send result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sent:
 *                   type: integer
 *                 failed:
 *                   type: integer
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 */
router.post("/single", checkApiKey, sendSingleEmail);

export default router;
