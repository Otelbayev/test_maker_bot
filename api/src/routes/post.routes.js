import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
