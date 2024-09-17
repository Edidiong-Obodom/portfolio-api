import { Router } from "express";
import { contactMe } from "../../controllers/general";

const router = Router();

router.post("/contact-me", contactMe);

export default router;
