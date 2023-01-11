import express from "express";
import PostsClass from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

const Posts = new PostsClass()

/* READ */
router.get('/', verifyToken, Posts.getFeedPosts)
router.get('/:userId/posts', verifyToken, Posts.getUserPosts)

/* UPDATE */
router.patch("/:id/like", verifyToken, Posts.likePosts)

export default router