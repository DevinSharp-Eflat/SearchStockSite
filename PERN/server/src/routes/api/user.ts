import { Router } from "express";
import { User } from "../../models/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user.id }, "keyboard-cat", {
    expiresIn: "7d",
  });
  res.json({ token });
});

router.post("/signin", (_req, _res) => {
  console.log("signin");
});

export default router;
