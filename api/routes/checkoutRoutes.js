// routes/checkoutRoutes.js
import express from "express";
import { verifyUserCookie } from "../middlewares/verifyUser.js";
import User from "../models/User.js";
import { z } from "zod";

const router = express.Router();

const selectAddressSchema = z.object({
  addressId: z.string(),
});

// user must be logged in
router.post("/address", verifyUserCookie, async (req, res) => {
  const parsed = selectAddressSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ success: false, message: "AddressId required" });
  }

  const { addressId } = parsed.data;

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const exists = user.addresses.some(
    (a) => a._id.toString() === addressId.toString()
  );

  if (!exists) {
    return res
      .status(400)
      .json({ success: false, message: "Address does not belong to user" });
  }

  // store in HttpOnly cookie for payment step
  res.cookie("checkout_address", addressId, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.json({ success: true });
});

export default router;
