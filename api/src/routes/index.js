import { Router } from "express";
import authRoutes from "./user.routes.js";
import testRoutes from "./test.routes.js";
import postRoutes from "./post.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/test", testRoutes);
router.use("/post", postRoutes);

export default router;
