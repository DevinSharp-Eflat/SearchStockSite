import { Router } from "express";
import { User } from "../../rename/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const user = await User.create(req.body);
  const jwtSecret:any = process.env.JWT_SECRET;
  const token = jwt.sign(
    { userId: user.id, username: user.username },
      jwtSecret,
    {
      expiresIn: "7d",
    }
  );
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
  const jwtSecret:any = process.env.JWT_SECRET;
  const token = jwt.sign(
    { userId: user.id, username: user.username },
      jwtSecret,
    {
      expiresIn: "7d",
    }
  );
  res.json({ token });
});

router.post("/verify", async (req, res) => {
  if (!req.body.token) res.status(401).send();
  const token = req.body.token;
  const jwtSecret:any = process.env.JWT_SECRET;
  try {
    const tokenData = jwt.verify(token, jwtSecret);
    return res.json(tokenData)

  } catch (error) {
    return res.status(401).send();
  }
});

router.post(`/:userId/favorite-stock`, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.userId } })
  if(!user) {return res.status(401).send()}
  console.log(user.favoriteStocks);
  const favoriteStocks = JSON.parse(user.favoriteStocks) || [];
  favoriteStocks.push(req.body.stockSymbol);
  await user?.update({favoriteStocks: JSON.stringify(favoriteStocks)})
  return res.status(200).send();
});



export default router;
