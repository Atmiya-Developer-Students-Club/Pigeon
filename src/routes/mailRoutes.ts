import { Router } from "express";
import { checkApiKey } from "../middlewares/authMiddleware";
import { sendBulkEmail, sendSingleEmail } from "../controllers/mailController";

const router = Router();

router.post("/bulk", checkApiKey, sendBulkEmail);
router.post("/single", checkApiKey, sendSingleEmail);

export default router;
