import express from "express";

const router = express.Router();

import {
  signup,
  signIn,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../api/user.js";

router.post("/signup", signup);
router.post("/login", signIn);
router.get("/Users", getAllUser);
router.get("/User/:_id", getUserById);
router.put(
  "/User/:_id", updateUser
);
// router.put('/User/:_id',upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'portfolioPicturesUrl', maxCount: 5 }]),  updateUser);
router.delete("/User/:_id", deleteUser);

export default router;
