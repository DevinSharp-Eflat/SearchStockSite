import { Router } from 'express';
import { StockModel, UserModel } from '../Models';


const router = Router();

router.post('/saveStock', async (req, res) => {
  const { stockSymbol, userId } = req.body;

  try {
    const stock = await StockModel.findOne({ where: { symbol: stockSymbol } });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const user = await UserModel.findByPk(userId);
    if (user) {
      await user.addStock(stock); 
      return res.status(200).json({ message: 'Stock saved successfully!' });
    }

    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/savedStocks', async (req, res) => {
    const { userId } = req.query;
  
    try {
      const user = await UserModel.findByPk(userId, {
        include: StockModel,
      });
  
      if (user) {
        res.json(user.Stocks); 
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
