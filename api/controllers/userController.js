// controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GENERATE COOKIE
function sendUserCookie(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProd = process.env.NODE_ENV === "production";

  // res.cookie("user_token", token, {
  //   httpOnly: true,
  //   secure: isProd,
  //   sameSite: isProd ? "none" : "lax",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  //   path: "/",
  // });

  res.cookie("user_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".myazstore.shop",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export async function signup(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
    });

    sendUserCookie(res, user._id);

    return res.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    sendUserCookie(res, user._id);

    return res.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.userId).select("name email phone");
    if (!user)
      return res.status(404).json({ success: false, message: "No user" });

    return res.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch {
    return res.status(500).json({ success: false, message: "Failed" });
  }
}

// export function logout(_req, res) {
//   res.cookie("user_token", "", {
//     httpOnly: true,
//     expires: new Date(0),
//     path: "/",
//   });
//   return res.json({ success: true });
// }

export function logout(_req, res) {
  res.cookie("user_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".myazstore.shop",
    expires: new Date(0),
    path: "/",
  });
  return res.json({ success: true });
}

export async function googleLogin(req, res) {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).json({ success: false, message: "Missing token" });

    // const ticket = await client.verifyIdToken({
    //   idToken: credential,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
      });
    }

    sendUserCookie(res, user._id);

    res.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
