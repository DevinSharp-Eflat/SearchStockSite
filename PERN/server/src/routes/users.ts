// import { Request, Response, Router } from "express";
// import { User, Stock } from "../models";

// const router = Router();

// router.post("/saveStock", async (req, res) => {
//   const { stockSymbol, userId } = req.body;

//   try {
//     const stock = await Stock.findOne({ where: { symbol: stockSymbol } });

//     if (!stock) {
//       return res.status(404).json({ message: "Stock not found" });
//     }

//     const user = await User.findByPk(userId);
//     if (user) {
//       await user.addStock(stock);
//       return res.status(200).json({ message: "Stock saved successfully!" });
//     }

//     res.status(404).json({ message: "User not found" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/savedStocks", async (req: Request, res: Response) => {
//   const { userId } = req.query;

//   try {
//     const user = await User.findByPk(userId as string, {
//       include: Stock,
//     });

//     if (user) {
//       res.json(user.Stocks);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
