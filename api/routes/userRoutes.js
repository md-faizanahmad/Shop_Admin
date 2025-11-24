// routes/userRoutes.js
import express from "express";
import {
  signup,
  login,
  googleLogin,
  me,
  logout,
} from "../controllers/userController.js";
import { verifyUserCookie } from "../middlewares/verifyUser.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);

router.get("/me", verifyUserCookie, me);
router.post("/logout", logout);
// router.post("/google-login", googleLogin);

export default router;
