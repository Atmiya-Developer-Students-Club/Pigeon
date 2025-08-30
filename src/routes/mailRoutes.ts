import { Router } from "express";
import { checkApiKey } from "../middlewares/authMiddleware";
import { sendBulkEmail } from "../controllers/mailController";

const router = Router();

router.post("/send-bulk-email", checkApiKey, sendBulkEmail);

export default router;
