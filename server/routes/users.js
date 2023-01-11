import express from "express";
import {
    UserClass
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()
const user = new UserClass()
// READ
router.get("/:id", verifyToken, user.getUser)
router.get("/:id/friends", verifyToken, user.getUserFriends)

// UPDATE 
router.patch("/:id/:friendId", verifyToken, user.addRemoveFriend)

export default router