import { Router } from "express";

import { createTest } from "../controllers/test.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/createtest", authenticateToken, createTest);

export default router;
