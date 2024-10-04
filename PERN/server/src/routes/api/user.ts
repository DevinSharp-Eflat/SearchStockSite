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

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    res.json({ error: "Unable to authenticate" });
    return;
  }
  const isValid = await user.validatePassword(req.body.password);
  if (!isValid) {
    res.json({ error: "Unable to authenticate" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, "keyboard-cat", {
    expiresIn: "7d",
  });
  res.json({ token });
});

export default router;
