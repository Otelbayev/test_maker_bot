import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", UserController.login);
router.put("/update", UserController.update);
router.get("/me", authenticateToken, UserController.getMe);

export default router;
