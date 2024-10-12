import { Router } from "express";
import { chatBot, contactMe } from "../../controllers/general";

const router = Router();

router.post("/contact-me", contactMe);
router.post("/chat-bot", chatBot);

export default router;
