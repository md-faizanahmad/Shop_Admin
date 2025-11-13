import express from "express";
import {
  login,
  logout,
  me,
  updateAdminProfile,
} from "../controllers/adminController.js";
import { verifyAdminCookie } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyAdminCookie, me);
router.put("/update", verifyAdminCookie, updateAdminProfile);

export default router;
